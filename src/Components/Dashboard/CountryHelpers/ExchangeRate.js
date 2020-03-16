import fetchWithTimeout from './fetchWithTimeout';
import { getCountryCurrency } from './CountryDataHelpers';

const ExchangeRate = async (country) => {
  try {
    const countryCurrency = getCountryCurrency(country);
    const url = 'exchangerates.json';
    const response = await fetchWithTimeout(url);
    const ret = await response.json();
    return {
      rate: ret.rates[countryCurrency.currencyCode],
      ...countryCurrency,
    };
  } catch {
    return {};
  }
};

export default ExchangeRate;
