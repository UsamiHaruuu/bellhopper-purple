/* eslint-disable react/no-danger */
import React from 'react';
import ExchangeRate from './ExchangeRate';
import PlugType from './PlugType';
import Vaccines from './Vaccines';
import Weather from './Weather';
import TravelAdvisory from './TravelAdvisory';
import VisaRequirements from './VisaRequirements';

const getCountryData = async (country, city, startDate, endDate, setCountryData) => {
  const [
    countryCurrency,
    countryPlugData,
    vaccinationAdvice,
    travelAdvice,
    weatherAdvice,
    visaAdvice,
  ] = await Promise.all([
    ExchangeRate(country),
    PlugType(country),
    Vaccines(country),
    TravelAdvisory(country),
    Weather(country, city, startDate, endDate),
    VisaRequirements(country),
  ]);

  setCountryData([
    {
      title: weatherAdvice.title,
      contents: weatherAdvice.contents,
      todo: 'Pack appropriately for the weather',
    },
    {
      title: 'Travel Warnings',
      contents: (
        <div dangerouslySetInnerHTML={{ __html: travelAdvice }} />
      ),
      todo: 'Check travel warnings',
    },
    {
      title: 'Visa Requirements',
      contents: (
        <div dangerouslySetInnerHTML={{ __html: visaAdvice }} />
      ),
      todo: 'Handle visa requirements',
    },
    {
      title: 'Health',
      contents: (
        <div dangerouslySetInnerHTML={{ __html: vaccinationAdvice }} />
      ),
      todo: 'Get appropriate vaccinations',
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
      todo: 'Pack the right plug type',
    },
    {
      title: 'Exchange Rate',
      contents: Object.values(countryCurrency).length !== 0
        ? (
          <div>
            <p>
              {country}
              {' '}
            uses
              {' '}
              {`${countryCurrency.currencyName} (${countryCurrency.currencyCode})`}
            </p>
            <p>
              {
              countryCurrency.rate
                ? (
                  `1 USD = ${countryCurrency.rate.toFixed(2)} ${countryCurrency.currencyCode}`
                )
                : `No conversion found for ${countryCurrency.currencyName}`
            }
            </p>
          </div>
        )
        : (
          <p>
          No information found.
          </p>
        ),
      todo: `Exchange money into ${countryCurrency.countryCode}`,
    },
  ]);
};

export default getCountryData;
