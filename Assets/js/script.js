

$(document).ready(function () {
    //     var currentDate = moment().format("dddd, MMMM Do YYYY");
        var cityHisArr = JSON.parse(localStorage.getItem("history")) || [];
            console.log(cityHisArr);
    //    console.log(currentDate);

    // if (cityHisStr != null) {
    //     cityHisArr = cityHisStr.split(',');
    // }
    // for (i = 0; i < cityHisArr.length; itt) {
    //     var history = $('<li class=".nav-item">').text(cityHisArr[i]);
    //     $('.nav-link').prepend(history);
    // }
    $('.button').on('click', function (event) {
        event.preventDefault();
        $(".main").show();
        var city = $(".search").val().trim();
        getCity(city)
        console.log(city)
        if(cityHisArr.indexOf(city) === -1) {
            cityHisArr.push(city);

        }
        console.log(cityHisArr);
        localStorage.setItem('history', JSON.stringify(cityHisArr));


    })

})



function getCity(cityEl) {
    var api = "https://api.openweathermap.org/data/2.5/weather?q=" + cityEl + "&APPID=5cf12bb9825ee08ba1dc5b220d9c50ca&units=imperial";
    $(".current").empty();
    $.ajax({
        url: api,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var card = $("<div>").addClass("card").attr("style", "border 1px solid");
        var cardBody = $('<div>').addClass('card-body');
        var cardTitle = $('<h3>').addClass('card-title').text(response.name);
        var temp = $("<h5>").addClass("card-text").text(Math.round(response.main.temp));
        var icon = $('<img>').attr("src", 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png')
        $('.current').append(card.append(cardBody.append(cardTitle.append(icon), temp)));
        getFiveDay(response.coord.lat,response.coord.lon);
    })


}

function getFiveDay(lat, lon) {
    var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=imperial&APPID=5cf12bb9825ee08ba1dc5b220d9c50ca&units=imperial`;
    
    $.ajax({
        url: api,
        method: "GET"
    }).then(function(response){
        console.log(response);
        
        for(var i = 1; i < 6; i++) {
            console.log(response.daily[i])
            
        }
        var card = $("<div>").addClass("card").attr("style", "border 1px solid");
        var cardBody = $('<div>').addClass('card-body');
        var cardTitle = $('<h3>').addClass('card-title').text(response.name);
        $('.five-day').append(card.append(cardBody.append(cardTitle.append(icon))));
        
    })
}























