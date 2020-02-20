import { useEffect, useState } from "react";
const cc = require("currency-codes");

const ExchangeRate = country => {
  const [country_currency, setCountry_currency] = useState([]);
  // const country_ID = CountryCode(country);

  // const apiURL = helperURL + country_ID;
  // const return_string = "";
  // const [advice, setAdvice] = useState("");
  const country_currency_name = cc.country(country)[0]["code"];
  const apiURL =
    "http://api.currencylayer.com/live?access_key=dc96088f8fb3d56119137a8b10268a62&currencies=" +
    country_currency_name +
    "&format=1";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  useEffect(() => {
    if (country_currency_name) {
      fetch(proxyurl + apiURL)
        .then(res => res.json())
        .then(response =>
          setCountry_currency(Object.values(response["quotes"]))
        );
    } else {
      console.log("enter a country");
    }
  });
  return country_currency;
};

export default ExchangeRate;
