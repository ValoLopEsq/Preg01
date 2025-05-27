$(document).ready(function () {
    // Validación del formulario
    function validarFormulario() {
        let errores = [];

        // Validar DNI (8 dígitos)
        if (!/^\d{8}$/.test($("#txtDNI").val())) {
            errores.push("El DNI debe tener 8 dígitos");
        }

        // Validar que los campos no estén vacíos
        if (!$("#txtApat").val().trim()) {
            errores.push("El apellido paterno es obligatorio");
        }
        if (!$("#txtAmat").val().trim()) {
            errores.push("El apellido materno es obligatorio");
        }
        if (!$("#txtNomb").val().trim()) {
            errores.push("El nombre es obligatorio");
        }
        if (!$("#txtSuel").val().trim()) {
            errores.push("El sueldo es obligatorio");
        }
        if (!$("#txtFech").val()) {
            errores.push("La fecha es obligatoria");
        }

        return errores;
    }

    $("#btnModificarPersonal").on("click", function () {
        // Deshabilitar el botón mientras se procesa
        let $btn = $(this);
        $btn.prop('disabled', true);

        // Validar el formulario
        let errores = validarFormulario();
        if (errores.length > 0) {
            alert(errores.join("\n"));
            $btn.prop('disabled', false);
            return;
        }

        // Obtener los valores de los inputs
        let datos = {
            codi: $("#txtCodi").val(),
            ndni: $("#txtDNI").val(),
            appa: $("#txtApat").val(),
            apma: $("#txtAmat").val(),
            nomb: $("#txtNomb").val(),
            suel: $("#txtSuel").val(),
            fnacPers: $("#txtFech").val()
        };
        console.log(datos);

        $.ajax({
            url: 'personacrud?opcion=3', // La URL de tu servlet
            type: 'POST', // Método HTTP
            data: datos, // Datos enviados al servidor
            success: function (response) {
                let res = JSON.parse(response); // Parsear la respuesta JSON

                if (res.resultado === "ok") {
                    alert("Registro modificado exitosamente");
                    $("#modificarModal").modal('hide');
                    $('#example').DataTable().ajax.reload(); // Actualizar la tabla después de la edición
                } else {
                    alert("Error al modificar: " + res.mensaje);
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