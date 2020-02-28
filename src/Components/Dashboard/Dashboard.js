import React, { useState, useEffect } from 'react';
import { Button, Container } from 'rbx';
import InfoBox from './InfoBox';
import Header from './Header';
import getCountryData from './CountryHelpers';

const Dashboard = ({
  city, country, startDate,
}) => {
  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    const getDataAsync = async () => getCountryData(
      country, city, setCountryData, startDate,
    );
    getDataAsync();
  }, [city, country, startDate]);

  const InfoBoxes = countryData.length === 0
    ? <div className="loading-text">Loading...</div>
    : countryData.map((data) => (
      <InfoBox
        key={data.title}
        title={data.title}
        contents={data.contents}
      />
    ));

  return (
    <div>
      <Header country={country} city={city} />
      {InfoBoxes}
      <Container style={{ textAlign: 'center' }}>
        <Button as="a" color="link" size="large" href="/#/search/">
          Return To Search
        </Button>
      </Container>
    </div>
  );
};

export default Dashboard;
