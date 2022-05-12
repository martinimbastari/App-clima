const API_KEY = 'b99f690de35c947c5f5d71a47177ab4e';
window.addEventListener('load', ()=> {
    let lon;
    let lat;

    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado')
    let vientoVelocidad = document.getElementById('viento-velocidad');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(   posicion => {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            //ubicacion actual
           const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

           //ubicacion por ciudad
        //    const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=${API_KEY}`

            fetch(url)
                .then( response => {return response.json()})
                .then( data => {
                    console.log(data.main.temp)
                    let temp = Math.round(data.main.temp)
                    let desc = data.weather[0].description
                    temperaturaValor.textContent = `${temp}°C`;
                    temperaturaDescripcion.textContent = desc;
                    ubicacion.textContent = data.name;
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;


                    //iconos animados
                    console.log(data.weather[0].main)
                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src='animated/thunder.svg'
                            console.log('TORMENTA');
                            break;
                          case 'Drizzle':
                            iconoAnimado.src='animated/rainy-2.svg'
                            console.log('LLOVIZNA');
                            break;
                          case 'Rain':
                            iconoAnimado.src='animated/rainy-7.svg'
                            console.log('LLUVIA');
                            break;
                          case 'Snow':
                            iconoAnimado.src='animated/snowy-6.svg'
                              console.log('NIEVE');
                            break;                        
                          case 'Clear':
                              iconoAnimado.src='animated/day.svg'
                              console.log('LIMPIO');
                            break;
                          case 'Atmosphere':
                            iconoAnimado.src='animated/weather.svg'
                              console.log('ATMOSFERA');
                              break;  
                          case 'Clouds':
                              iconoAnimado.src='animated/cloudy-day-1.svg'
                              console.log('NUBES');
                              break;  
                          default:
                            iconoAnimado.src='animated/cloudy-day-1.svg'
                            console.log('por defecto');
                        
                    }


                })
                .catch( error => {
                    console.log(error)
                })
        })
    }
})