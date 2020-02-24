import { getCountryCode } from './CountryCodes';
import fetchWithTimeout from './fetchWithTimeout';

const Vaccines = async (country) => {
  try {
    const code = getCountryCode(country);
    const url = `https://api.tugo.com/v1/travelsafe/countries/${code}`;
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-API-Key': '7bq7gsk46t2dw37j4dcaaccu',
      },
    }, 1000);
    const res = await response.json();
    const vaccinesArray = res.health.diseasesAndVaccinesInfo.Vaccines;
    return vaccinesArray.slice(2, vaccinesArray.length).map((v) => v.category).join(', ');
  } catch {
    return 'No information found.';
  }
};

export default Vaccines;
