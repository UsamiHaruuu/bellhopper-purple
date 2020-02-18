import { useEffect, useState } from "react";
const { getCode, getName } = require('country-list');


const CountryCode = (country) => {
    return getCode(country)
};

export default CountryCode;
