import React, { } from 'react';
import {
  useLocation,
} from 'react-router-dom';
import {
  Navbar, Icon,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faList } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ tripId }) => {
  const location = useLocation();
  const page = location.pathname === '/' ? 'search' : location.pathname.substring(1);

  return (tripId
    ? (
      <Navbar fixed="bottom" color="info" className="navbar">
        <div>
          <Navbar.Item href="/#" className={page === 'search' ? 'active' : ''}>
            <Icon>
              <FontAwesomeIcon icon={faHome} size="lg" />
            </Icon>
          </Navbar.Item>
          <Navbar.Item href={`/#/dashboard?tripId=${tripId}`} className={page === 'dashboard' ? 'active' : ''}>
            <Icon>
              <FontAwesomeIcon icon={faInfoCircle} size="lg" />
            </Icon>
          </Navbar.Item>
          <Navbar.Item href={`/#/list?tripId=${tripId}`} className={page === 'list' ? 'active' : ''}>
            <Icon>
              <FontAwesomeIcon icon={faList} size="lg" />
            </Icon>
          </Navbar.Item>
        </div>
      </Navbar>
    )
    : <div />);
};

export default Footer;
