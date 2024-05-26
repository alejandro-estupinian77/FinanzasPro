document.addEventListener('DOMContentLoaded', () => {
    const emailList = document.querySelector('.email-list');
    const emails = []; // Aquí se almacenan los correos

    window.addEventListener('message', (event) => {
        if (event.data.type === 'new-transaction') {
            const transaccion = event.data.transaction;
            enviarCorreoRecordatorio(transaccion);
        }
    });

    function enviarCorreoRecordatorio(transaccion) {
        const mensaje = `
            Estimado usuario,
            Se le recuerda que el pago de ${transaccion.descripcion} correspondiente a ${transaccion.categoria},
            por el monto de ${transaccion.monto} vence a las ${transaccion.hora}. Por favor, pague este monto.
        `;

        const emailRecordatorio = {
            subject: 'Recordatorio de Pago',
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
        emailList.appendChild(emailItem);
    }
});







