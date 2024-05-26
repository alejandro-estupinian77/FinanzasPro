//Importar funciones
import { abrirModal } from "./ocultar";
import { cerrarModal } from "./ocultar";

document.addEventListener('DOMContentLoaded', () => {
    let diaSeleccionado = null;

    document.querySelectorAll('.calendar-day').forEach(dia => {
        dia.addEventListener('click', function() {
            diaSeleccionado = this;
            abrirModal();
        });
    });

    const agregarBoton = document.getElementsByClassName('boton-desc');

    if (agregarBoton) {
        agregarBoton.addEventListener('click', function() {
            agregarTransaccion(diaSeleccionado);
            cerrarModal();
        });
    }
});

function agregarTransaccion(diaSeleccionado) {
    const categoria = document.getElementById('categoria').value;
    const monto = document.getElementById('monto').value;
    const hora = document.getElementById('hora').value;
    const contenedorTrans = document.createElement('div');
    contenedorTrans.classList.add('etiqueta');

    const datoTrans = document.createElement('p');
    datoTrans.textContent = categoria;
    contenedorTrans.appendChild(datoTrans);

    diaSeleccionado.appendChild(contenedorTrans);
}
