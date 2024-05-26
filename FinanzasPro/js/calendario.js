let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const botonCerrar = document.getElementsByClassName('boton-cerrar')[0];
const modal = document.getElementById('event-modal');
const botonAgregar = document.getElementById('boton-agregar');

const contenedorPagos = document.getElementsByClassName('pagos')[0];
const botonExportarHistorial = document.getElementsByClassName('exportar-pagos');

const noPagos = document.getElementsByClassName('noPagos')[0];
const contenedorPagosIndividuales = document.getElementsByClassName('contenedor-pagos')[0];

let events = {};
var transacciones = [];

const nombreUsuarioContenedor = document.getElementsByClassName('nombre-usuario')[0];

// Inputs
const descripcion = document.getElementById('descripcion');
const categoria = document.getElementById('categoria');
const monto = document.getElementById('monto');
const hora = document.getElementById('hora');

// Cerrar modal con botón
botonCerrar.addEventListener('click', function(e) {
    e.preventDefault();
    cerrarModal();
});

// Agregar transacción y generar correo
botonAgregar.addEventListener('click', function(e) {
    e.preventDefault();

    let transaccion = {
        "descripcion": descripcion.value,
        "categoria": categoria.value,
        "monto": monto.value,
        "hora": hora.value
    };

    transacciones.push(transaccion);
    console.log(transacciones);

    const contenidoTrans = document.createElement('p');
    contenidoTrans.textContent = `${descripcion.value}`;
    contenidoTrans.classList.add('etiqueta');

    diaSeleccionado.appendChild(contenidoTrans);
    verificarListaTransacciones();
    cerrarModal();

    // Guardar en localStorage
    localStorage.setItem('transacciones', JSON.stringify(transacciones));

    // Enviar mensaje a correo.js
    window.postMessage({
        type: 'new-transaction',
        transaction: transaccion
    }, '*');
});


// Abrir y cerrar modal
function abrirModal() {
    // Reestablecer todos los campos a vacío
    descripcion.value = '';
    categoria.value = '';
    monto.value = '';
    hora.value = '';

    modal.style.display = 'flex';
}

function cerrarModal() {
    modal.style.display = 'none';
}

function renderCalendar() {
    const daysElement = document.getElementById('calendar-days');
    daysElement.innerHTML = "";
    const monthElement = document.getElementById('calendar-month');
    monthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('calendar-day-header');
        dayHeader.textContent = day;
        daysElement.appendChild(dayHeader);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day');
        daysElement.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        daysElement.appendChild(dayElement);

        const eventDate = `${currentYear}-${currentMonth + 1}-${day}`;
        if (events[eventDate]) {
            events[eventDate].forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event');
                eventElement.textContent = event;
                dayElement.appendChild(eventElement);
            });
        }

        // Añadir event listener para abrir el modal
        dayElement.addEventListener('click', function() {
            diaSeleccionado = this;
            abrirModal();
        });
    }
}

function previousMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar();
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar();
}

// Inicializar el calendario al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    renderCalendar();
    verificarListaTransacciones();
    cambiarNombre();

    document.getElementById('prev-month').addEventListener('click', previousMonth);
    document.getElementById('next-month').addEventListener('click', nextMonth);
});

// Historial de pagos 
function verificarListaTransacciones(){
    if (transacciones.length === 0){
        noPagos.textContent = "No hay pagos registrados";    
    } else {
        noPagos.style.display = 'none';
        contenedorPagosIndividuales.innerHTML = '';
        var i = 0;
        transacciones.forEach(transaccion => {
            const contenedorTrans = document.createElement('div');
            const imagenTrans = document.createElement('img');
            const textoTrans = document.createElement('h4');
            const botonTrans = document.createElement('button');
            const contenedorTexto = document.createElement('div');

            // Atributos del contenedor Texto
            contenedorTexto.classList.add('contenido');
            contenedorTexto.appendChild(imagenTrans);
            contenedorTexto.appendChild(textoTrans);

            // Atributos del contenedor
            contenedorTrans.classList.add('pago');

            // Atributos de la imagen
            imagenTrans.src = "images/172506_money_icon.png";

            // Atributos del h5
            textoTrans.textContent = `${transaccion.categoria}: ${transaccion.descripcion}`;

            // Atributos botón
            botonTrans.textContent = "Detalles";
            botonTrans.classList.add('boton-detalles');
            botonTrans.id = `${i}`;

            // Agregar elementos al div
            contenedorTrans.appendChild(contenedorTexto);
            contenedorTrans.appendChild(botonTrans);

            contenedorPagosIndividuales.appendChild(contenedorTrans);
            contenedorPagos.appendChild(contenedorPagosIndividuales);

            i++;
        });
    }
}

function alertaExportacion(){
    if(transacciones.length === 0){
        alert("No hay pagos para realizar la exportación");
    } else {
        const datosJSON = JSON.stringify(transacciones, null, 2);
        const blob = new Blob([datosJSON], {type: 'application/json'});

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transacciones.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function cambiarNombre(){
    const nombre = localStorage.getItem('usuario');
    nombreUsuarioContenedor.textContent = nombre;
}













