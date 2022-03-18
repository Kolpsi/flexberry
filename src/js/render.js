window.events = {

    /**
     * @description функция отрисовки одного события
     * @param {object} events - объект
     * @return {object} event - возвращает событие
     */
    render: function(events) {

        let ticketDestination = ticketList.querySelector('.ticket-destination'),
            ticketTransferum = ticketList.querySelector('.ticket-transfer-sum'),
            ticketPath = ticketList.querySelector('.ticket-path'),
            ticketTime = ticketList.querySelector('.ticket-time'),
            ticketPathTime = ticketList.querySelector('.ticket-path-time'),
            ticketTransferNamer = ticketList('.ticket-transfer-name'),
            ticketDestination2 = ticketList.querySelector('.ticket-destination-2'),
            ticketTransferum2 = ticketList.querySelector('.ticket-transfer-sum-2'),
            ticketPath2 = ticketList.querySelector('.ticket-path-2'),
            ticketTime2 = ticketList.querySelector('.ticket-time-2'),
            ticketPathTime2 = ticketList.querySelector('.ticket-path-time-2'),
            ticketTransferNamer2 = ticketList('.ticket-transfer-name-2'),
            price = ticketList.querySelector('.price')

        ticketLogo = ticketList.querySelector('.ticket-logo'),
            event = ticketItem.cloneNode(true);

        if (events) {



            getDate(segments1.date, segments1.duration);


            eventItem.value = events.id;
            ticketDestination.innerHTML = segments1.origin + segmetns2.destination;
            price.innerHTML = events.price;
            // ticketLogo = `src=http://pics.avs.io/99/36/${events.carrier}.png`;

            return event;
        } else {
            return null;
        }
    },

    drawEvents: function(events) {
        window.events.remove();
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < events.length; i++) {
            fragment.appendChild(window.events.render(events[i]));
        }

        ticketList.appendChild(fragment);
    }
}

// function getTimeFromMins(mins) {
//     let hours = Math.trunc(mins / 60);
//     let minutes = mins % 60;
//     return hours + ':' + minutes;
// };

// var s = "2022-03-27T22:11:00.000Z"


// var d = new Date(s)

// function millisToMinutesAndSeconds(millis) {
//     var minutes = Math.floor(millis / 60000);
//     return minutes;
// }

// getDate(segments1.date, segments1.duration);

// function getDate(date, minutes) {
//     var t = new Date(date);
//     console.log(t)
//     t.setMinutes(t.getMinutes() + minutes);
//     console.log(t)
// }