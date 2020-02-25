import React from 'react';
import { Content } from 'rbx';

const Header = ({ city, country }) => {
  const locationString = city
    ? `${city}, ${country}`
    : country;
  return (
    <Content>
      <p className="dashboard-title">BellHopper</p>
      <p className="dashboard-header-content">
      Here&apos;s what you need to know for your upcoming trip to
        {' '}
        <b>{locationString}</b>
      </p>
    </Content>
  );
};

export default Header;
