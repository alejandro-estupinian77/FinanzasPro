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


let events = {};
let transacciones = [];

//Inputs
const descripcion = document.getElementById('descripcion');
const categoria = document.getElementById('categoria');
const monto = document.getElementById('monto');
const hora = document.getElementById('hora');

//Cerrar modal con botón
botonCerrar.addEventListener('click', function(e) {
    e.preventDefault();
    cerrarModal();
});

botonAgregar.addEventListener('click', function(e){
    e.preventDefault();
    
    let transaccion = {
        "descripcion":`${descripcion.value}`,
        "categoria":`${categoria.value}`,
        "monto":`${monto.value}`,
        "hora":`${hora.value}`
    }

    transacciones.push(transaccion);

    const contenidoTrans = document.createElement('p');
    contenidoTrans.textContent = `${descripcion.value}`;
    contenidoTrans.classList.add('etiqueta');
  
    diaSeleccionado.appendChild(contenidoTrans);
    cerrarModal();

});

//Abrir y cerrar modal
function abrirModal() {
    //Reestablecer todos los campos a vacío
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

    document.getElementById('prev-month').addEventListener('click', previousMonth);
    document.getElementById('next-month').addEventListener('click', nextMonth);
});

//Historial de pagos 
function verificarListaTransacciones(){
    if (transacciones == 0){
        noPagos.textContent = "No hay pagos registrados";    
    }else{
        transacciones.forEach(transaccion =>{
            const contenedorTrans = document.createElement('div');
            const imagenTrans = document.createElement('img');
            const textoTrans = document.createElement('h4');
            const botonTrans = document.createElement('button');

            //Atributos del contenedor
            contenedorTrans.classList.add('pago');

            //Atributos de la imagen
            imagenTrans.src = "images/172506_money_icon.png"

            //Agregar elementos al div
            contenedorTrans.appendChild(imagenTrans);
            contenedorTrans.appendChild(textoTrans);
            contenedorTrans.appendChild(botonTrans);

            contenedorPagos.appendChild(contenedorTrans);
            
        });
    }
}

function alertaExportacion(){
    if(transacciones.length == 0){
        alert("No hay pagos para realizar la exportación");
    }
}







