
import fetchWithTimeout from './fetchWithTimeout';

const VisaRequirements = async (country) => {
  try {
    const url = 'countrytravelinfo.json';
    const response = await fetchWithTimeout(url);
    const ret = await response.json();
    return ret.filter((data) => data.geopoliticalarea === country)[0].entry_exit_requirements;
  } catch {
    return 'No information found.';
  }
};

export default VisaRequirements;
