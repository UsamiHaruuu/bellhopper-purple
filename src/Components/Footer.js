import React from 'react';
import {
  Navbar, Icon, Level,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faColumns, faList } from '@fortawesome/free-solid-svg-icons';

const Footer = () => (
  <Navbar fixed="bottom" color="warning" transparent>
    <Level>
      <Level.Item textAlign="centered">
        <Navbar.Item href="#">
          <Icon>
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Icon>
        </Navbar.Item>
        <Navbar.Item href="#">
          <Icon>
            <FontAwesomeIcon icon={faColumns} size="lg" />
          </Icon>
        </Navbar.Item>
        <Navbar.Item href="/#/list">
          <Icon>
            <FontAwesomeIcon icon={faList} size="lg" />
          </Icon>
        </Navbar.Item>
      </Level.Item>
    </Level>
  </Navbar>
);

export default Footer;
