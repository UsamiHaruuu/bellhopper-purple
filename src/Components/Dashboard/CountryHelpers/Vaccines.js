import fetchWithTimeout from './fetchWithTimeout';
import { getCountryCode } from './CountryDataHelpers';

const Vaccines = async (country) => {
  try {
    const code = getCountryCode(country);
    const url = 'countrytravelinfo.json';
    const response = await fetchWithTimeout(url);
    const ret = await response.json();
    return ret.filter((data) => data.tag === code)[0].health;
  } catch {
    return 'No information found.';
  }
};

export default Vaccines;
