const API_DATA_KEY = 'e87ac4483fb3469f9b44372a0e2936ca'
const locationButton = document.querySelector('.location')

async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => resolve(position), error => reject(error))
    } else {
      reject(new Error('Geolocation is not supported by this browser.'))
    }
  })
}

async function showPosition(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_DATA_KEY}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    const city = data.results[0].components.district.split(' ')[0]
    return city
  } catch (error) {
    console.error('Error getting location:', error)
    throw new Error('Error getting location')
  }
}

if (locationButton) {
  locationButton.addEventListener('click', async (event) => {
    try {
      const userLocation = await getLocation()
      const city = await showPosition(userLocation)
      fetch(`http://localhost:5000/weather?city=${city}`)
        .catch(err => {
          // eslint-disable-next-line no-undef
          alert(err)
        })
    } catch (error) {
      // eslint-disable-next-line no-undef
      alert(error.message)
    }
  })
}
