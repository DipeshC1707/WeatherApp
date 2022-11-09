import React from "react";
import {useState} from "react";

function App() {
  const api = {
    key:"65662e54a791f6a1c4d8e1072bc7f7da",
    base:"https://api.openweathermap.org/data/2.5/"
    } 
  
  const [query, setquery] = useState("");
  const [weather, setweather] = useState({});
  const search = evt =>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res=>res.json())
      .then(result => {
        setweather(result);
        setquery("");
        console.log(weather)
    });
  }}

  
  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined")?((weather.main.temp > 16)?"app warm":"app"):"app"}>
        <main>
          <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search..." onChange={e=>setquery(e.target.value)} value={query} onKeyPress={search}/>
          </div>
          {(typeof weather.main != "undefined")?(
            <div>
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>) :("")}
        </main>
    </div>
  );
}

export default App;
