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
        const { region } = data;
        const { dayhour } = data.currentConditions;
        const { iconURL } = data.currentConditions;
        const { c } = data.currentConditions.temp;
        const { humidity } = data.currentConditions;
        const { mile } = data.currentConditions.wind;
        document.querySelector(".city").innerText = "Weather in " + region;
        document.querySelector(".dayhour").innerHTML = dayhour;
        document.querySelector(".icon").src = iconURL;
        document.querySelector(".temp").innerText = c + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity;
        document.querySelector(".wind").innerText =
            "Wind speed: " + mile + " mph";
        document.querySelector(".weather").classList.remove("loading");
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

weather.fetchWeather("Denver");