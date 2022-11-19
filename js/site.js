let weather = {
    fetchWeather: function (city) {
        fetch("https://weatherdbi.herokuapp.com/data/weather/" + city)
            .then((response) => {
                if (!response.ok) { /* Error trapping but doesn't work properly */
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        /* For the current day */
        var { region } = data;
        var { dayhour, iconURL, precip, humidity, comment } = data.currentConditions;
        var { c } = data.currentConditions.temp;
        var { km } = data.currentConditions.wind;
        var media = window.matchMedia("(max-width: 650px)");

        /* For the current day */
        document.querySelector(".city").innerText = "Weather in " + region;
        document.querySelector(".dayhour").innerHTML = dayhour;
        document.querySelector(".icon").src = iconURL;
        document.querySelector(".temp").innerText = c + "°C";
        document.querySelector(".precip").innerHTML = "Precipitation: " + precip;
        document.querySelector(".comment").innerHTML = comment;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity;
        document.querySelector(".wind").innerText = "Wind speed: " + km + " kmh";

        var { day } = data.next_days[1];
        document.querySelector(".day1").innerHTML = day;
        day = data.next_days[2].day;
        document.querySelector(".day2").innerHTML = day;
        day = data.next_days[3].day;
        document.querySelector(".day3").innerHTML = day;
        day = data.next_days[4].day;
        document.querySelector(".day4").innerHTML = day;
        day = data.next_days[5].day;
        document.querySelector(".day5").innerHTML = day;
        day = data.next_days[6].day;
        document.querySelector(".day6").innerHTML = day;
        day = data.next_days[7].day;
        document.querySelector(".day7").innerHTML = day;

        comment = data.next_days[1].comment;
        document.querySelector(".comment1").innerHTML = comment;
        comment = data.next_days[2].comment;
        document.querySelector(".comment2").innerHTML = comment;
        comment = data.next_days[3].comment;
        document.querySelector(".comment3").innerHTML = comment;
        comment = data.next_days[4].comment;
        document.querySelector(".comment4").innerHTML = comment;
        comment = data.next_days[5].comment;
        document.querySelector(".comment5").innerHTML = comment;
        comment = data.next_days[6].comment;
        document.querySelector(".comment6").innerHTML = comment;
        comment = data.next_days[7].comment;
        document.querySelector(".comment7").innerHTML = comment;

        c = data.next_days[1].max_temp.c;
        document.querySelector(".max_temp1").innerHTML = c + "°C";
        c = data.next_days[2].max_temp.c;
        document.querySelector(".max_temp2").innerHTML = c + "°C";
        c = data.next_days[3].max_temp.c;
        document.querySelector(".max_temp3").innerHTML = c + "°C";
        c = data.next_days[4].max_temp.c;
        document.querySelector(".max_temp4").innerHTML = c + "°C";
        c = data.next_days[5].max_temp.c;
        document.querySelector(".max_temp5").innerHTML = c + "°C";
        c = data.next_days[6].max_temp.c;
        document.querySelector(".max_temp6").innerHTML = c + "°C";
        c = data.next_days[7].max_temp.c;
        document.querySelector(".max_temp7").innerHTML = c + "°C";

        c = data.next_days[1].min_temp.c;
        document.querySelector(".min_temp1").innerHTML = c + "°C";
        c = data.next_days[2].min_temp.c;
        document.querySelector(".min_temp2").innerHTML = c + "°C";
        c = data.next_days[3].min_temp.c;
        document.querySelector(".min_temp3").innerHTML = c + "°C";
        c = data.next_days[4].min_temp.c;
        document.querySelector(".min_temp4").innerHTML = c + "°C";
        c = data.next_days[5].min_temp.c;
        document.querySelector(".min_temp5").innerHTML = c + "°C";
        c = data.next_days[6].min_temp.c;
        document.querySelector(".min_temp6").innerHTML = c + "°C";
        c = data.next_days[7].min_temp.c;
        document.querySelector(".min_temp7").innerHTML = c + "°C";

        iconURL = data.next_days[1].iconURL;
        document.querySelector(".icon1").src = iconURL;
        iconURL = data.next_days[2].iconURL;
        document.querySelector(".icon2").src = iconURL;
        iconURL = data.next_days[3].iconURL;
        document.querySelector(".icon3").src = iconURL;
        iconURL = data.next_days[4].iconURL;
        document.querySelector(".icon4").src = iconURL;
        iconURL = data.next_days[5].iconURL;
        document.querySelector(".icon5").src = iconURL;
        iconURL = data.next_days[6].iconURL;
        document.querySelector(".icon6").src = iconURL;
        iconURL = data.next_days[7].iconURL;
        document.querySelector(".icon7").src = iconURL;

        if (media.matches) {
            document.body.style.backgroundImage =
                "url('https://source.unsplash.com/500x2600/?" + region + "')";
        }
        else {
            document.body.style.backgroundImage =
                "url('https://source.unsplash.com/1920x1080/?" + region + "')";
        }

    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    /*
        geosearch: function () {
            this.fetchWeather(cord);
        },
        */
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search button.geo").addEventListener("click", function () {
    weather.geosearch();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("chicago");

/*
(function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var cord = "" + lat + "," + long + "";
        console.log(cord);
        return cord;
    },
        function (error) {
            console.log("The Locator was denied. :(")
        })
})();

*/