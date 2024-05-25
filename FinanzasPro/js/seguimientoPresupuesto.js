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

function inicializarGrafico() {
    chartData = {
        labels: ['Presupuesto Mensual', 'Gastos Totales', 'Ingresos Totales'],
        datasets: [{
            label: 'Resumen del Presupuesto',
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            data: [presupuestoMensual, totalGastos, totalIngresos]
        }]
    };

    ctx.fillStyle = chartData.datasets[0].backgroundColor[0];
    ctx.fillRect(0, 0, 200, chartData.datasets[0].data[0] * 2);
    
    ctx.fillStyle = chartData.datasets[0].backgroundColor[1];
    ctx.fillRect(200, 0, 200, chartData.datasets[0].data[1] * 2);
    
    ctx.fillStyle = chartData.datasets[0].backgroundColor[2];
    ctx.fillRect(400, 0, 200, chartData.datasets[0].data[2] * 2);
}

function actualizarGrafico() {
    ctx.clearRect(0, 0, 600, 400);
    
    chartData.datasets[0].data = [presupuestoMensual, totalGastos, totalIngresos];
    
    ctx.fillStyle = chartData.datasets[0].backgroundColor[0];
    ctx.fillRect(0, 0, 200, chartData.datasets[0].data[0] * 2);
    
    ctx.fillStyle = chartData.datasets[0].backgroundColor[1];
    ctx.fillRect(200, 0, 200, chartData.datasets[0].data[1] * 2);
    
    ctx.fillStyle = chartData.datasets[0].backgroundColor[2];
    ctx.fillRect(400, 0, 200, chartData.datasets[0].data[2] * 2);
}

function establecerPresupuesto() {
    agregarPlanificacion();
}

function registrarTransaccion() {
    const mesTrans = selectMes.value;
    const tipoTransValor = tipoTrans.value;
    const categoriaTransValor = categoriaTrans.value;
    const montoTransaccionValor = montoTransaccion.value;

    transaccion = {
        'mes':`${mesTrans}`,
        'tipo':`${tipoTransValor}`,
        'categoria':`${categoriaTransValor}`,
        'monto': `${montoTransaccionValor}`
    }

    registroTrans.push(transaccion);

    montoTransaccionValorNum = parseFloat(montoTransaccionValor) || 0;

    agregarPlanificacion(montoTransaccionValorNum);
    console.log(registroTrans);
    console.log(planificacionPresupuesto);
    console.log(montoTransaccionValorNum);
}

function agregarPlanificacion(montoTrans = 0) {
    const mes = selectMes.value;
    const presupuestomMes = presupMesInput.value;
    presupuestoMensual = parseFloat(presupuestomMes) || 0;
    console.log(tipoTrans.value);

    if (tipoTrans.value === "ingreso"){

        planificacionPresupuesto.forEach(planificacion =>{

            if (mes.toLowerCase() === planificacion.mes){
                planificacion.presupuesto = `${presupuestoMensual + montoTrans}`;
            }
        });

        textoMonto.textContent = `Q${presupuestoMensual + montoTrans}`;
        imagenEstadoMonto.src = 'images/arrows.png';   
        presupuestomMes.value = 0;
    }else{

        planificacionPresupuesto.forEach(planificacion =>{

            if (mes.toLowerCase() === planificacion.mes){
                planificacion.presupuesto = `${presupuestoMensual - montoTrans}`;
            }
        });

        textoMonto.textContent = `Q${presupuestoMensual - montoTrans}`;
        imagenEstadoMonto.src = 'images/arrow.png';   
        presupuestomMes.value = 0;
    }
    
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









