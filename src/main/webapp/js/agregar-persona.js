$(document).ready(function () {

    // Validación del formulario
    function validarFormularioAgregar() {
        let errores = [];

        if ($("#atxtDNI").val().trim() === "") {
            errores.push("El DNI es obligatorio.");
        }
        if ($("#atxtApat").val().trim() === "") {
            errores.push("El Apell. Pat. es obligatorio.");
        }
        if ($("#atxtAmat").val() === "") {
            errores.push("El Apell. Mat. es obligatorio.");
        }
        if ($("#atxtNomb").val().trim() === "") {
            errores.push("El Nombre es obligatorio.");
        }
        if ($("#atxtSuel").val().trim() === "") {
            errores.push("El Sueldo es obligatorio.");
        }
        if ($("#atxtFech").val().trim() === "") {
            errores.push("La Fecha es obligatoria.");
        }
        return errores;
    }

    $("#btnAgregarPersona").on("click", function () {
        // Resetea el formulario del modal
        
        $("#atxtDNI").val('');
        $("#atxtApat").val('');
        $("#atxtAmat").val('');
        $("#atxtNomb").val('');
        $("#atxtSuel").val('');
        $("#atxtFech").val('');

        // Abre el modal
        $("#agregarModal").modal('show');
    });

    $("#btnAgregar").on("click", function () {
        // Deshabilitar el botón mientras se procesa
        let $btn = $(this);
        $btn.prop('disabled', true);

        // Validar el formulario
        let errores = validarFormularioAgregar(); // Asegúrate de implementar esta función
        if (errores.length > 0) {
            alert(errores.join("\n"));
            $btn.prop('disabled', false);
            return;
        }

        // Obtener los valores de los inputs
        let datos = {
            codi: 0,
            ndni: $("#atxtDNI").val(),
            appa: $("#atxtApat").val(),
            apma: $("#atxtAmat").val(),
            nomb: $("#atxtNomb").val(),
            suel: $("#atxtSuel").val(),
            fnacPers: $("#atxtFech").val()
        };
        console.log(datos);

        $.ajax({
            url: 'personacrud?opcion=2', // La URL de tu servlet para agregar
            type: 'POST', // Método HTTP
            data: datos, // Datos enviados al servidor
            success: function (response) {
                let res = JSON.parse(response); // Parsear la respuesta JSON

                if (res.resultado === "ok") {
                    alert("Registro agregado exitosamente");
                    $("#agregarModal").modal('hide');
                    $('#example').DataTable().ajax.reload(); // Actualizar la tabla después de agregar
                } else {
                    alert("Error al agregar: " + res.mensaje);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la petición:", error);
                alert("Ocurrió un error. Intenta de nuevo.");
            },
            complete: function () {
                $btn.prop('disabled', false);
            }
        });
    });
});