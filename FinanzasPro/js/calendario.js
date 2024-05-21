let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
let events = {};

function renderCalendar() {
    const daysElement = document.getElementById('calendar-days');
    daysElement.innerHTML = "";
    const monthElement = document.getElementById('calendar-month');
    monthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('calendar-day-header');
        dayHeader.textContent = day;
        daysElement.appendChild(dayHeader);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day');
        daysElement.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        dayElement.onclick = () => openModal(day);
        daysElement.appendChild(dayElement);

        const eventDate = `${currentYear}-${currentMonth + 1}-${day}`;
        if (events[eventDate]) {
            events[eventDate].forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event');
                eventElement.textContent = event;
                dayElement.appendChild(eventElement);
            });
        }
    }
}

function previousMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar();
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar();
}

document.addEventListener('DOMContentLoaded', renderCalendar);