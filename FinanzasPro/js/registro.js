document.addEventListener('DOMContentLoaded', function() {
    // Obtener usuarios del almacenamiento local
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Obtener el último usuario registrado
    var ultimoUsuario = usuarios[usuarios.length - 1];
    
    // Verificar si hay un usuario registrado
    if (ultimoUsuario) {
        // Obtener el elemento donde quieres mostrar el nombre de usuario
        var nombreUsuarioElemento = document.querySelector('.nombre-usuario');
        
        // Verificar si el elemento existe antes de intentar modificar su contenido
        if (nombreUsuarioElemento) {
            // Mostrar el nombre de usuario en el elemento correspondiente
            nombreUsuarioElemento.textContent = ultimoUsuario.nombreUsuario;
        }
    }

    // Agregar event listener para el formulario de registro
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

            if (contrasenaUsuario !== confirmarContrasena) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            async function hashContra(contrasena) {
                const encoder = new TextEncoder();
                const data = encoder.encode(contrasena);
                const hash = await crypto.subtle.digest('SHA-256', data);
                return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
            }

            var usuario = {
                'nombreUsuario': nombreUsuario,
                'correoUsuario': correoUsuario,
                'contraseña': hashContra()
            }

            usuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

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




