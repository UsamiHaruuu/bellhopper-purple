import React from 'react';
import { Column } from 'rbx';
import fetchWithTimeout from './fetchWithTimeout';

const Weather = async (country) => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=pk.eyJ1IjoiY2xlbWVuc3RpZ2F0b3IiLCJhIjoiY2p6dm8xeWowMHM0djNnbG02ZWM5ZHo4dSJ9.GNbHIUUjyUdJfazjBuExmw&limit=1`;
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-API-Key': '7bq7gsk46t2dw37j4dcaaccu',
      },
    }, 1500);
    const res = await response.json();
    const latitude = res.features[0].center[1];
    const longitude = res.features[0].center[0];
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const weatherUrl = `https://api.darksky.net/forecast/17cfa033a34b546f631477e5e90a1abe/${latitude},${longitude}`;
    const weatherResponse = await fetchWithTimeout(proxyurl + weatherUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-API-Key': '7bq7gsk46t2dw37j4dcaaccu',
      },
    }, 1500);
    const weatherRes = await weatherResponse.json();
    const weatherObj = {
      high: Math.round(weatherRes.daily.data[0].temperatureHigh),
      low: Math.round(weatherRes.daily.data[0].temperatureLow),
      summary: weatherRes.daily.summary,
      currently: Math.round(weatherRes.currently.temperature),
    };
    const returnObject = {
      title: 'Weather',
      contents: (
        <div>
          <Column.Group breakpoint="mobile">
            <Column size={8}>
              <p>
                Daytime Hi:
                {' '}
                {weatherObj.high}
                {' '}
                &deg;F
              </p>
              <p>
                Daytime Low:
                {' '}
                {weatherObj.low}
                {' '}
                &deg;F
              </p>
            </Column>
            <Column size={4}>
              <p className="degrees-text">
                {' '}
                {weatherObj.currently}
                {' '}
                &deg;F
              </p>
              <p>{weatherObj.summary}</p>
            </Column>
          </Column.Group>
        </div>
      ),
    };
    return (returnObject);
  } catch {
    return 'No information found.';
  }
};

export default Weather;
