import React from 'react';
import fetchWithTimeout from './fetchWithTimeout';
import { getCityLat, getCityLng } from './CountryDataHelpers';

const getForecasts = async (longitude, latitude, startDate, endDate) => {
  const numDays = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (86400 * 1000);
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const weatherUrl = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=0d7b6c6176f04e12a1523034202802&q=${latitude.toFixed(3)},${longitude.toFixed(3)}&format=json&num_of_days=${numDays}`;
  const weatherResponse = await fetchWithTimeout(proxyurl + weatherUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Transfer-Encoding': 'chunked',
      Connection: 'keep-alive',
      Vary: 'Accept-Encoding',
      'CDN-PullZone': '61832',
      'CDN-Uid': '8fa3a04a-75d9-4707-8056-b7b33c8ac7fe',
      'CDN-RequestCountryCode': 'FI',
      'CDN-EdgeStorageId': '601',
      'X-WWO-Qpd-Left': '488',
      'CDN-CachedAt': '2020-02-28 05:30:52',
      'CDN-RequestId': '744f78f6ea6a7638ab04e662745144fc',
      'CDN-Cache': 'HIT',
      'Cache-Control': 'public, max-age=180',
      'Content-Type': 'application/json',
      Date: 'Fri, 28 Feb 2020 04:31:24 GMT',
      Server: 'BunnyCDN-DE1-601',
    },
  });

  const weatherRes = await weatherResponse.json();
  const weatherObj = {};

  weatherRes.data.weather.forEach((weather) => {
    weatherObj[weather.date] = {
      maxtempF: weather.maxtempF,
      mintempF: weather.mintempF,
      img: weather.hourly[4].weatherIconUrl[0].value,
    };
  });
  return weatherObj;
};

const getHistoricalData = async (longitude, latitude, startDate, endDate) => {
  const lastYear = parseFloat(startDate.split('-')[0]) - 1;
  const endDateLastYear = parseFloat(endDate.split('-')[0]) - 1 === lastYear
    ? lastYear
    : lastYear + 1;
  const lastYearStartDate = [lastYear, startDate.split('-')[1], startDate.split('-')[2]].join('-');
  const lastYearEndDate = [endDateLastYear, endDate.split('-')[1], endDate.split('-')[2]].join('-');

  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const weatherUrl = `http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=0d7b6c6176f04e12a1523034202802&q=${latitude.toFixed(3)},${longitude.toFixed(3)}&format=json&date=${lastYearStartDate}&enddate=${lastYearEndDate}`;
  const weatherResponse = await fetchWithTimeout(proxyurl + weatherUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Transfer-Encoding': 'chunked',
      Connection: 'keep-alive',
      Vary: 'Accept-Encoding',
      'CDN-PullZone': '61832',
      'CDN-Uid': '8fa3a04a-75d9-4707-8056-b7b33c8ac7fe',
      'CDN-RequestCountryCode': 'FI',
      'CDN-EdgeStorageId': '601',
      'X-WWO-Qpd-Left': '488',
      'CDN-CachedAt': '2020-02-28 05:30:52',
      'CDN-RequestId': '744f78f6ea6a7638ab04e662745144fc',
      'CDN-Cache': 'HIT',
      'Cache-Control': 'public, max-age=180',
      'Content-Type': 'application/json',
      Date: 'Fri, 28 Feb 2020 04:31:24 GMT',
      Server: 'BunnyCDN-DE1-601',
    },
  });

  const weatherRes = await weatherResponse.json();
  const weatherObj = {};

  weatherRes.data.weather.forEach((weather) => {
    weatherObj[weather.date] = {
      maxtempF: weather.maxtempF,
      mintempF: weather.mintempF,
      img: weather.hourly[4].weatherIconUrl[0].value,
    };
  });
  return weatherObj;
};

const Weather = async (country, city, startDate, endDate) => {
  let latitude;
  let longitude;
  try {
    if (!city) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=pk.eyJ1IjoiY2xlbWVuc3RpZ2F0b3IiLCJhIjoiY2p6dm8xeWowMHM0djNnbG02ZWM5ZHo4dSJ9.GNbHIUUjyUdJfazjBuExmw&limit=1`;
      const response = await fetchWithTimeout(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const res = await response.json();
      [longitude, latitude] = res.features[0].center;
    } else {
      [longitude, latitude] = [getCityLng(city, country), getCityLat(city, country)];
    }
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    const retObj = {};
    let weather;
    if (new Date(startDate).getTime() < Date.now() + 86400000 * 7) {
      retObj.title = 'Weather';
      weather = await getForecasts(longitude, latitude, startDate, endDate);
    } else {
      retObj.title = 'Weather (from last year)';
      weather = await getHistoricalData(longitude, latitude, startDate, endDate);
    }

    const dayMap = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
    };

    retObj.contents = (
      <div className="weather-boxes">
        {Object.keys(weather).map((date) => (
          <div key={date} className="weather-box">
            <p>{dayMap[new Date(date).getDay()]}</p>
            <p>
              {new Date(`${date} `)
                .toString()
                .split(' ')
                .slice(1, 3)
                .join(' ')}
            </p>
            <img alt="" src={weather[date].img} />
            <p>
Hi:
              {' '}
              {weather[date].maxtempF}
              {' '}
&deg;F
            </p>
            <p>
Lo:
              {' '}
              {weather[date].mintempF}
              {' '}
&deg;F
            </p>
          </div>
        ))}
      </div>
    );
    return retObj;
  } catch {
    return {
      title: 'Weather',
      contents: 'No information found.',
    };
  }
};

export default Weather;
