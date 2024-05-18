export default class Controller {
  static location = ''
  static getMainPage(req, res) {
    res.render('home', {
      title: 'Main'
    })
  }

  static async getCityPage(req, res) {
    try {
      let city = req.params.city
      if (!city) city = this.location
      const weatherResponse = await Controller.defineWeather(city)
      const weatherParams = {
        temp: weatherResponse.current.temp_c,
        press: weatherResponse.current.pressure_mb,
        hum: weatherResponse.current.humidity,
        img: weatherResponse.current.condition.icon
      }
      res.render('city', {
        title: city,
        cityName: city,
        weatherParams
      })
    } catch (e) {
      console.log(e)
    }
  }

  static async defineWeather(cityName) {
    const API_KEY = '0cc11595e89649cb8c4232321230901'
    const weatherResult = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`)
    if (!weatherResult.ok) {
      throw new Error('Failed to fetch weather data')
    }
    return weatherResult.json()
  }

  static getLocation(req, res) {
    Controller.location = req.query.city
    setTimeout(() => Controller.getCityPage(req, res), 2000)
  }
}
