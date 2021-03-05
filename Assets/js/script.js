$(".fiveDay").hide();



$(document).ready(function () {
   
    var cityHisArr = JSON.parse(localStorage.getItem("history")) || [];
    console.log(cityHisArr);
    //    console.log(currentDate);

    if (cityHisArr.length > 0) {

        for (var i = 0; i < cityHisArr.length; i++) {
            var history = $('<li class="list-group-item">').text(cityHisArr[i]);
            $('.list-group').prepend(history);
        }
    }
    $('li').on("click", function () {
        var city = $(this).text();
        $(".main").show();
        console.log(city);
        getCity(city)
        
    })
    

    $('.button').on('click', function (event) {
        event.preventDefault();
        $(".main").show();
        var city = $(".search").val().trim();
        getCity(city)

        if (cityHisArr.indexOf(city) === -1) {
            cityHisArr.push(city);

        }
        console.log(cityHisArr);
        localStorage.setItem('history', JSON.stringify(cityHisArr));


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
        var cardBody = $('<div>').addClass('card-body');
        var cardTitle = $('<h3>').addClass('card-title').text(response.name);
        var temp = $("<h5>").addClass("card-text").text("Temp: " + Math.round(response.main.temp)+ "°F");
        var icon = $('<img>').attr("src", 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
        var humidity = $("<h5>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
        var wind = $("<h5>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " mph");
        // var uv = $("<h5>").addClass("card-text").text(response.)
        $('.current').append(card.append(cardBody.append(cardTitle.append(icon), temp, humidity, wind)));
        getFiveDay(response.coord.lat, response.coord.lon);
        console.log(getCity)

        // var apiUv = "http://api.openweathermap.org/data/2.5/uvi?appid=5cf12bb9825ee08ba1dc5b220d9c50ca&lat="+lat+"&lon="+long;
        
        // $.ajax({
        //     url: apiUv,
        //     method: "GET"
        // }).then(function (response) {

        // }
        


    })
    
    
        
    
    // var longEL = response.coord.lon;
    // var latEl = response.coord.lat; 
   

    
    
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
            // console.log(response.daily[i].humidity)
            var icon = $('<img>').attr("src", 'http://openweathermap.org/img/w/' + response.daily[i].weather[0].icon + '.png')
            
            $('.five-day').append(card.append(cardBody.append(cardTitle.append(icon)), tempMin, tempMax, humid));
        }
        
    })
}























