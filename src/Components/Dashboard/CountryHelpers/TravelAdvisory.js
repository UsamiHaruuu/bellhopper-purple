import React, { useState } from 'react';
import { Message, Button, Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import fetchWithTimeout from './fetchWithTimeout';
import { getCountryCode } from './CountryDataHelpers';

const CollapsableMessage = ({ header, body }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Message color="light">
      <Message.Header>
        {header}
        <Button onClick={() => setVisible(!visible)}>
          <Icon>
            <FontAwesomeIcon icon={!visible ? faPlus : faMinus} />
          </Icon>
        </Button>
      </Message.Header>
      {visible && (
        <Message.Body>
          {body}
        </Message.Body>
      )}
    </Message>
  );
};
const TravelAdvisory = async (country) => {
  try {
    const code = getCountryCode(country);
    const url = `https://api.tugo.com/v1/travelsafe/countries/${code}`;
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-API-Key': '947pqkb4x7e4g5xq9mxbhp8w',
      },
    });
    const ret = await response.json();
    // console.log(ret);
    const advice = ret.advisories.description;
    return advice;
  } catch {
    return 'No information found.';
  }
};

export default TravelAdvisory;
