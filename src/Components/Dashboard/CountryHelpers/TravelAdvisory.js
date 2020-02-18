import { useEffect, useState } from "react";
import CountryCode from "./CountryCode";
const { getCode, getName } = require("country-list");

const TravelAdvisory = country => {
  const [countryInfo, setCountryInfo] = useState({});
  const country_ID = CountryCode(country);
  const helperURL = "https://www.travel-advisory.info/api?countrycode=";
  const apiURL = helperURL + country_ID;
  const return_string = ""
  useEffect(() => {
    if (country_ID) {
      fetch(apiURL)
        .then(res => res.json())
        .then(response => console.log(response.data));
    }
    else{
        console.log('enter a country')
    }
  });
};

export default TravelAdvisory;
