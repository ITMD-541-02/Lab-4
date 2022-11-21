let weather = {
    fetchWeather: function (city) {
        if (city == "") { //Error for blank search
            alert("No weather found.");
            throw new Error("No weather found.");
        }
        else {
            fetch("https://weatherdbi.herokuapp.com/data/weather/" + city)
                .then((response) => {
                    if (!response.ok) {
                        alert("No weather found.");
                        throw new Error("No weather found.");
                    }
                    return response.json();
                })
                .then((data) => this.displayWeather(data));
        }
    },
    displayWeather: function (data) {
        /* For the current day */
        var { status } = data;
        if (status == "fail") { //Check for the weatherdbi if random entry is typed, search for fail status
            alert("No weather found.");
            throw new Error("No weather found.");
        }

        var { region } = data;
        var { dayhour, iconURL, precip, humidity, comment } = data.currentConditions;
        var { c } = data.currentConditions.temp;
        var { km } = data.currentConditions.wind;
        var media = window.matchMedia("(max-width: 650px)"); //For media, acts for the background image


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

        //For loop to output next 7 days
        for (let i = 1; i < 8; i++) {
            day = data.next_days[i].day;
            document.querySelector(".day" + i + "").innerHTML = day;
            comment = data.next_days[i].comment;
            document.querySelector(".comment" + i + "").innerHTML = comment;
            c = data.next_days[i].max_temp.c;
            document.querySelector(".max_temp" + i + "").innerHTML = c + "°C";
            c = data.next_days[i].min_temp.c;
            document.querySelector(".min_temp" + i + "").innerHTML = c + "°C";
            iconURL = data.next_days[i].iconURL;
            document.querySelector(".icon" + i + "").src = iconURL;
        }

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

    geosearch: function (area) {
        this.fetchWeather(area);

    },

};

const findMyLocation = () => {
    const success = (position) => {
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        var location = latitude + "," + longitude + "";
        console.log("" + latitude + "," + longitude + "")
        weather.geosearch(location);
    }

    const error = () => {
        alert("Unable to retrieve your location")
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search .geo").addEventListener("click", findMyLocation);

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