import fetchWithTimeout from './fetchWithTimeout';
import { getCountryCode } from './CountryDataHelpers';

const TravelAdvisory = async (country) => {
  try {
    const code = getCountryCode(country);
    const url = `https://api.tugo.com/v1/travelsafe/countries/${code}`;
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-API-Key': '947pqkb4x7e4g5xq9mxbhp8w',
      },
    });
    const ret = await response.json();
    // console.log(ret);
    const advice = ret.advisories.description;
    return advice;
  } catch {
    return 'No information found.';
  }
};

export default TravelAdvisory;
