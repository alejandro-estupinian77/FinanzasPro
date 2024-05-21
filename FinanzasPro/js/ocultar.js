//Abrir Modal
const botonCerrar = document.querySelectorAll('.boton-cerrar');
const modal = document.getElementById('event-modal');
const diaCalendario = document.querySelectorAll('.calendar-day');

function abrirModal(){
    modal.style.display = 'flex';
}

function cerrarModal(){
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Añade evento a cada elemento con la clase 'calendar-day' para abrir el modal
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.addEventListener('click', abrirModal);
    });
});