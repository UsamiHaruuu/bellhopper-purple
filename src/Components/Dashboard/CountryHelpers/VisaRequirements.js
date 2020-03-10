
import fetchWithTimeout from './fetchWithTimeout';
import { getCountryCode } from './CountryDataHelpers';

const VisaRequirements = async (country) => {
  try {
    const code = getCountryCode(country);
    const url = 'countrytravelinfo.json';
    const response = await fetchWithTimeout(url);
    const ret = await response.json();
    return ret.filter((data) => data.tag === code)[0].entry_exit_requirements;
  } catch {
    return 'No information found.';
  }
};

export default VisaRequirements;
