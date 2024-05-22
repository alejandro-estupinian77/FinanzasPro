const botonMostrarDetalles = document.querySelectorAll('boton-detalles');
const textoDesc = document.getElementsByClassName('descripcion-detalles')[0];
const textoCategoria = document.getElementsByClassName('categoria-detalles')[0];
const textoMonto = document.getElementsByClassName('monto-detalles')[0];
const textoHora = document.getElementsByClassName('hora-detalles')[0];
const modalDetalles = document.getElementsByClassName('modal-detalles')[0];

botonMostrarDetalles.forEach(boton=>{
    boton.addEventListener('click', function(e){
        e.preventDefault();
        console.log("Hola");
        modalDetalles.style.display = 'flex';
        
    });

});
