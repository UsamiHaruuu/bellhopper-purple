import { useEffect, useState } from 'react';

const cc = require('currency-codes');

const ExchangeRate = (country) => {
  const [countryCurrency, setCountryCurrency] = useState([]);
  const countryCurrencyName = cc.country(country)[0].code;
  const apiURL = `http://api.currencylayer.com/live?access_key=dc96088f8fb3d56119137a8b10268a62&currencies=${
    countryCurrencyName
  }&format=1`;
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  useEffect(() => {
    if (countryCurrencyName) {
      fetch(proxyurl + apiURL)
        .then((res) => res.json())
        .then((response) => setCountryCurrency(Object.values(response.quotes)));
    } else {
      console.log('enter a country');
    }
  }, []);
  return countryCurrency;
};

export default ExchangeRate;
