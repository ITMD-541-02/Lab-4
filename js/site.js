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
        const { precip } = data.currentConditions;
        const { humidity } = data.currentConditions;
        const { mile } = data.currentConditions.wind;
        const { comment } = data.currentConditions;
        document.querySelector(".city").innerText = "Weather in " + region;
        document.querySelector(".dayhour").innerHTML = dayhour;
        document.querySelector(".icon").src = iconURL;
        document.querySelector(".temp").innerText = c + "°C";
        document.querySelector(".precip").innerHTML = precip;
        document.querySelector(".comment").innerHTML = comment;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity;
        document.querySelector(".wind").innerText = "Wind speed: " + mile + " mph";
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