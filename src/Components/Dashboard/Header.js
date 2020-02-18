import React from 'react';
import { Content } from 'rbx';

const Header = ({ country }) => (
  <Content>
    <p className="dashboard-title">BellHopper</p>
    <p className="dashboard-header-content">
      Here&apos;s what you need to know for your upcoming trip to
      {' '}
      <b>{country}</b>
    </p>
  </Content>
);

export default Header;
