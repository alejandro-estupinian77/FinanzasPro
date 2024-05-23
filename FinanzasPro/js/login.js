document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.botonIngreso');

    loginButton.addEventListener('click', function() {
        const emailLogin = document.getElementById('emailLogin').value;
        const contraLogin = document.getElementById('contraLogin').value;

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioValido = usuarios.find(usuario => usuario.correoUsuario === emailLogin && usuario.contraseña === contraLogin);

        if (usuarioValido) {
            alert('Inicio de sesión exitoso');
            window.location.href = 'app.html';
        } else {
            alert('Correo o contraseña incorrectos');
        }
    });
});
