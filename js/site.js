let weather = {
    fetchWeather: function (city) {
        fetch("https://weatherdbi.herokuapp.com/data/weather/" + city)
            .then(response => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then(data => console.log(data))
    }
}

document.querySelector("button").addEventListener("click", function () {
    weather.fetchWeather(document.querySelector(".search-bar").value);
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.fetchWeather(document.querySelector(".search-bar").value);
        }
    });

