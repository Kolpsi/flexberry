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
            console.log(data.tickets)
            getAlltickets(data.tickets)
        });
}

function filter(data) {
    // let arr = [];
    // for (let i = 0; i < data.length; i++) {
    //     let val = data[i].price;
    //     arr.push(val);
    //     arr.sort(function(a, b) {
    //         return a - b;
    //     });
    // }
    // // return arr.slice(0, 5);
    // return arr

    data.sort((prev, next) => prev.price - next.price);
}

function filterDuration(data) {
    let arr = [];
    var duration = []
    for (let i = 0; i < data.length; i++) {
        let val = data[i].segments;
        arr.push(val);
        val.forEach(element => {
            duration.push(element.duration)

        });
        duration.sort(function(a, b) {
            return a - b;
        });
    }
    return duration.slice(0, 5);
}


// function getFilteredPins(data) {
//     var filterData = data.
//     filter(function(filterElem) {
//         return checkHousingType(filterElem) && checkPrice(filterElem) &&
//             checkRoom(filterElem) && checkGuests(filterElem) && checkFeatures(filterElem);
//     });
//     return filterData.slice(MIN_ARRAY_LIMIT, MAX_ARRAY_LIMIT);
// }


function getFilteredPins(data) {
    var filterData = data.
    filter(function(elem, index, arr) {
        return filter(arr)
    });
    return filterData.slice(0, 5);
}

function getAlltickets(data) {
    window.data = data;
    window.filtered = filter(data);
    console.log(filtered)
        // window.filteredDur = filterDuration(data);
        // console.log(filteredDur);
        // window.filteredPins = getFilteredPins(data)
        // console.log(filteredPins)
}