import React from 'react';
import {
  useLocation,
} from 'react-router-dom';

const Brand = () => {
  const location = useLocation();
  return location.pathname === '/'
    ? (
      <img
        className="home-header header-img"
        alt="BellHopper Logo"
        src="/images/header-nobg.svg"
      />
    )
    : (
      <img className="header-img" alt="BellHopper Logo" src="/images/Header Title.svg" />
    );
};

export default Brand;
