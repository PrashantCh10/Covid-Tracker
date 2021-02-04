import {FormControl,MenuItem,Select, Card,CardContent} from "@material-ui/core";
import { useEffect, useState } from "react";
import './App.css';
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import Table from "./Components/Table"
import { sortData } from "./util";
import LineChart from "./Components/LineChart";

function App() {

const[countries,setCountries] = useState([]);
const[country,setCountry] =useState("Worldwide");
const[covidDetails,setCovidDetails] = useState([]);
const[tableData,setTableData] = useState([]);

useEffect(() =>{
  fetch("https://disease.sh/v3/covid-19/all")
  .then((response) => response.json())
  .then((data) => {
    setCovidDetails(data);
  })
},[]);

useEffect(() =>{

  const getCountriesData = async () => {
   await fetch("https://disease.sh/v3/covid-19/countries")
   .then((response) => response.json())
   .then((data) => {
     const countries = data.map( (country) => ( 
     {
       name : country.country,
       value : country.countryInfo.iso3,

     }
     ));
     const sortedData = sortData(data);
     setTableData(sortedData);
     setCountries(countries);
   });
   };

  getCountriesData();

},[]);

console.log(tableData);

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
      <div className="app_left">
         <div className="app_header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
             <MenuItem value="Worldwide">Worldwide</MenuItem>
             {
                countries.map(country =>{            return <MenuItem value={country.value}>{country.name}</MenuItem>
                 })
             }
            </Select>
            </FormControl>
         </div>


         <div className="app_stats">
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
        <Map />
      </div>

      <Card className="app_right">
        <CardContent>
          <div className="app_info">
            <h3>Live Cases by Country</h3>
             <Table 
             countriesData={tableData}
             />
            <h3>Worldwide new cases</h3>
            <LineChart />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
