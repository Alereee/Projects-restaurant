$(function(){
    $('#num-guests-dec').on('click', function() {
        let currentNumGuests = Number($('#num-guests').val());
        $('#num-guests').val(  Math.max(currentNumGuests - 1, 1) );
    });

    $('#num-guests-inc').on('click', function() {
        let currentNumGuests = Number($('#num-guests').val());
        $('#num-guests').val(currentNumGuests + 1);
    });

    // <button class="selected">Январь</button>
    // <button>Февраль</button>
    // <button>Март</button>

    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", 
        "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function makeCalendar(monthIndex) {
        const firstDayOfMonth = new Date(
            today.getFullYear() + Math.floor((today.getMonth() + monthIndex) / 12),
            (today.getMonth() + monthIndex) % 12,
            1
        );
        const dayShift = (firstDayOfMonth.getDay() - 1 + 7) % 7;
        const firstDayOfCalendar = new Date(firstDayOfMonth);
        firstDayOfCalendar.setDate(1 - dayShift);
        
        let calendar = [];
        let date = new Date(firstDayOfCalendar)
        for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
            for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
                const weekDay = (date.getDay() + 6) % 7;
                calendar.push({
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                    weekDay: weekDay,
                    disabled: date < today,
                    isToday: (date <= today) && (today <= date),
                });

                date.setDate(date.getDate() + 1);
                if ((date.getMonth() > firstDayOfMonth.getMonth()) && (weekDay == 0))
                    return calendar;
            }
        }
        return calendar;
    }
    
    function fillMonthNames() {
        for (let monthIndex = 0; monthIndex < 3; monthIndex += 1) {
            const monthName = monthNames[ (today.getMonth() + monthIndex) % 12 ];
            let button = document.createElement('button');
            button.innerText = monthName;
            button.dataset['monthIndex'] = monthIndex;
            if (monthIndex == 0) {
                button.classList.add('selected');
            }
            $('#calendar .month-selector').append(button);
        }
    }

    function fillCalendar(currentMonthIndex) {
        let calendar = makeCalendar(currentMonthIndex);
        const calendarDayContainer = $('#calendar table.day-selector tbody');
        calendarDayContainer.empty();
        let row = [];
        for (let day of calendar) {
            let classNames = day.disabled ? ["disabled"] : [];
            if (day.isToday) {
                classNames.push('selected');
            }
            const className = classNames.join(" ");
            row.push( `<td><div class="${className}" data-year="${day.year}" data-month="${day.month}" data-day="${day.day}">${day.day}</div></td>` );
            
            if (day.weekDay == 6) {
                const rowHtml = '<tr>' + row.join('') + '</tr>';
                calendarDayContainer.append($(rowHtml));
                row = [];
            }
        }
    }

    function obtainTimeSlots(year, month, day) {
        // ToDo: make request to backend
        return [
            {time: '17:00', occupied: false},
            {time: '17:30', occupied: true},
            {time: '18:00', occupied: false},
            {time: '18:15', occupied: false},
            {time: '18:30', occupied: false},
            {time: '18:45', occupied: false},
        ]
    }

    function fillTimeSlots(year, month, day) {
        const timeslots = obtainTimeSlots(year, month, day);
        const container = $('#calendar .time-selector')
        container.empty();
        for (let slot of timeslots) {
            let className = slot.occupied ? 'occupied' : '';
            container.append( $(`<button class="${className}" data-time="${slot.time}">${slot.time}</button>`) );
        }
    }

    fillMonthNames();
    fillCalendar(0);
    fillTimeSlots(today.getFullYear(), today.getMonth() + 1, today.getDay());

    $('#calendar .month-selector button').on('click', function(event) {
        const button = $(event.target);
        fillCalendar(button.data('monthIndex'));
        $('#calendar .month-selector button.selected').removeClass('selected');
        button.addClass('selected');
    });
    
    let selectedDay = null,
        selectedMonth = null,
        selectedYear = null;
    $('#calendar .day-selector').on('click', 'td', function(event) {
        const cell = $(event.target).closest('td');
        const cellDiv = cell.find('div');
        if (cellDiv.hasClass('disabled')) return;
        $('#calendar .day-selector td .selected').removeClass('selected');
        cellDiv.addClass('selected');

        selectedDay = cellDiv.data('day');
        selectedMonth = cellDiv.data('month');
        selectedYear = cellDiv.data('year');

        const dayString = String(selectedDay).padStart(2, "0");
        const monthString = String(selectedMonth).padStart(2, "0");
        const selectedDate = `${dayString}.${monthString}.${selectedYear}`;

        fillTimeSlots(selectedYear, selectedMonth, selectedDay);
        
        $('#datetimepicker').val(selectedDate);
    });

    $('#calendar .time-selector').on('click', 'button', function(event) {
        const button = $(event.target);
        
        const dayString = String(selectedDay).padStart(2, "0");
        const monthString = String(selectedMonth).padStart(2, "0");
        const selectedDate = `${dayString}.${monthString}.${selectedYear}`;

        const selectedTime = button.data("time");
        $('#calendar .time-selector button.selected').removeClass('selected');
        button.addClass('selected');

        $('#datetimepicker').val(`${selectedDate} ${selectedTime}`);
    });

    $('#datetimepicker').on('click', function(){
        $('#calendar').show();
    });

    $('#calendar .close').on('click', function(){
        $('#calendar').hide();
    });
});
