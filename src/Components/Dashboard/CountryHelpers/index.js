import React from 'react';
// import moment from 'moment';
import ExchangeRate from './ExchangeRate';
// import TravelAdvisory from './TravelAdvisory';
import PlugType from './PlugType';
import Vaccines from './Vaccines';
import Weather from './Weather';
// import TravelAdvisory from './TravelAdvisory';

const cc = require('currency-codes');

const getCountryData = async (country, city, setCountryData) => {
  const [
    countryCurrency,
    countryPlugData,
    vaccinationAdvice,
    // travelAdvice,
  ] = await Promise.all([
    ExchangeRate(country),
    PlugType(country),
    Vaccines(country),
    // TravelAdvisory(country),
  ]);
  const countryCurrencyName = cc.country(country);
  const weatherAdvice = await Weather(country, city);
  setCountryData([
    weatherAdvice,
    {
      title: 'Travel Warnings',
      contents: (
        <div>
          <p>
            Exercise increased caution in Costa Rica due to crime. (Jan 7, 2020)
          </p>
          <br />
          <p>
            Outbreak alert: There is a dengue outbreak in Costa Rica. Dengue is
            spread by mosquitoes. Travelers going to Costa Rica should take
            steps to avoid mosquito bites. (Aug 27, 2019)
          </p>
        </div>
      ),
    },
    {
      title: 'Visa Requirements',
      contents: (
        <p>
          Not required for stays less than 90 days, but return ticket required.
        </p>
      ),
    },
    {
      title: 'Vaccinations',
      contents: (
        <div>
          {vaccinationAdvice}
        </div>
      ),
    },
    {
      title: 'Plug Type',
      contents: (
        countryPlugData !== null
          ? (
            <div>
              <p>
                  Avaliable types:
                {' '}
                {countryPlugData.type.join(', ')}
              </p>
              <p>
                  Avaliable volts:
                {' '}
                {countryPlugData.volt.join(', ')}
              </p>
            </div>
          ) : (
            <p>
                No information found.
            </p>
          )
      ),
    },
    {
      title: 'Exchange Rate',
      contents: countryCurrencyName.length !== 0 ? (
        <div>
          <p>
            {country}
            {' '}
            uses
            {' '}
            {countryCurrencyName[0].code}
          </p>
          <p>
            {' '}
            1 USD =
            {' '}
            {countryCurrency[0].toFixed(2)}
            {' '}
            {countryCurrencyName[0].code}
          </p>
        </div>
      )
        : (
          <p>
            No information found.
          </p>
        ),
    },
  ]);
};

export default getCountryData;
