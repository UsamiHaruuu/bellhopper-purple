const cc = require('currency-codes');

const ExchangeRate = async (country) => {
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const countryCode = cc.country(country)[0].code;

  if (countryCode) {
    try {
      const apiKey = 'e5c05625064153f4e2cf1ec9df36fbb8';
      const apiURL = `http://api.currencylayer.com/live?access_key=${apiKey}&currencies=${
        countryCode
      }&format=1`;
      const res = await fetch(proxyurl + apiURL);
      const response = await res.json();

      return {
        rate: Object.values(response.quotes)[0],
        countryCode,
      };
    } catch {
      return {};
    }
  }
  return {};
};

export default ExchangeRate;
