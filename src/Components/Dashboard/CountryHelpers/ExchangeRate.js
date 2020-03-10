import fetchWithTimeout from './fetchWithTimeout';
import { getCountryCurrency } from './CountryDataHelpers';

const ExchangeRate = async (country) => {
  try {
    /*
      const proxyurl = 'https://cors-anywhere.herokuapp.com/';
      const countryCode = cc.country(country)[0].code;
      // this is the real key but we are saving our api requests for demo
      // const apiKey = 'e5c05625064153f4e2cf1ec9df36fbb8';
      // fake key
      const apiKey = 'hi';
      const apiURL = `http://api.currencylayer.com/live?access_key=${apiKey}&currencies=${
        countryCode
      }&format=1`;

      const res = await fetch(proxyurl + apiURL);
      const response = await res.json();

      return {
        rate: Object.values(response.quotes)[0],
        countryCode,
      };
      */

    const countryCurrency = getCountryCurrency(country);
    const url = 'exchangerates.json';
    const response = await fetchWithTimeout(url);
    const ret = await response.json();
    return {
      rate: ret.rates[countryCurrency.currencyCode],
      ...countryCurrency,
    };
  } catch {
    return {};
  }
};

export default ExchangeRate;
