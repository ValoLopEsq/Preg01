/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import dao.exceptions.NonexistentEntityException;
import dto.Alumnoweb;
import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.Persistence;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

/**
 *
 * @author User
 */
public class AlumnowebJpaController implements Serializable {

    public AlumnowebJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_Preg01_war_1.0-SNAPSHOTPU");

    public AlumnowebJpaController() {
    }
    
    

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(Alumnoweb alumnoweb) {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            em.persist(alumnoweb);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(Alumnoweb alumnoweb) throws NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            alumnoweb = em.merge(alumnoweb);
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                Integer id = alumnoweb.getCodiEstdWeb();
                if (findAlumnoweb(id) == null) {
                    throw new NonexistentEntityException("The alumnoweb with id " + id + " no longer exists.");
                }
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void destroy(Integer id) throws NonexistentEntityException {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Alumnoweb alumnoweb;
            try {
                alumnoweb = em.getReference(Alumnoweb.class, id);
                alumnoweb.getCodiEstdWeb();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The alumnoweb with id " + id + " no longer exists.", enfe);
            }
            em.remove(alumnoweb);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<Alumnoweb> findAlumnowebEntities() {
        return findAlumnowebEntities(true, -1, -1);
    }

    public List<Alumnoweb> findAlumnowebEntities(int maxResults, int firstResult) {
        return findAlumnowebEntities(false, maxResults, firstResult);
    }

    private List<Alumnoweb> findAlumnowebEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Alumnoweb.class));
            Query q = em.createQuery(cq);
            if (!all) {
                q.setMaxResults(maxResults);
                q.setFirstResult(firstResult);
            }
            return q.getResultList();
        } finally {
            em.close();
        }
    }

    public Alumnoweb findAlumnoweb(Integer id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Alumnoweb.class, id);
        } finally {
            em.close();
        }
    }

    public int getAlumnowebCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Alumnoweb> rt = cq.from(Alumnoweb.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
    public void actualizar(Alumnoweb persona) throws NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();

            // Verifica si la persona ya existe en la base de datos
            Alumnoweb personaExistente = em.find(Alumnoweb.class, persona.getCodiEstdWeb());
            if (personaExistente == null) {
                throw new NonexistentEntityException("La persona con ID " + persona.getCodiEstdWeb()+ " no existe.");
            }

            // Actualiza la persona existente con los nuevos valores
            personaExistente.setNdniEstdWeb(persona.getNdniEstdWeb());
            personaExistente.setAppaEstdWeb(persona.getAppaEstdWeb());
            personaExistente.setApmaEstdWeb(persona.getApmaEstdWeb());
            personaExistente.setNombEstdWeb(persona.getNombEstdWeb());           
            personaExistente.setFechNaciEstdWeb(persona.getFechNaciEstdWeb());
            personaExistente.setLogiEstd(persona.getLogiEstd());
            // Realiza el merge para guardar los cambios
            em.merge(personaExistente);
            em.getTransaction().commit();
        } catch (Exception ex) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }
    
    public Alumnoweb validar(Alumnoweb u){
        EntityManager em = getEntityManager();
        try {
            Query q = em.createNamedQuery("Usuario.validar");
            q.setParameter("ndniEstdWeb", u.getNdniEstdWeb());
            q.setParameter("passUsua", u.getPassEstd());
            return (Alumnoweb) q.getSingleResult();
        } catch (Exception ex) {
            return null;
        } finally {
            em.close();
        }
    }

    public String cambiarClave(Alumnoweb u, String nuevaClave) {
        EntityManager em = getEntityManager();
        try {
            AlumnowebJpaController usuDAO = new AlumnowebJpaController();
            Alumnoweb usuario = usuDAO.findAlumnoweb(u.getCodiEstdWeb());
            if (usuario.getPassEstd().equals(u.getPassEstd())) {
                usuario.setPassEstd(nuevaClave);
                usuDAO.edit(usuario);
                return "Clave cambiada";
            } else {
                return "Clave actual no valida";
            }
        } catch (Exception ex) {
            return null;
        } finally {
            em.close();
        }
    }
}
