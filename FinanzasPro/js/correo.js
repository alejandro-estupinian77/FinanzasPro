document.addEventListener('DOMContentLoaded', () => {
    const emailList = document.querySelector('.email-list');
    const emails = []; // Aquí se almacenan los correos
    

    // Cargar transacciones de localStorage
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    transacciones.forEach(transaccion => enviarCorreoRecordatorio(transaccion));

    window.addEventListener('message', (event) => {
        console.log('Mensaje recibido:', event.data);
        if (event.data.type === 'new-transaction') {
            const transaccion = event.data.transaction;
            enviarCorreoRecordatorio(transaccion);
        }
        if (event.data.type === 'seguimiento-presupuesto') {
            const { mes, presupuestoMes } = event.data;
            enviarCorreoSeguimientoPresupuesto(mes, presupuestoMes);
        }
    });

    function obtenerPlanificacionPresupuestoDesdeLocalStorage() {
        return JSON.parse(localStorage.getItem('planificacionPresupuesto')) || [];
    }
    

    function enviarCorreoRecordatorio(transaccion) {
        const mensaje = `
            Estimado usuario,
            Se le recuerda que el pago de ${transaccion.descripcion} correspondiente a ${transaccion.categoria},
            por el monto de Q.${transaccion.monto} vence a las ${transaccion.hora} hrs. Por favor, pague este monto.
        `;

        const emailRecordatorio = {
            subject: `Recordatorio de Pago de ${transaccion.descripcion}`,
            sender: 'noreply@finanzaspro.com',
            date: new Date().toISOString().split('T')[0],
            body: mensaje
        };

        emails.push(emailRecordatorio);
        const emailItem = document.createElement('div');
        emailItem.className = 'email-item';
        emailItem.innerHTML = `
            <strong>${emailRecordatorio.subject}</strong> 
            <span>${emailRecordatorio.sender}</span> 
            <span style="margin-left:auto;">${emailRecordatorio.date}</span>
        `;

        // Agregar evento de click para mostrar el contenido del correo
        emailItem.addEventListener('click', () => {
            mostrarContenidoCorreo(emailRecordatorio);
        });

        emailList.appendChild(emailItem);
    }

    // Función para enviar el correo de seguimiento de presupuesto
    window.addEventListener('message', (event) => {
        if (event.data.type === 'seguimiento-presupuesto') {
            const { mes, presupuestoMes } = event.data;
            enviarCorreoSeguimientoPresupuesto(mes, presupuestoMes);
        }
    });
    
    function enviarCorreoSeguimientoPresupuesto(mes, presupuestoMes) {
        const mensaje = `
            Estimado usuario,
            Su planificación mensual del mes de ${mes} presente año es de Q.${presupuestoMes}. 
            Se le recomienda establecer metas a corto plazo y hacer una buena gestión de sus ingresos gastando en sus necesidades básicas.
        `;
    
        const emailSeguimiento = {
            subject: `Seguimiento de Presupuesto para ${mes}`,
            sender: 'seguimiento@finanzaspro.com',
            date: new Date().toISOString().split('T')[0],
            body: mensaje
        };
    
        emails.push(emailSeguimiento);
        const emailItem = document.createElement('div');
        emailItem.className = 'email-item';
        emailItem.innerHTML = `
            <strong>${emailSeguimiento.subject}</strong> 
            <span>${emailSeguimiento.sender}</span> 
            <span style="margin-left:auto;">${emailSeguimiento.date}</span>
        `;
    
        // Agregar evento de click para mostrar el contenido del correo
        emailItem.addEventListener('click', () => {
            mostrarContenidoCorreo(emailSeguimiento);
        });
    
        emailList.appendChild(emailItem);
    }
    

    function mostrarContenidoCorreo(emailRecordatorio) {
        const emailContent = document.createElement('div');
        emailContent.className = 'email-content';
        emailContent.innerHTML = `
            <h3>${emailRecordatorio.subject}</h3>
            <p>De: ${emailRecordatorio.sender}</p>
            <p>Fecha: ${emailRecordatorio.date}</p>
            <p>${emailRecordatorio.body}</p>
            <button id="closeButton">Cerrar</button>
        `;
        
        // Agregar el contenido del correo al cuerpo principal
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = '';  // Limpiar contenido anterior
        mainContent.appendChild(emailContent);

        // Agregar evento para cerrar el correo
        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', () => {
            mainContent.innerHTML = '';  // Limpiar contenido del correo
            const emailListHeader = document.createElement('div');
            emailListHeader.className = 'email-list-header';
            emailListHeader.innerHTML = '<h2>Recibidos</h2>';
            mainContent.appendChild(emailListHeader);
            mainContent.appendChild(emailList);  // Volver a mostrar la lista de correos
        });
    }
});










