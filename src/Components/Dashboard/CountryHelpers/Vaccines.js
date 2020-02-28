import fetchWithTimeout from './fetchWithTimeout';

const Vaccines = async (country) => {
  try {
    const url = 'countrytravelinfo.json';
    const response = await fetchWithTimeout(url);
    const ret = await response.json();
    return ret.filter((data) => data.geopoliticalarea === country)[0].health;
  } catch {
    return 'No information found.';
  }
};

export default Vaccines;
