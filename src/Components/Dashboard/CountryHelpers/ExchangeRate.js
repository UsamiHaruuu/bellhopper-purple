const cc = require('currency-codes');

const ExchangeRate = async (country) => {
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const countryCurrencyName = cc.country(country)[0].code;
  const apiURL = `http://api.currencylayer.com/live?access_key=dc96088f8fb3d56119137a8b10268a62&currencies=${
    countryCurrencyName
  }&format=1`;
  if (countryCurrencyName) {
    const res = await fetch(proxyurl + apiURL);
    const response = await res.json();
    return Object.values(response.quotes);
  }
  return undefined;
};

export default ExchangeRate;
