document.addEventListener('DOMContentLoaded', function () {
    var botones = document.querySelectorAll('.boton-app');
    var html = document.querySelector('body');

    botones.forEach(function (boton) {
        boton.addEventListener('click', function () {
            // Remover la clase "clicked" de todos los botones
            botones.forEach(function (b) {
                b.style.backgroundColor = '#121212';
            });
            this.style.backgroundColor = 'rgb(30, 144, 255)';
        });
    });
});