const { getCode } = require('country-list');


const CountryCode = (country) => getCode(country);

export default CountryCode;
