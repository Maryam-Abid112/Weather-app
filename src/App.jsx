import { useState } from 'react'
import axios from "axios";
import './App.css'

function App() {
  const[city, setcity]=useState("");
  const[country, setcountry]=useState("");
  const[temp,settemp]=useState("");
  const[unit,setunit]=useState("");

  const apikey=import.meta.env.VITE_API_KEY;
  console.log(unit);
   
  const checkcurrentweather=async()=>{
    try{
      
      const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apikey}&units=${unit}`);
       console.log(response);
       console.log(response.data.main)
       settemp(response.data.main.temp);
       console.log(temp);

    }
    catch(err){
      console.log("Error"+err);

    }
  }

  const  forecast=()=>{
    try {
      const response= await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apikey}&units=${unit}`);
       console.log(response);
      
      
    } catch (error) {
      console.log("Error"+err);
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
        <option value="kelvin">kelvin</option>
      </select>
      <button onClick={checkcurrentweather}>Check current Weather</button>
      <button onClick={forecast}>forecast</button>
      <div>
        <h1>Results</h1>
        <p>{temp}</p>
      </div>
      </div>   
    </>
  )
}

export default App
