import {FormControl,MenuItem,Select} from "@material-ui/core";
import { useEffect, useState } from "react";
import './App.css';
import InfoBox from "./Components/InfoBox";

function App() {

const[countries,setCountries] = useState([]);
const[country,setCountry] =useState("Worldwide");
const[covidDetails,setCovidDetails] = useState([]);

useEffect(() =>{

  const getCountriesData = async () => {
   await fetch("https://disease.sh/v3/covid-19/countries")
   .then((response) => response.json())
   .then((data) => {
     const countries = data.map( (country) => ( 
     {
       name : country.country,
       value : country.countryInfo.iso3
     }
     ));
     setCountries(countries);
   });
   };

  getCountriesData();

},[]);

const onCountryChange = async (event) => {

  const countryCode = event.target.value;
  await fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
  .then((response) => response.json())
  .then((data) => {
    
    setCovidDetails(data);
    setCountry(countryCode);
  });
}
console.log(covidDetails);

  return (
    <div className="app">

    <div className="app_header">
       <h1>COVID-19 TRACKER</h1>
       <FormControl className="app_dropdown">
       <Select variant="outlined" value={country} onChange={onCountryChange}>
         {/* <MenuItem value="Worldwide">123</MenuItem>
         <MenuItem value="Worldwide">123</MenuItem>
         <MenuItem value="Worldwide">123</MenuItem>
         <MenuItem value="Worldwide">12sdd</MenuItem>
         <MenuItem value="Worldwide">daswdssd</MenuItem>
         <MenuItem value="Worldwide">dasw</MenuItem> */}
             <MenuItem value="Worldwide">Worldwide</MenuItem>
         {
           countries.map(country =>{            return <MenuItem value={country.value}>{country.name}</MenuItem>
           })
         }
       </Select>
       </FormControl>
    </div>


      <div className="app_infoBox">
      <InfoBox 
       title="Coronavirus Cases"
       newCases={covidDetails.todayCases}
       totalCases={covidDetails.cases}
      />

      <InfoBox 
       title="Recovered Cases"
       newCases={covidDetails.todayRecovered}
       totalCases={covidDetails.recovered}
      />

      <InfoBox 
       title="Deaths"
       newCases={covidDetails.todayDeaths}
       totalCases={covidDetails.deaths}
      />
      </div>

      {/*Table  */}
    {/* Graph */}
                
    {/* Map */}


    </div>
  );
}

export default App;
