/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dao.AlumnowebJpaController;
import dto.Alumnoweb;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author User
 */
@WebServlet(name = "PersonaCRUD", urlPatterns = {"/personacrud"})
public class PersonaCRUD extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ParseException, Exception {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            String opcion = request.getParameter("opcion");
            AlumnowebJpaController persDAO = new AlumnowebJpaController();
            Gson gson = new Gson();
            JsonObject jsonObject = new JsonObject();
            String jsonString = gson.toJson(jsonObject);
            switch (opcion) {
                case "1":
                    //listar
                    List<Alumnoweb> lista = persDAO.findAlumnowebEntities();
                    //out.print(lista.size());
                    String data = "{\"data\":" + gson.toJson(lista) + "}";
                    out.print(data);
                    break;
                case "2":
                    //agregamos
                    String codi = request.getParameter("codi");
                    String ndni = request.getParameter("ndni");
                    String appa = request.getParameter("appa");
                    String apma = request.getParameter("apma");
                    String nomb = request.getParameter("nomb");
                    String suel = request.getParameter("suel");
                    String pass = request.getParameter("suel");
                    String fech = request.getParameter("fnacPers");
                    SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd"); // Usa guiones en el formato
                    Date fechNaci = formato.parse(fech);

                    Alumnoweb p = new Alumnoweb(Integer.parseInt(codi), ndni, appa, apma, nomb,  fechNaci,suel,pass);
                    persDAO.create(p);

                    jsonObject.addProperty("resultado", "ok");
                    jsonString = gson.toJson(jsonObject);
                    out.print(jsonString);
                    break;
                case "3":
                    //editamos
                    codi = request.getParameter("codi");
                    String endni = request.getParameter("ndni");
                    String eappa = request.getParameter("appa");
                    String eapma = request.getParameter("apma");
                    String enomb = request.getParameter("nomb");
                    String esuel = request.getParameter("suel");
                    String efech = request.getParameter("fnacPers");
                    SimpleDateFormat eformato = new SimpleDateFormat("yyyy-MM-dd"); // Usa guiones en el formato
                    Date efechNaci = eformato.parse(efech);

                    p = new Alumnoweb(Integer.parseInt(codi), endni, eappa, eapma, enomb,efechNaci, esuel );
                    persDAO.actualizar(p);

                    jsonObject.addProperty("resultado", "ok");
                    jsonString = gson.toJson(jsonObject);
                    out.print(jsonString);
                    break;
                case "4":
                    //eliminamos
                    codi = request.getParameter("codi");
                    persDAO.destroy(Integer.parseInt(codi));

                    jsonObject.addProperty("resultado", "ok");
                    jsonString = gson.toJson(jsonObject);
                    out.print(jsonString);
                    break;
                case "5":
                    break;
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(PersonaCRUD.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(PersonaCRUD.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
