// Variables globales para el presupuesto
let presupuestoMensual = 0;
let totalGastos = 0;
let totalIngresos = 0;
let chartInstance;

document.addEventListener('DOMContentLoaded', () => {
    // Agregar event listener para el formulario de registro de transacción
    document.getElementById('form-registro-transaccion').addEventListener('submit', function(e) {
        e.preventDefault();
        registrarTransaccion();
    });

    // Establecer presupuesto predeterminado al cargar la página
    establecerPresupuesto();
});

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

function actualizarGrafico() {
    const ctx = document.getElementById('grafico-presupuesto').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Gastos', 'Ingresos', 'Saldo Restante'],
            datasets: [{
                data: [totalGastos, totalIngresos, presupuestoMensual - totalGastos + totalIngresos],
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}



