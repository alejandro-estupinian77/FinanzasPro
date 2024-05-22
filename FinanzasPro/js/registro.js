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

            const nombreUsuario = document.getElementById('regNombreUser').value;
            const correoUsuario = document.getElementById('regCorreoUser').value;
            const contrasenaUsuario = document.getElementById('regContraUser').value;
            const confirmarContrasena = document.getElementById('regConfContraUser').value;
            const nombreapp = document.getElementsByClassName('nombreapp');

            if (contrasenaUsuario !== confirmarContrasena) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            localStorage.setItem('nombreUsuario', nombreUsuario);
            nombreapp.textContent = `${nombreapp}`;
            localStorage.setItem('correoUsuario', correoUsuario);
            localStorage.setItem('contrasenaUsuario', contrasenaUsuario);

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
