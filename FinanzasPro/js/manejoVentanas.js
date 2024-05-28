//Manejo de ventanas
const botonRegistroPagos = document.getElementById('boton-registroPagos');
const botonSeguimiento = document.getElementById('boton-seguimiento');
const botonPlanificacion = document.getElementById('boton-planificacion');

const contenidoRegistroPagos = document.getElementsByClassName('registro-pagos')[0];
const contenidoSeguimiento = document.getElementsByClassName('seguimiento-presupuesto')[0];
const contenidoPlanificacion = document.getElementsByClassName('generacion-reportes')[0];

const tituloSeccion = document.getElementsByClassName('titulo-seccion')[0];


botonRegistroPagos.addEventListener('click', function(e){
    e.preventDefault();

    tituloSeccion.textContent = 'Registro de pagos';
    botonRegistroPagos.style.backgroundColor = 'rgb(30, 144, 255)';
    botonSeguimiento.style.backgroundColor = '#121212';
    botonPlanificacion.style.backgroundColor = '#121212';

    contenidoRegistroPagos.style.display = 'grid';
    contenidoSeguimiento.style.display = 'none';
    contenidoPlanificacion.style.display = 'none';

});



botonSeguimiento.addEventListener('click', function(e){
    e.preventDefault();
    
    tituloSeccion.textContent = "Planificación y seguimiento";
    botonRegistroPagos.style.backgroundColor = '#121212';
    botonSeguimiento.style.backgroundColor = 'rgb(30, 144, 255)';
    botonPlanificacion.style.backgroundColor = '#121212';

    contenidoRegistroPagos.style.display = 'none';
    contenidoSeguimiento.style.display = 'grid';
    contenidoPlanificacion.style.display = 'none';
});

botonPlanificacion.addEventListener('click', function(e){
    e.preventDefault();

    tituloSeccion.textContent = "Generación de reportes";
    botonRegistroPagos.style.backgroundColor = '#121212';
    botonSeguimiento.style.backgroundColor = '#121212';
    botonPlanificacion.style.backgroundColor = 'rgb(30, 144, 255)';

    contenidoRegistroPagos.style.display = 'none';
    contenidoSeguimiento.style.display = 'none';
    contenidoPlanificacion.style.display = 'block';
})
