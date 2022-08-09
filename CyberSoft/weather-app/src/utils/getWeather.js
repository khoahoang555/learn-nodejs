const asyncRequest = require("async-request");

const getWeather = async (location) => {
  const access_key = "0d19624e9b99c05dd2862fbfb66ac03a";
  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`;
  const resp = await asyncRequest(url);

  try {
    const data = JSON.parse(resp.body);
    const weather = {
      isSuccess: true,
      region: data.location.region,
      country: data.location.country,

      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      precip: data.current.precip,
      cloudcover: data.current.cloudcover,
    };
    console.log(weather);
    return weather;
  } catch (error) {
    console.log(error);
    return {
        isSuccess: false,
        error 
    }
  }
};

module.exports = {
    getWeather
}