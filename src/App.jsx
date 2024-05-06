import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/use.Fetch";
import getRandomNumber from "./assets/services/getRandomNumber";
import LocationInfo from "./assets/components/LocationInfo";
import ResidentCard from "./assets/components/ResidentCard";
import ApiRicki from "./assets/components/ApiRicki";

function App() {
  const [locationId, setLocationId] = useState(getRandomNumber(126));
  const [selector, setSelector] = useState("1")
  const [selectedValue, setSelectedValue] = useState('')
  const [locationId2, setLocationId2] = useState("alive")

  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const url2 = `https://rickandmortyapi.com/api/character/?name=rick&status=${locationId2}`
  const [check, setCheck] = useState()

  const [location, getLocation, hansError] = useFetch(url);
  

  useEffect(() => {
    if (locationId !== "") {
    getLocation();
    }
  }, [locationId]);

  const inputId = useRef();

  const hadleSubmit = (e) => {
    e.preventDefault();
    setLocationId(inputId.current.value.trim());
    setLocationId2(inputId.current.value.trim());
    setCheck(inputId.current.value.trim());
  };
const handleChange = (e) => {
  e.preventDefault();
  setSelectedValue(event.target.value.trim())
}

  console.log(location);
  console.log(selectedValue)

  return (
    <div>
   
      <header className="header">

         <img className="header__img2" src="/RickandMorty_title.png" alt="" />
       
      </header>
      <div className="header__form">
        <label className="header__input" htmlFor="select">Selecciona una opción</label>
        <select className="header__button select" name="" id="select" value={selectedValue} onChange={handleChange}>
          <option value="1">Filter by location</option>
          <option value="2">Filter by status(alive, dead, unknow)</option>
          <p>You have selected: {selectedValue}</p>
        </select>
      </div>
      
       <form className="header__form" onSubmit={hadleSubmit}>
            <input
              className="header__input"
              ref={inputId}
              type="text"
              placeholder="Enter Information"
            />
            <button className="header__button"> Search </button>
      </form>
      { 
      (selectedValue === "1")
       ? 
      
       ((hansError) || (check==="") || (check==="0"))
      ? 
      
        <h3 className="header__error">
          {" "}
          Hey! 📢🚥 you must provide an id from 1 to 126.🤷‍♀️😉
        </h3>
      
      : 
        <>
                <LocationInfo location={location} />

                 <div className="card__container">
                 {location?.residents.map((url) => (
                  <ResidentCard key={url} url={url} />
                ))}
                </div>
        </>
      
    
    :     
            <div className="card__container">
              
                <h2>Write status: alive, dead or unknown</h2>
                <ApiRicki  url = {url2} location = {locationId2}/>
                         
            </div>


    }
    
    </div>
  );
}

export default App;
