$(document).ready(function () {

    $.fn.editar = function (code) {
        let obj = JSON.parse(decodeURIComponent(code));
        /*$("#txtCodi").val(obj.codiEstdWeb);
        $("#txtDNI").val(obj.ndniPers);
        $("#txtApat").val(obj.appaPers);
        $("#txtAmat").val(obj.apmaPers);
        $("#txtNomb").val(obj.nombPers);
        $("#txtSuel").val(obj.suelPers);

        // Asignar directamente la fecha en formato YYYY-MM-DD
        $("#txtFech").val(obj.fnacPers);

        // Mostrar el modal
        $("#modificarModal").modal('show');*/
    };

    function cifrar(message, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);

        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }

    let clave = "la fe de cuto"; // Tu clave para cifrar


    new DataTable('#example', {
        language: {
            decimal: "",
            emptyTable: "No hay datos",
            info: "Mostrando desde el _START_ al _END_ del total de _TOTAL_ registros",
            infoEmpty: "Mostrando desde el 0 al 0 del total de  0 registros",
            infoFiltered: "(Filtrados del total de _MAX_ registros)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Mostrar _MENU_ registros por página",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: "Buscar:",
            zeroRecords: "No se ha encontrado nada  atraves de ese filtrado.",
            paginate: {
                first: "Primero",
                last: "Última",
                next: "Siguiente",
                previous: "Anterior"
            },
            aria: {
                sortAscending: ": activate to sort column ascending",
                sortDescending: ": activate to sort column descending"
            }
        },
        ajax: 'personacrud?opcion=1',
        columns: [
            {data: 'codiEstdWeb'},
            {data: 'ndniEstdWeb'},
            {data: 'appaEstdWeb'},
            {data: 'apmaEstdWeb'},
            {data: 'nombEstdWeb'},            
            {data: 'fechNaciEstdWeb',
                render: function (data, type, row, meta) {
                    if (data) {
                        const fecha = new Date(data);
                        const formattedDate = ('0' + fecha.getDate()).slice(-2) + '/' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '/' + fecha.getFullYear();
                        return formattedDate;
                    }
                    return data;
                }
            },
            {data: 'logiEstd'},
            {data: 'codiEstdWeb',
                render: function (data, type, row, meta) {
                    // Convertir la fecha a formato YYYY-MM-DD para que el input 'date' lo pueda entender
                    let fechaNac = new Date(row.fechNaciEstdWeb);
                    let formattedFechaNac = fechaNac.toISOString().slice(0, 10); // Formato YYYY-MM-DD
                  

                    // Crear el objeto 'para' que será pasado al método 'editar'
                    let para = {
                        'codiEstdWeb': row.codiEstdWeb,
                        'ndniEstdWeb': row.ndniEstdWeb,
                        'appaEstdWeb': row.appaEstdWeb,
                        'apmaEstdWeb': row.appaEstdWeb,
                        'nombEstdWeb': row.nombEstdWeb,
                        'logiEstd': row.logiEstd,
                        'fechNaciEstdWeb': formattedFechaNac
                    };
                    let dele = {
                        'codiEstdWeb': row.codiEstdWeb,
                        'ndniEstdWeb': row.ndniEstdWeb,
                        'nombEstdWeb': row.nombEstdWeb
                    };

                    let paratxt = encodeURIComponent(JSON.stringify(para));
                    let deletxt = encodeURIComponent(JSON.stringify(dele));
                    return "<button onclick=$.fn.editar('" + paratxt + "') data-toggle='modal' data-target='#exampleModal' class='btn btn-primary btn-sm'>Editar</button>\n\
                            <button onclick=$.fn.eliminar('" + deletxt + "') data-toggle='modal' data-target='#exampleModal' class='btn btn-danger btn-sm'>Eliminar</button>"
                }
            }
        ]
    });

    // Función para eliminar
    $.fn.eliminar = function (code) {/*
        let obj = JSON.parse(decodeURIComponent(code));
        // Llenar los campos del modal de eliminar con los datos del objeto
        $('#etxtCodi').val(obj.codiPers);
        $('#etxtDNI').val(obj.ndniPers);
        $('#etxtNomb').val(obj.nombPers);

        // Mostrar el modal de eliminar
        $('#eliminarModal').modal('show');

        // Manejar el clic en el botón de eliminar dentro del modal de eliminación
        $('#btnEliminarPersonal').off('click').on('click', function () {
            // Mostrar el modal de confirmación
            $('#eliminarModal').modal('hide'); // Ocultar el modal de eliminar
            $('#confirmarModal').modal('show'); // Mostrar el modal de confirmación

            // Confirmar la acción de eliminación
            $('#btnConfirmar').off('click').on('click', function () {
                // Hacer la solicitud para eliminar el registro                
                $.ajax({
                    url: 'personacrud?opcion=4',
                    type: 'POST',
                    data: {codi: obj.codiPers},

                    success: function (response) {
                        // Intenta parsear la respuesta como JSON
                        let resultado;
                        try {
                            resultado = typeof response === 'object' ? response : JSON.parse(response);
                        } catch (e) {
                            console.error('Error al parsear la respuesta:', e);
                            alert("Error al eliminar el registro: Respuesta del servidor no válida");
                            return; // Salir si hay un error en el parseo
                        }

                        if (resultado.resultado === "ok") {
                            // Recargar la tabla
                            $('#confirmarModal').modal('hide');
                            alert("Registro eliminado exitosamente");
                            $('#example').DataTable().ajax.reload();
                        } else {
                            console.error('Respuesta del servidor inesperada:', resultado);
                            alert("Error al eliminar el registro: Respuesta del servidor no válida");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error en la petición:', xhr.status, error);
                        alert("Error al eliminar el registro: " + error);
                    }
                });

            });

            // Si cancela la confirmación
            $('#btnCancelar').off('click').on('click', function () {
                $('#confirmarModal').modal('hide'); // Cerrar el modal de confirmación
            });
        });*/
    };

});

