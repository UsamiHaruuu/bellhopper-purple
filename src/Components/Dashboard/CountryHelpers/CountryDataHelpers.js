import countryData from './CountryData';

const getCountryCode = (countryName) => (
  countryData.countries.filter((country) => country.country === countryName)[0].code
);

const getCityLat = (cityName, countryName) => (
  countryData.cities.filter((row) => row.city === cityName && row.country === countryName)[0].lat
);

const getCityLng = (cityName, countryName) => (
  countryData.cities.filter((row) => row.city === cityName && row.country === countryName)[0].lng
);

const getCountryCurrency = (countryName) => {
  const countryObj = countryData.countries.filter((country) => country.country === countryName)[0];
  return {
    currencyName: countryObj.currencyName,
    currencyCode: countryObj.currencyCode,
  };
};

export {
  getCountryCode,
  getCityLat,
  getCityLng,
  getCountryCurrency,
};
