let ticketList = document.querySelector('.ticket-list'),
    ticketItem = document.querySelector('#ticket-template')
    .content
    .querySelector('.ticket-item');


fetch('https://front-test.beta.aviasales.ru/search')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        onSucces(data.searchId)
    });

function onSucces(data) {
    window.searchId = data
    console.log(searchId)
    getTickets(searchId)
}

function getTickets(data) {
    Promise.all([
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${data}`)
        .then(value => value.json()),
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${data}`)
        .then(value => value.json()),
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${data}`)
        .then(value => value.json())
    ])

    .then((value) => {
            const dataArr = value[0].tickets.concat(value[1].tickets).concat(value[2])
            console.log(dataArr)
            getAlltickets(dataArr)

        })
        .catch((err) => {
            console.log(err);
        });
}

function numbersArr(a, b) {
    return a - b;
};

function getAlltickets(data) {
    const filterPriceArr = data.sort((a, b) => a.price - b.price).slice(0, 5)
    console.log(filterPriceArr)
        // const filterTime = data.sort((a, b) => a.segments[0].duration - b.segments[1].duration).slice(0, 5)
    drawEvents(filterPriceArr);

}

function drawEvents(events) {
    remove();
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < events.length; i++) {
        fragment.appendChild(render(events[i]));
    }

    ticketList.appendChild(fragment);
}


function render(events) {

    let ticketList = document.querySelector('.ticket-list'),
        ticketDestination = ticketItem.querySelector('.ticket-destination'),
        ticketTransferum = ticketItem.querySelector('.ticket-transfer-sum'),
        ticketPath = ticketItem.querySelector('.ticket-path'),
        ticketTime = ticketItem.querySelector('.ticket-time'),
        ticketPathTime = ticketItem.querySelector('.ticket-path-time'),
        ticketTransferNamer = ticketItem.querySelector('.ticket-transfer-name'),
        ticketDestination2 = ticketItem.querySelector('.ticket-destination-2'),
        ticketTransferum2 = ticketItem.querySelector('.ticket-transfer-sum-2'),
        ticketPath2 = ticketItem.querySelector('.ticket-path-2'),
        ticketTime2 = ticketItem.querySelector('.ticket-time-2'),
        ticketPathTime2 = ticketItem.querySelector('.ticket-path-time-2'),
        ticketTransferNamer2 = ticketItem.querySelector('.ticket-transfer-name-2'),
        finishTime = ticketItem.querySelector('.finish-time'),
        finishTime2 = ticketItem.querySelector('.finish-time-2'),
        startTime = ticketItem.querySelector('.start-span'),
        startTime2 = ticketItem.querySelector('.start-span-2'),
        price = ticketItem.querySelector('.price'),

        ticketLogo = ticketItem.querySelector('.ticket-logo'),
        event = ticketItem.cloneNode(true);

    if (events) {
        const segments1 = events.segments[0]
        const segments2 = events.segments[1]

        ticketDestination.innerHTML = segments1.origin + ' - ' + segments1.destination;
        ticketDestination2.innerHTML = segments2.origin + ' - ' + segments2.destination;
        ticketLogo.src = `http://pics.avs.io/99/36/${events.carrier}.png`;
        price.innerHTML = events.price + ' P';
        ticketTransferum.innerHTML = getTransfers(segments1.stops);
        finishTime.innerHTML = getDate(segments1.date, segments1.duration);
        startTime.innerHTML = getDate(segments1.date);
        finishTime2.innerHTML = getDate(segments2.date, segments2.duration);
        startTime2.innerHTML = getDate(segments2.date);
        ticketPathTime.innerHTML = getTimeFromMins(segments1.duration)
        ticketPathTime2.innerHTML = getTimeFromMins(segments2.duration)
        ticketTransferNamer.innerHTML = segments1.stops
        ticketTransferNamer2.innerHTML = segments2.stops
        ticketTransferum2.innerHTML = getTransfers(segments2.stops);

        return event;
    } else {
        return null;
    }
}

function getTransfers(array) {
    let transfer
    if (array.length == 0) {
        transfer = 'без пересадок'
    } else if (array.length == 1) {
        transfer = '1 пересадка'
    } else if (array.length == 2) {
        transfer = '2 пересадки'
    } else {
        transfer = "3 пересадки"
    }
    return transfer
}

function remove() {
    let obj = document.querySelectorAll('.ticket-item');
    for (let i = 1; i < obj.length; i++) {
        obj[i].remove();
    }
}


function getDate(date, time) {
    var t = new Date(date);
    if (time) {
        t.setMinutes(t.getMinutes() + time);
    }
    let hours = t.getHours();
    let minutes = t.getMinutes();
    if (minutes.toString().length <= 1) {
        minutes = '0' + minutes
    } else if (hours.toString().length <= 1) {
        hours = '0' + hours
    }
    return hours + ':' + minutes;

}

function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;

    if (minutes.toString().length <= 1) {
        minutes = '0' + minutes
    }
    return hours + ':' + minutes;
};

function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'Ч' + ' ' + minutes + 'М';
};