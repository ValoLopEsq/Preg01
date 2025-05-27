$(document).ready(function () {
    $('#frmLogueo').on('submit', function (event) {
        event.preventDefault();
        loginUser();
    });

    function loginUser() {
        const puser = $('#exampleInputEmail').val().trim();
        const ppass = $('#exampleInputPassword').val().trim();

        if (!validateFields(puser, ppass))
            return;

        $.ajax({
            url: 'validarusuario',
            method: 'POST',
            dataType: 'json',
            data: { puser, ppass },
            success: function (response) {
                if (response.resultado === "ok") {
                    sessionStorage.setItem('puser', puser);
                    // ⚠️ No guardes la contraseña en sessionStorage
                    window.location.href = 'principal.html';
                } else {
                    showError(response.error || "Usuario o contraseña incorrectos.");
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
});
