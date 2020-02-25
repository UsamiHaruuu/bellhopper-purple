import countryData from './CountryData';

const getCountryCode = (countryName) => (
  countryData.countryCodes.filter((country) => country.country === countryName)[0].code
);

const getCityLat = (cityName, countryName) => (
  countryData.cityData.filter((row) => row.city === cityName && row.country === countryName)[0].lat
);

const getCityLng = (cityName, countryName) => (
  countryData.cityData.filter((row) => row.city === cityName && row.country === countryName)[0].lng
);

export {
  getCountryCode,
  getCityLat,
  getCityLng,
};
