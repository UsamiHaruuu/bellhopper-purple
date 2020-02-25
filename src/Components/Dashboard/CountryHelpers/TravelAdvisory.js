import { getCountryCode } from './CountryDataHelpers';
import fetchWithTimeout from './fetchWithTimeout';

const TravelAdvisory = async (country) => {
  const countryID = getCountryCode(country);
  const helperURL = 'https://www.reisewarnung.net/api?country=';
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const apiURL = helperURL + countryID;
  try {
    const res = await fetchWithTimeout(proxyurl + apiURL);
    const response = await res.json();
    return response.data.lang.en.advice;
  } catch {
    return 'No information found.';
  }
};

export default TravelAdvisory;
