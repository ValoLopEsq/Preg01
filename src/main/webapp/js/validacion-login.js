$(document).ready(function () {
    $('#frmLogueo').on('submit', function (event) {
        event.preventDefault();
        loginUser();
    });

    

    function loginUser() {
        let passCifrado = cifrar($('#exampleInputPassword').val().trim(),clave);
        
        const puser = $('#exampleInputEmail').val().trim();
        //const ppass = passCifrado;
        const ppass = $('#exampleInputPassword').val().trim();

        if (!validateFields(puser, ppass))
            return;

        $.ajax({
            url: 'validarusuario',
            method: 'POST',
            dataType: 'json', // Indicamos que la respuesta es JSON
            data: {puser, ppass},
            success: function (response) {
                if (response.valid) {
                    storeUserSession(puser, ppass);
                    window.location.href = 'principal.html';
                } else {
                    showError(response.error || "Error en la autenticación.");
                }
            },
            error: function () {
                showError("Error al conectar con el servidor.");
            }
        });
    }

    function validateFields(user, pass) {
        if (!user || !pass) {
            showError("Por favor, completa todos los campos.");
            return false;
        }
        hideError();
        return true;
    }

    function showError(message) {
        $('#errorMessage').text(message).show();
    }

    function hideError() {
        $('#errorMessage').hide();
    }

    function storeUserSession(user, pass) {
        sessionStorage.setItem('puser', user);
        sessionStorage.setItem('ppass', pass);
    }
});
