// Variables globales para el presupuesto
var registroTrans = [];
var planificacionPresupuesto = [
    { 'mes': 'enero', 'presupuesto': '0' },
    { 'mes': 'febrero', 'presupuesto': '0' },
    { 'mes': 'marzo', 'presupuesto': '0' },
    { 'mes': 'abril', 'presupuesto': '0' },
    { 'mes': 'mayo', 'presupuesto': '0' },
    { 'mes': 'junio', 'presupuesto': '0' },
    { 'mes': 'julio', 'presupuesto': '0' },
    { 'mes': 'agosto', 'presupuesto': '0' },
    { 'mes': 'septiembre', 'presupuesto': '0' },
    { 'mes': 'octubre', 'presupuesto': '0' },
    { 'mes': 'noviembre', 'presupuesto': '0' },
    { 'mes': 'diciembre', 'presupuesto': '0' }
];

const textoMonto = document.getElementsByClassName('monto-actual')[0];
const selectMes = document.getElementById('mes-presupuesto');
const presupMesInput = document.getElementById('presupuesto-mensual');
const tipoTrans = document.getElementById('tipo-transaccion');
const categoriaTrans = document.getElementById('categoria-trans');
const montoTransaccion = document.getElementById('monto-trans'); 
var imagenEstadoMonto = document.getElementsByClassName('imagen-estado-monto')[0];

const canvaGrafico = document.getElementById('grafica').getContext('2d');
const botonMostrarGraficos = document.getElementsByClassName('visualizar-graficos')[0];
const botonCerrarModal = document.getElementsByClassName('cerrar-modal-grafico')[0];
const modalGraficos = document.getElementsByClassName('modal-graficos')[0];


let presupuestoMensual = 0;
let totalGastos = 0;
let totalIngresos = 0;
let chartData;
let ctx;

document.addEventListener('DOMContentLoaded', () => {

    // Agregar event listener para el formulario de registro de transacción
    document.getElementById('form-registro-transaccion').addEventListener('submit', function(e) {
        e.preventDefault();
        registrarTransaccion();
    });
});

function generarGraficos(){
    var chart = new Chart(canvaGrafico,{
        type:'bar',
        data:{
            labels:['cerveza', 'vino', 'tequila'],
            datasets:[
                {
                    label: 'Bebidas',
                    backgroundColor: "rgb(30, 144, 255)",
                    data: [12, 10, 5]
                }
            ]
        }
    });
}

function establecerPresupuesto() {
    agregarPlanificacion();
}

function registrarTransaccion() {
    const mesTrans = selectMes.value;
    const tipoTransValor = tipoTrans.value;
    const categoriaTransValor = categoriaTrans.value;
    const montoTransaccionValor = montoTransaccion.value;
    var montoTransaccionValorNum = parseFloat(montoTransaccionValor) || 0;

    transaccion = {
        'mes':`${mesTrans}`,
        'tipo':`${tipoTransValor}`,
        'categoria':`${categoriaTransValor}`,
        'monto': `${montoTransaccionValor}`
    }

    registroTrans.push(transaccion);
    actualizarRegistros();
    actualizarMonto(montoTransaccionValorNum, mesTrans, tipoTransValor);
}

function agregarPlanificacion() {
    const mes = selectMes.value;
    const presupuestomMes = presupMesInput.value;
    presupuestoMensual = parseFloat(presupuestomMes) || 0;

    planificacionPresupuesto.forEach(planificacion =>{

        if (mes.toLowerCase() === planificacion.mes){
            planificacion.presupuesto = presupuestoMensual;
        }
    });
    textoMonto.textContent = `Q${presupuestoMensual}`;
    imagenEstadoMonto.src = 'images/arrows.png';

    actualizarPlanificacion();
}

function actualizarMonto(montoTrans = 0, mes, tipo){

    planificacionPresupuesto.forEach(planificacion =>{

        if(mes.toLowerCase() == planificacion.mes){
            
            if(tipo.toLowerCase() == 'ingreso'){
                planificacion.presupuesto += montoTrans;
                textoMonto.textContent = `Q${planificacion.presupuesto}`;
                imagenEstadoMonto.src = 'images/arrows.png';

            }else{
                planificacion.presupuesto -= montoTrans;
                textoMonto.textContent = `Q${planificacion.presupuesto}`;
                imagenEstadoMonto.src = 'images/arrow.png';
                
            }
        }
    });

}

function actualizarPlanificacion(){
    localStorage.setItem('planificacionPresupuesto', JSON.stringify(planificacionPresupuesto));
}

function actualizarRegistros(){
    localStorage.setItem('registroTrans', JSON.stringify(registroTrans));
}

function descagarHistorialTrans(){
    if(registroTrans.length === 0){
        alert('No hay transacciones realizadas');
    }else{
        var dataJSON = JSON.stringify(registroTrans, null, 2);
        var blob = new Blob([dataJSON], {type: 'application/json'});
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'transacciones_registradas.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

//Evento para cambio en el select
document.getElementById('mes-presupuesto').addEventListener('change', function(){
    var mesSeleccionado = this.value;
    var presupuestoMes = planificacionPresupuesto.find(item => item.mes == mesSeleccionado).presupuesto;

    textoMonto.textContent = `Q${presupuestoMes}`;

})

botonMostrarGraficos.addEventListener('click', function(e){
    e.preventDefault();
    modalGraficos.style.display = 'flex';
    generarGraficos();
})

botonCerrarModal.addEventListener('click', function(e){
    e.preventDefault();
    modalGraficos.style.display = 'none';
})












