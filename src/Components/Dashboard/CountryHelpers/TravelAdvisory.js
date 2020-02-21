import { getCountryCode } from './CountryCodes';

const TravelAdvisory = async (country) => {
  const countryID = getCountryCode(country);
  const helperURL = 'https://www.reisewarnung.net/api?country=';
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const apiURL = helperURL + countryID;
  if (countryID) {
    const res = await fetch(proxyurl + apiURL);
    const response = await res.json();
    return response.data.lang.en.advice;
  }
  return undefined;
};

export default TravelAdvisory;
