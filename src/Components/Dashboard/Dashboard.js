import React from 'react';
import { Button, Container } from 'rbx';
import InfoBox from './InfoBox';
import Header from './Header';
import getCountryData from './CountryHelpers';

const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('country');
const countryData = getCountryData(countryName);

const Dashboard = () => (
  <div>
    <Header country={countryName} />
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

export default Dashboard;
