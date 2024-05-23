// Variables globales para el presupuesto
let presupuestoMensual = 0;
let totalGastos = 0;
let totalIngresos = 0;
let chartData;
let ctx;

document.addEventListener('DOMContentLoaded', () => {
    ctx = document.getElementById('grafico-presupuesto').getContext('2d');
    inicializarGrafico();

    // Agregar event listener para el formulario de registro de transacción
    document.getElementById('form-registro-transaccion').addEventListener('submit', function(e) {
        e.preventDefault();
        registrarTransaccion();
    });

    // Establecer presupuesto predeterminado al cargar la página
    establecerPresupuesto();
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
    const inputPresupuesto = document.getElementById('presupuesto-mensual').value;
    presupuestoMensual = parseFloat(inputPresupuesto) || 0;
    actualizarResumen();
}

function registrarTransaccion() {
    const tipo = document.getElementById('tipo-transaccion').value;
    const monto = parseFloat(document.getElementById('monto-transaccion').value) || 0;
    
    if (tipo === 'ingreso') {
        totalIngresos += monto;
    } else {
        totalGastos += monto;
    }
    
    actualizarResumen();
}

function actualizarResumen() {
    document.getElementById('mostrar-presupuesto').innerText = presupuestoMensual.toFixed(2);
    document.getElementById('mostrar-gastos').innerText = totalGastos.toFixed(2);
    document.getElementById('mostrar-ingresos').innerText = totalIngresos.toFixed(2);
    document.getElementById('mostrar-saldo').innerText = (presupuestoMensual - totalGastos + totalIngresos).toFixed(2);
    actualizarGrafico();
}





