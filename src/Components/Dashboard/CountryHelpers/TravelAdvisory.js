import { useEffect, useState } from "react";
import CountryCode from "./CountryCode";


const { getCode, getName } = require("country-list");

const TravelAdvisory = country => {
  const [countryInfo, setCountryInfo] = useState({});
  const country_ID = CountryCode(country);
  const helperURL = "https://www.reisewarnung.net/api?country="
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const apiURL = helperURL + country_ID;
  const return_string = ""
  const [advice ,setAdvice]=useState("");
  useEffect(() => {
    if (country_ID) {
      fetch(proxyurl+apiURL)
        .then(res => res.json())
        .then(response => console.log(response.data.lang.en.advice));
    }
    else{
        console.log('enter a country')
    }
  });
};

export default TravelAdvisory;
