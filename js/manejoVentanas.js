//Manejo de ventanas
const botonRegistroPagos = document.getElementById('boton-registroPagos');
const botonIngresosGastos = document.getElementById('boton-ingresosGastos');
const botonSeguimiento = document.getElementById('boton-seguimiento');
const botonPlanificacion = document.getElementById('boton-planificacion');

const contenidoRegistroPagos = document.getElementsByClassName('registro-pagos')[0];
const contenidoIngresosPagos = document.getElementsByClassName('ingresos-pagos')[0];
const contenidoSeguimiento = document.getElementsByClassName('seguimiento-presupuesto')[0];
const contenidoPlanificacion = document.getElementsByClassName('planificacion-reportes')[0];


botonRegistroPagos.addEventListener('click', function(e){
    e.preventDefault();

    botonRegistroPagos.style.backgroundColor = 'rgb(30, 144, 255)';
    botonIngresosGastos.style.backgroundColor = '#121212';
    botonSeguimiento.style.backgroundColor = '#121212';
    botonPlanificacion.style.backgroundColor = '#121212';

    contenidoRegistroPagos.style.display = 'grid';
    contenidoIngresosPagos.style.display = 'none';
    contenidoSeguimiento.style.display = 'none';
    contenidoPlanificacion.style.display = 'none';

});

botonIngresosGastos.addEventListener('click', function(e){
    e.preventDefault();

    botonIngresosGastos.style.backgroundColor = 'rgb(30, 144, 255)';
    botonRegistroPagos.style.backgroundColor = '#121212';
    botonSeguimiento.style.backgroundColor = '#121212';
    botonPlanificacion.style.backgroundColor = '#121212';

    contenidoRegistroPagos.style.display = 'none';
    contenidoIngresosPagos.style.display = 'block';
    contenidoSeguimiento.style.display = 'none';
    contenidoPlanificacion.style.display = 'none';
});

botonSeguimiento.addEventListener('click', function(e){
    e.preventDefault();
    
    botonIngresosGastos.style.backgroundColor = '#121212';
    botonRegistroPagos.style.backgroundColor = '#121212';
    botonSeguimiento.style.backgroundColor = 'rgb(30, 144, 255)';
    botonPlanificacion.style.backgroundColor = '#121212';

    contenidoRegistroPagos.style.display = 'none';
    contenidoIngresosPagos.style.display = 'none';
    contenidoSeguimiento.style.display = 'block';
    contenidoPlanificacion.style.display = 'none';
});

botonPlanificacion.addEventListener('click', function(e){
    e.preventDefault();

    botonIngresosGastos.style.backgroundColor = '#121212';
    botonRegistroPagos.style.backgroundColor = '#121212';
    botonSeguimiento.style.backgroundColor = '#121212';
    botonPlanificacion.style.backgroundColor = 'rgb(30, 144, 255)';

    contenidoRegistroPagos.style.display = 'none';
    contenidoIngresosPagos.style.display = 'none';
    contenidoSeguimiento.style.display = 'none';
    contenidoPlanificacion.style.display = 'block';
})
