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
    fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${data}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data.tickets)
            getAlltickets(data.tickets)
        });
}

function compare(a, b) {
    const genreA = a.price
    const genreB = b.price

    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}


function compares(a, b) {
    const genreA = a.duration
    const genreB = b.duration

    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}


function getFilteredPins(data) {
    // return dataArr = data.forEach(element => {
    //     element.segments.forEach(elem => {
    //         console.log(Math.min(elem.duration))
    //     })
    // });
    const elemArr = []
    for (let i = 0; i < data.length; i++) {
        elemArr.push(data[i].segments);
    }

    // for (let y = 0; y < elemArr.length; y++) {
    //     const comp = elemArr;
    //     console.log(comp)
    // }

    console.log(elemArr)
}



function getAlltickets(data) {
    const filterPriceArr = data.sort(compare).slice(0, 5)
    console.log(getFilteredPins(data));
}