var usuarios = [];


document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-registro');
    const modal = document.getElementById('modal');
    const modalForm = document.getElementById('modal-form');
    const closeModal = document.querySelector('.close');
    const googleLoginButton = document.getElementById('google-login');
    const microsoftLoginButton = document.getElementById('microsoft-login');

    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();

            var nombreUsuario = document.getElementById('regNombreUser').value;
            var correoUsuario = document.getElementById('regCorreoUser').value;
            var contrasenaUsuario = document.getElementById('regContraUser').value;
            var confirmarContrasena = document.getElementById('regConfContraUser').value;

            var usuario = {
                'nombreUsuario':`${nombreUsuario.value}`,
                'correoUsuario':`${correoUsuario.value}`,
                'contraseña':`${contrasenaUsuario.value}`
            }

            usuarios.push(usuario);

            localStorage.setItem('usuario', nombreUsuario);
            if (contrasenaUsuario !== confirmarContrasena) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            window.location.href = 'app.html';
        });
    }

googleLoginButton.addEventListener('click', function() {
     modal.style.display = 'block';
});

microsoftLoginButton.addEventListener('click', function() {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

modalForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const modalNombre = document.getElementById('modalNombre').value;
    const modalCorreo = document.getElementById('modalCorreo').value;
    console.log('Modal Nombre:', modalNombre);
    console.log('Modal Correo:', modalCorreo);

    modal.style.display = 'none';
    window.location.href = 'app.html'; // Redirige a app.html después de enviar el formulario modal
});
});


