import { useState } from 'react'
import axios from "axios";
import './App.css'

function App() {
  const[city, setcity]=useState("");
  const[country, setcountry]=useState("");
  const[temp,settemp]=useState(null);
  const[unit,setunit]=useState("");
  const[forecasts,setforecasts]=useState([]);
  const[icons, seticons]=useState("");
  
  

  const apikey=import.meta.env.VITE_API_KEY;
   
  const checkcurrentweather=async()=>{
    try{
      
      const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apikey}&units=${unit}`);
       console.log(response);
       const weatherdata=response.data.weather[0].icon
       seticons(weatherdata);
       settemp(response.data);
    }
    catch(err){
      console.log("Error"+err);

    }
  }

  const  forecast=async()=>{
    try {
      const response= await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apikey}&units=${unit}`);
       console.log(response);
       const days= response.data.list.filter((e)=>{
             return e.dt_txt.includes("12:00:00");
       });
       setforecasts(days);
       console.log(days)
    } catch (error) {
      console.log("Error"+error);
    }
  }


  return (
    <>
     <div>
      <label htmlFor="country">Enter Country</label>
      <input type="text" id='country' onChange={(e)=>{setcountry(e.target.value)}}/>
      <label htmlFor="">Enter City</label>
      <input type="text" id='city' onChange={(e)=>{setcity(e.target.value)}} />
      <label htmlFor="units">Units</label>
      <select name="units" id="units" onChange={(e)=>{setunit(e.target.value)}}>
        <option value="metric">Celsius</option>
        <option value="imperial">Fahrenheit</option>
        <option value="">kelvin</option>
      </select>
      <button onClick={checkcurrentweather}>Check current Weather</button>
      <button onClick={forecast}>forecast</button>
      <div>
        <h1>Results</h1>

        {temp &&(
            <div >
              <img src={`https://openweathermap.org/img/wn/${icons}@2x.png`} alt="weather icon" />
              <p>Country:{temp.sys.country}</p>
              <p>Temperature:{temp.main.temp}</p>
              <p>Feels-like:{temp.main.feels_like}</p>
              <p>Humidity:{temp.main.humidity}</p>
             <p>Wind speed:{temp.wind.speed}</p>
             <p>Weather description:{temp.weather[0].description}</p>
             

            </div>
          )
        }

        {forecasts.map((e)=>{
          return(
         <div key={e.dt}>

          <p>{e.dt_txt}</p>
           <p>{"Temperature"+e.main.temp}</p>
           <p>{"Feels-like"+e.main.feels_like}</p>
           <p>{""+e.main.humidity}</p>
         </div>
          )
        })}
        
      </div>
      </div>   
    </>
  )
}

export default App
