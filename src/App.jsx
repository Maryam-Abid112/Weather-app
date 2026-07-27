import { useState } from 'react'
import axios from "axios";
import './App.css'

function App() {
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [temp, settemp] = useState(null);
  const [unit, setunit] = useState("");
  const [forecasts, setforecasts] = useState([]);
  const [icons, seticons] = useState("");
  



  const apikey = import.meta.env.VITE_API_KEY;

  const searchweather = () => {
    checkcurrentweather();
    forecast();

  }

  const checkcurrentweather = async () => {
    try {

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apikey}&units=${unit}`);
      console.log(response);
      const weatherdata = response.data.weather[0].icon
      seticons(weatherdata);
      settemp(response.data);
    }
    catch (err) {
      console.log("Error" + err);

    }
  }

  const forecast = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apikey}&units=${unit}`);
      console.log(response);
      const days = response.data.list.filter((e) => {
        return e.dt_txt.includes("12:00:00");
      });

      setforecasts(days);
      console.log(days)
    } catch (error) {
      console.log("Error" + error);
    }
  }


  return (
    <>

      <div className='container'>
        <div className="inputs">

         
          <input
            type="text"
            id="country"
            placeholder='Enter Country'
            onChange={(e) => setcountry(e.target.value)}
          />

          
          <input
            type="text"
            id="city"
            placeholder='Enter City'
            onChange={(e) => setcity(e.target.value)}
          />

          

          <select onChange={(e) => setunit(e.target.value)} placeholder="Select unit ">
            <option value="metric">Celsius</option>
            <option value="imperial">Fahrenheit</option>
            <option value="">Kelvin</option>
          </select>

          <button
            onClick={searchweather}
            disabled={!city}
          >
            Check Weather
          </button>

        </div>


        <div className='weather'>


          {temp && (
            <div className='Currentweather' >
              <img src={`https://openweathermap.org/img/wn/${icons}@2x.png`} alt="weather icon" />
              <p><span><b>Country: </b></span>{temp.sys.country}</p>
              <p><span><b>City: </b></span>{temp.name}</p>
              <p><span><b>Temperature: </b></span>{temp.main.temp}{unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}</p>
              <p><span><b>Feels-like: </b></span>{temp.main.feels_like}{unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}</p>
              <p><span><b>Humidity: </b></span>{temp.main.humidity}</p>
              <p><span><b>Wind speed: </b></span>{temp.wind.speed}</p>
              <p><span><b>Weather description: </b></span>{temp.weather[0].description}</p>


            </div>
          )
          }
          <div className='Forecast'>
            {forecasts.map((e) => {
              return (

                <div key={e.dt} >

                  <p>{e.dt_txt}</p>
                  <img src={`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt="weather icon" />
                  <p><span><b>Temperature: </b></span>{e.main.temp} {unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}</p>
                  <p><span><b>Feels-like: </b></span>{e.main.feels_like}</p>
                  <p><span><b>Humidity: </b></span>{e.main.humidity}</p>
                </div>

              )
            })}
          </div>

        </div>
      </div>

    </>
  )
}

export default App
