fetch("https://weatherdbi.herokuapp.com/data/weather/lagrangepark")
    .then(response => response.json())
    .then(data => console.log(data))


