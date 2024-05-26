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
const tituloGrafico = document.getElementsByClassName('titulo-grafico')[0];


var chart;
var i = 0;
var datos;
var config;

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

function generarGraficos(config){
    if(chart){
        chart.destroy();
    }

    chart = new Chart(canvaGrafico, config);
}

function renderizarGraficos(i = 0){

    if (i == 0){
        tituloGrafico.textContent = "Presupuesto Mensual";
        data = {
            labels: [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            datasets:[
                {
                    label: 'PRESUPUESTO MENSUAL',
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',  // Rojo
                        'rgba(54, 162, 235, 1)',  // Azul
                        'rgba(255, 206, 86, 1)',  // Amarillo
                        'rgba(75, 192, 192, 1)',  // Verde
                        'rgba(153, 102, 255, 1)', // Púrpura
                        'rgba(255, 159, 64, 1)',  // Naranja
                        'rgba(199, 199, 199, 1)', // Gris
                        'rgba(255, 99, 71, 1)',   // Tomate
                        'rgba(75, 0, 130, 1)',    // Índigo
                        'rgba(255, 215, 0, 1)',   // Oro
                        'rgba(0, 128, 128, 1)',   // Verde azulado
                        'rgba(220, 20, 60, 1)'    // Carmesí
                    ],
                    data: [
                        planificacionPresupuesto[0].presupuesto,
                        planificacionPresupuesto[1].presupuesto,
                        planificacionPresupuesto[2].presupuesto,
                        planificacionPresupuesto[3].presupuesto,
                        planificacionPresupuesto[4].presupuesto,
                        planificacionPresupuesto[5].presupuesto,
                        planificacionPresupuesto[6].presupuesto,
                        planificacionPresupuesto[7].presupuesto,
                        planificacionPresupuesto[8].presupuesto,
                        planificacionPresupuesto[9].presupuesto,
                        planificacionPresupuesto[10].presupuesto,
                        planificacionPresupuesto[11].presupuesto,
                    ]
                }
            ]
        }
    
        config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        generarGraficos(config);
    }else if(i == 1){

        tituloGrafico.textContent = "Ingresos por mes";

        var ingresosEnero = 0;
        var ingresosFebrero = 0;
        var ingresosMarzo = 0;
        var ingresosAbril = 0;
        var ingresosMayo = 0;
        var ingresosJunio = 0;
        var ingresosJulio = 0;
        var ingresosAgosto = 0;
        var ingresosSeptiembre = 0;
        var ingresosOctubre = 0;
        var ingresosNoviembre = 0;
        var ingresosDiciembre = 0;

        registroTrans.forEach(registro => {
            if (registro.tipo.toLowerCase() == 'ingreso'){
                switch (registro.mes.toLowerCase()) {
                    case 'enero':
                        ingresosEnero += registro.monto;
                        break;
                    case 'febrero':
                        ingresosFebrero += registro.monto;
                        break;
                    case 'marzo':
                        ingresosMarzo += registro.monto;
                        break;
                    case 'abril':
                        ingresosAbril += registro.monto;
                        break;
                    case 'mayo':
                        ingresosMayo += registro.monto;
                        break;
                    case 'junio':
                        ingresosJunio += registro.monto;
                        break;
                    case 'julio':
                        ingresosJulio += registro.monto;
                        break;
                    case 'agosto':
                        ingresosAgosto += registro.monto;
                        break;
                    case 'septiembre':
                        ingresosSeptiembre += registro.monto;
                        break;
                    case 'octubre':
                        ingresosOctubre += registro.monto;
                        break;
                    case 'noviembre':
                        ingresosNoviembre += registro.monto;
                        break;
                    case 'diciembre':
                        ingresosDiciembre += registro.monto;
                        break;
                }
            }
        })
        data = {
            labels: [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            datasets:[
                {
                    label: 'INGRESOS MENSUALES',
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',  // Rojo
                        'rgba(54, 162, 235, 1)',  // Azul
                        'rgba(255, 206, 86, 1)',  // Amarillo
                        'rgba(75, 192, 192, 1)',  // Verde
                        'rgba(153, 102, 255, 1)', // Púrpura
                        'rgba(255, 159, 64, 1)',  // Naranja
                        'rgba(199, 199, 199, 1)', // Gris
                        'rgba(255, 99, 71, 1)',   // Tomate
                        'rgba(75, 0, 130, 1)',    // Índigo
                        'rgba(255, 215, 0, 1)',   // Oro
                        'rgba(0, 128, 128, 1)',   // Verde azulado
                        'rgba(220, 20, 60, 1)'    // Carmesí
                    ],
                    data:[
                        ingresosEnero, ingresosFebrero, ingresosMarzo, ingresosAbril, ingresosMayo, ingresosJunio,
                        ingresosJulio, ingresosAgosto, ingresosSeptiembre, ingresosOctubre, ingresosNoviembre, ingresosDiciembre
                    ]
                }
            ]
        }
    
        config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        generarGraficos(config);
    }else if (i == 2){
        tituloGrafico.textContent = "Gastos por mes";

        var gastosEnero = 0;
        var gastosFebrero = 0;
        var gastosMarzo = 0;
        var gastosAbril = 0;
        var gastosMayo = 0;
        var gastosJunio = 0;
        var gastosJulio = 0;
        var gastosAgosto = 0;
        var gastosSeptiembre = 0;
        var gastosOctubre = 0;
        var gastosNoviembre = 0;
        var gastosDiciembre = 0;

        registroTrans.forEach(registro => {
            if (registro.tipo.toLowerCase() == 'gasto'){
                switch (registro.mes.toLowerCase()) {
                    case 'enero':
                        gastosEnero += registro.monto;
                        break;
                    case 'febrero':
                        gastosFebrero += registro.monto;
                        break;
                    case 'marzo':
                        gastosMarzo += registro.monto;
                        break;
                    case 'abril':
                        gastosAbril += registro.monto;
                        break;
                    case 'mayo':
                        gastosMayo += registro.monto;
                        break;
                    case 'junio':
                        gastosJunio += registro.monto;
                        break;
                    case 'julio':
                        gastosJulio += registro.monto;
                        break;
                    case 'agosto':
                        gastosAgosto += registro.monto;
                        break;
                    case 'septiembre':
                        gastosSeptiembre += registro.monto;
                        break;
                    case 'octubre':
                        gastosOctubre += registro.monto;
                        break;
                    case 'noviembre':
                        gastosNoviembre += registro.monto;
                        break;
                    case 'diciembre':
                        gastosDiciembre += registro.monto;
                        break;
                }
            }
        })
        data = {
            labels: [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            datasets:[
                {
                    label: 'GASTOS MENSUALES',
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',  // Rojo
                        'rgba(54, 162, 235, 1)',  // Azul
                        'rgba(255, 206, 86, 1)',  // Amarillo
                        'rgba(75, 192, 192, 1)',  // Verde
                        'rgba(153, 102, 255, 1)', // Púrpura
                        'rgba(255, 159, 64, 1)',  // Naranja
                        'rgba(199, 199, 199, 1)', // Gris
                        'rgba(255, 99, 71, 1)',   // Tomate
                        'rgba(75, 0, 130, 1)',    // Índigo
                        'rgba(255, 215, 0, 1)',   // Oro
                        'rgba(0, 128, 128, 1)',   // Verde azulado
                        'rgba(220, 20, 60, 1)'    // Carmesí
                    ],
                    data: [
                        gastosEnero, gastosFebrero, gastosMarzo, gastosAbril, gastosMayo, gastosJunio,
                        gastosJulio, gastosAgosto, gastosSeptiembre, gastosOctubre, gastosNoviembre, gastosDiciembre
                    ]
                }
            ]
        }
    
        config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        generarGraficos(config);
    }else if(i == 3){
        tituloGrafico.textContent = "Ingresos y Gastos por categoría";

        var ingresosEstudios = 0;
        var gastosEstudios = 0;
        
        var ingresosInversion = 0;
        var gastosInversion = 0;

        var ingresosComida = 0;
        var gastosComida = 0;

        var ingresosServicios = 0;
        var gastosServicios = 0;

        var ingresosOtros = 0;
        var gastosOtros = 0;

        registroTrans.forEach(registro =>{

            if(registro.tipo.toLowerCase() == 'ingreso'){
                switch(registro.categoria.toLowerCase()){
                    case 'estudios':
                        ingresosEstudios += registro.monto;
                        break;
                    case 'inversion':
                        ingresosInversion += registro.monto;
                        break;
                    case 'comida':
                        ingresosComida += registro.monto;
                        break;
                    case 'servicios':
                        ingresosServicios += registro.monto;
                        break;
                    case 'otros':
                        ingresosOtros += registro.monto;
                        break;
                }
            }else{
                switch(registro.categoria.toLowerCase()){
                    case 'estudios':
                        gastosEstudios += registro.monto;
                        break;
                    case 'inversion':
                        gastosInversion += registro.monto;
                        break;
                    case 'comida':
                        gastosComida += registro.monto;
                        break;
                    case 'servicios':
                        gastosServicios += registro.monto;
                        break;
                    case 'otros':
                        gastosOtros += registro.monto;
                        break;
                }
            }
        })

        data = {
            labels: [
                'Estudios',
                'Inversiones',
                'Comida',
                'Servicios',
                'Otros'
            ],
            datasets:[
                {
                    label: 'INGRESOS POR CATEGORIA',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.9)',  // Rojo
                    ],
                    data: [
                        ingresosEstudios,
                        ingresosInversion,
                        ingresosComida,
                        ingresosServicios,
                        ingresosOtros
                    ]
                },
                {
                    label: 'GASTOS POR CATEGORIA',  
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.9)',  // Azul
                    ],
                    data:[
                        gastosEstudios,
                        gastosInversion,
                        gastosComida,
                        gastosServicios,
                        gastosOtros
                    ]
                }
            ]
        }
    
        config = {
            type: 'radar',
            data: data,
            options: {
              elements: {
                line: {
                  borderWidth: 3
                }
              }
            },
          };
        generarGraficos(config);
    }
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
        'monto': montoTransaccionValorNum
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
    renderizarGraficos(i);
})

botonCerrarModal.addEventListener('click', function(e){
    e.preventDefault();
    modalGraficos.style.display = 'none';
})

document.getElementsByClassName('siguiente')[0].addEventListener('click', function(e){
    e.preventDefault();
    
    if (i == 4){
        i = 0;
        renderizarGraficos(i);
    }else{
        i += 1;
        renderizarGraficos(i);
    }
    
})

document.getElementsByClassName('anterior')[0].addEventListener('click', function(e){
    e.preventDefault();

    if (i == -1){
        i = 3;
        renderizarGraficos(i);
    }else{
        i -= 1;
        renderizarGraficos(i);
    }
})














