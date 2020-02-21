import React, { useState, useEffect } from 'react';
import { Button, Container } from 'rbx';
import InfoBox from './InfoBox';
import Header from './Header';
import getCountryData from './CountryHelpers';

const Dashboard = ({ country }) => {
  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    const getDataAsync = async () => getCountryData(country, setCountryData);
    getDataAsync();
  }, [country]);

  return (
    <div>
      <Header country={country} />
      {countryData.map((data) => (
        <InfoBox key={data.title} title={data.title} contents={data.contents} />
      ))}
      <Container style={{ textAlign: 'center' }}>
        <Button as="a" color="link" size="large" href="/#/search/">
          Return To Search
        </Button>
      </Container>
    </div>
  );
};

export default Dashboard;
