//Generación de reportes
const datosPresupuestos = JSON.parse(localStorage.getItem('planificacionPresupuesto')) || [];
const datosRegistros = JSON.parse(localStorage.getItem('registroTrans')) || [];


function mostrarDatos(){
    console.log(datosPresupuestos);
    console.log(datosRegistros);
}
