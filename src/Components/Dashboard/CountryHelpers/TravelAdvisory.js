import fetchWithTimeout from './fetchWithTimeout';
import { getCountryCode } from './CountryDataHelpers';

const TravelAdvisory = async (country) => {
  try {
    const code = getCountryCode(country);
    const url = 'traveladvisory.json';
    const response = await fetchWithTimeout(url);
    const ret = await response.json();
    return ret.data[code].advisory.message;
  } catch {
    return 'No information found.';
  }
};

export default TravelAdvisory;
