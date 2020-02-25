
import { getCountryCode } from './CountryDataHelpers';
import fetchWithTimeout from './fetchWithTimeout';

const VisaRequirements = async (country) => {
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
    });
    const ret = await response.json();
    const visaReq = ret.entryExitRequirement.requirementInfo
      .filter((item) => item.category === 'Visas');
    return visaReq[0].description;
  } catch {
    return 'No information found.';
  }
};

export default VisaRequirements;
