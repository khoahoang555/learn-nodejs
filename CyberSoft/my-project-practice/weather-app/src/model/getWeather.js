const asyncRequest = require('async-request');
const tokken = "e8e046c5bb3322a925707dfd2b24a436";

const getWeather = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${tokken}`;
    try {
        const weatherStr = await asyncRequest(url);
        const weatherJSON = JSON.parse(weatherStr.body);
        return {
            temperature: weatherJSON.main.temp,
            status: weatherJSON.weather[0].main,
            icon: weatherJSON.weather[0].icon,
            humidity: weatherJSON.main.humidity,
            windSpeed: weatherJSON.wind.speed 
        };
    } catch(error) {
        return undefined;
    }
}

module.exports = {
    getWeather
}