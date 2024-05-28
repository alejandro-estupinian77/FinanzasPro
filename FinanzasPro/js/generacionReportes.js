//Generación de reportes
const datosPresupuestos = JSON.parse(localStorage.getItem('planificacionPresupuesto')) || [];
const datosRegistros = JSON.parse(localStorage.getItem('registroTrans')) || [];

const canvasPresupuestoGrafico = document.getElementById('grafico-presupuesto').getContext('2d');
const canvasIngresosGrafico = document.getElementById('grafico-ingresosmensuales').getContext('2d');
const canvasGastosGrafico = document.getElementById('grafico-gastosmensuales').getContext('2d');
const canvasCategoriasGrafico = document.getElementById('grafico-ingresosgastoscategoria').getContext('2d');

var graficoPresupuesto;
var graficoIngresos;
var graficoGastos;
var graficoCategoria;

document.addEventListener('DOMContentLoaded', function(){

    const botonesDescarga = document.querySelectorAll('.boton-descarga');

    console.log(botonesDescarga);

    botonesDescarga.forEach(boton =>{
        boton.addEventListener('click', function(e){
            e.preventDefault();
            crearPDF(boton);
        })
    })

})



//Generar PDF

function crearPDF(boton){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    if (boton.classList.contains('reporte1')){
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text('Reporte de Presupuestos Mensuales', 15, 15);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        var posicionY = 30;
        planificacionPresupuesto.forEach(planificacion =>{
            doc.text(15, posicionY,`${planificacion.mes.toUpperCase()}: Q${planificacion.presupuesto}`);
            posicionY += 10;
        });
        generarGraficoPresupuestos();
        setTimeout(()=>capturarGrafico(doc, document.getElementById('grafico-presupuesto')), 1000);
    }else if (boton.classList.contains('reporte2')){
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text('Ingresos Mensuales', 15, 15);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        var posicionY = 30;
        registroTrans.forEach(registro=>{
            if (registro.tipo.toLowerCase() == 'ingreso'){
                doc.text(15, posicionY, `${registro.categoria.toUpperCase()}: Q${registro.monto}`);
                posicionY += 10;
            }
        })
        generarGraficoIngresos();
        setTimeout(()=>capturarGrafico(doc, document.getElementById('grafico-ingresosmensuales')), 1000);
    }else if(boton.classList.contains('reporte3')){
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text('Gastos Mensuales', 15, 15);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        var posicionY = 30;
        registroTrans.forEach(registro=>{
            if (registro.tipo.toLowerCase() == 'gasto'){
                doc.text(15, posicionY, `${registro.categoria.toUpperCase()}: Q${registro.monto}`);
                posicionY += 10;
            }
        })
        generarGraficoGastos();
        setTimeout(()=>capturarGrafico(doc, document.getElementById('grafico-gastosmensuales')), 1000);
    }else if(boton.classList.contains('reporte4')){
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text('Gastos e Ingresos por categoría', 15, 15);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        var posicionY = 30;
        registroTrans.forEach(registro=>{
            doc.text(15, posicionY, `${registro.categoria.toUpperCase()}: Q${registro.monto}: ${registro.tipo}`);
            posicionY += 10; 
        })
        generarGraficoCategoria();
        setTimeout(()=>capturarGrafico(doc, document.getElementById('grafico-ingresosgastoscategoria')), 1000);
    }
}

//Capturar gráfico

function capturarGrafico(doc, canvas){

    canvas.style.display = 'block';
    html2canvas(canvas).then(canvas => {
        const imagenGrafico = canvas.toDataURL('image/jpeg', 1.0);
        doc.addPage();
        doc.text('Gráfico del reporte', 15, 15)
        doc.addImage(imagenGrafico, 'JPEG', 15, 30, 180, 100);
        doc.save('reporte.pdf');  
    });
    canvas.style.display = 'none';
}



//Generar Gráficos

function generarGraficoPresupuestos(){

    const labels = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const data = {
        labels: labels,
        datasets:[{
            label: 'PRESUPUESTOS MENSUALES',
            data:[
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
            ],
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
            ]
        }]
    }

    const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
    };
    if(graficoPresupuesto){
        graficoPresupuesto.destroy();
    }
    graficoPresupuesto = new Chart(canvasPresupuestoGrafico, config);
}

function generarGraficoIngresos(){
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
        const data = {
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
    
        const config = {
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

        if(graficoIngresos){
            graficoIngresos.destroy();
        }

        graficoIngresos = new Chart(canvasIngresosGrafico, config);
}

function generarGraficoGastos(){
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
        const data = {
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
    
        const config = {
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

        if(graficoGastos){
            graficoGastos.destroy();
        }

        graficoGastos = new Chart(canvasGastosGrafico, config);
}

function generarGraficoCategoria(){
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

        const data = {
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
    
        const config = {
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

        if(graficoCategoria){
            graficoCategoria.destroy();
        }

        graficoCategoria = new Chart(canvasCategoriasGrafico, config);      
}