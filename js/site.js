let weather = {
    apiKey: "API KEY GOES HERE",
    fetchWeather: function (city) {
        fetch("https://weatherdbi.herokuapp.com/data/weather/" + city)
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        /* For the current day */
        const { region } = data;
        const { dayhour, iconURL, precip, humidity, comment } = data.currentConditions;
        const { c } = data.currentConditions.temp;
        const { mile } = data.currentConditions.wind;

        /* For the next days */
        const { day } = data.next_days[day];
        const { comment1 } = data.next_days;

        /* For the current day */
        document.querySelector(".city").innerText = "Weather in " + region;
        document.querySelector(".dayhour").innerHTML = dayhour;
        document.querySelector(".icon").src = iconURL;
        document.querySelector(".temp").innerText = c + "°C";
        document.querySelector(".precip").innerHTML = "Precipitation: " + precip;
        document.querySelector(".comment").innerHTML = comment;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity;
        document.querySelector(".wind").innerText = "Wind speed: " + mile + " mph";

        /* For the next days */
        document.querySelector(".day").innerHTML = day;
        document.querySelector(".comment1").innerHTML = comment1;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("chicago");