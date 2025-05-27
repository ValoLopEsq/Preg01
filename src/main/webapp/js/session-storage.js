$(document).ready(function () {
    
    // Cargar el usuario almacenado en sessionStorage
    const storedUser = sessionStorage.getItem('puser');
    if (storedUser) {
        $('#userName').text(storedUser);
    } else {
        // Redirige al usuario al login si no está autenticado
        window.location.href = 'index.html';
    }

    $('#logoutButton').on('click', logout);

    function logout() {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
});
