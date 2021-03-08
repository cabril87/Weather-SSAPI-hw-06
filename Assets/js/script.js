$(".fiveDay").hide();
$(document).ready(function () {

    var cityHisArr = JSON.parse(localStorage.getItem("history")) || [];
    console.log(cityHisArr);

    $('li').on("click", function () {
        var city = $(this).text();
        $(".main").show();
        console.log(city);
        getCity(city)

    })

    $('.clear').on('click', function (event) {
        event.preventDefault();
        localStorage.clear();
        location.reload();
    })

    $('.button').on('click', function (event) {
        event.preventDefault();
        $(".main").show();

        var city = $(".search").val().trim();

        if (cityHisArr.indexOf(city) === -1) {
            cityHisArr.push(city);
        }
        if (cityHisArr.length > 0) {
            for (var i = 0; i < cityHisArr.length; i++) {
                var history = $('<li class="list-group-item">').text(cityHisArr[i]);
            }
        }
        $('.list-group').prepend(history);
        localStorage.setItem('history', JSON.stringify(cityHisArr));
        console.log(cityHisArr);
        getCity(city)
    })
})

function getCity(cityEl) {
    var api = "https://api.openweathermap.org/data/2.5/weather?q=" + cityEl + "&units=imperial&APPID=5cf12bb9825ee08ba1dc5b220d9c50ca";

    $(".current").empty();
    $.ajax({
        url: api,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var card = $("<div>").addClass("card").attr("style", "border 1px solid");
        var cardBody = $('<div>').addClass('card-body').attr('id', 'current-card');
        var cardTitle = $('<h3>').addClass('card-title').text(response.name);
        var temp = $("<h5>").addClass("card-text").text("Temp: " + Math.round(response.main.temp) + "°F");
        var icon = $('<img>').attr("src", 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
        var humidity = $("<h5>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
        var wind = $("<h5>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " mph");
        $('.current').append(card.append(cardBody.append(cardTitle.append(icon), temp, humidity, wind)));
        getFiveDay(response.coord.lat, response.coord.lon);
        console.log(getCity);
        getUv(response)
    })
}

function getFiveDay(lat, lon) {
    var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=imperial&APPID=5cf12bb9825ee08ba1dc5b220d9c50ca`;
    $.ajax({
        url: api,
        method: "GET"
    }).then(function (response) {

        $(".five-day").empty();
        $(".fiveDay").show()
        for (var i = 1; i < 6; i++) {
            console.log(response.daily[i]);
            var date = moment.unix(response.daily[i].dt).format("MMM Do");
            var card = $("<div>").addClass("card").attr("style", "border 1px solid");
            var cardBody = $('<div>').addClass('card-body');
            var cardTitle = $('<h3>').addClass('card-title').text(date);
            var tempMin = $("<h5>").addClass("card-text m-3").text("Min Temp: " + Math.round(response.daily[i].temp.min) + "°F");
            var tempMax = $("<h5>").addClass("card-text m-3").text("Max Temp: " + Math.round(response.daily[i].temp.max) + "°F");
            var humid = $("<h5>").addClass("card-text m-3").text("Humidity: " + response.daily[i].humidity + "%");
            var icon = $('<img>').attr("src", 'http://openweathermap.org/img/w/' + response.daily[i].weather[0].icon + '.png')

            $('.five-day').append(card.append(cardBody.append(cardTitle.append(icon)), tempMin, tempMax, humid));
            
        }
    })
}
function getUv(response) {
    let lat = response.coord.lat;
    let lon = response.coord.lon;
    let apiUv = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=5cf12bb9825ee08ba1dc5b220d9c50ca`;
    console.log(apiUv)
    $.ajax({
        url: apiUv,
        method: "GET"
    }).then(function (response) {
        var button = $('<button>').text('Uv Index: ' + response.value);
        var current = $('#current-card')
        if (response.value < 3) {
            console.log('green');
            button.addClass('btn btn-sucess')
        } else if (response.value > 7) {
            console.log('red')
            button.addClass('btn btn-danger')
        } else {
            console.log('yellow')
            button.addClass('btn btn-warning')
        }
        current.append(button)
        console.log(response.value)
    })
}


























