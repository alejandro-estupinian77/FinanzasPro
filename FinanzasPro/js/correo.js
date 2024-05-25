document.addEventListener('DOMContentLoaded', () => {
    // Lógica para el botón de redacción
    const composeButton = document.getElementById('composeButton');
    composeButton.addEventListener('click', () => {
        alert('Redactar nuevo correo');
    });

    // Simular la carga de correos
    const emailList = document.querySelector('.email-list');
    const emails = [
        { subject: 'Bienvenido a FinanzasPro', sender: 'soporte@finanzaspro.com', date: '2024-05-25' },
        { subject: 'Actualización de cuenta', sender: 'no-reply@finanzaspro.com', date: '2024-05-24' },
        { subject: 'Nueva funcionalidad', sender: 'info@finanzaspro.com', date: '2024-05-23' },
        { subject: 'Promoción especial', sender: 'promociones@finanzaspro.com', date: '2024-05-22' },
        { subject: 'Notificación de seguridad', sender: 'seguridad@finanzaspro.com', date: '2024-05-21' }
    ];

    emails.forEach(email => {
        const emailItem = document.createElement('div');
        emailItem.className = 'email-item';
        emailItem.innerHTML = `
            <strong>${email.subject}</strong> 
            <span>${email.sender}</span> 
            <span style="margin-left:auto;">${email.date}</span>
        `;
        emailList.appendChild(emailItem);
    });
});


