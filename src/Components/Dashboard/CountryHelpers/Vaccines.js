import React, { useState } from 'react';
import { Message, Button, Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { getCountryCode } from './CountryDataHelpers';
import fetchWithTimeout from './fetchWithTimeout';

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

const Vaccines = async (country) => {
  try {
    const code = getCountryCode(country);
    const url = `https://api.tugo.com/v1/travelsafe/countries/${code}`;
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-API-Key': '7bq7gsk46t2dw37j4dcaaccu',
      },
    });
    const ret = await response.json();
    const vaccinesArray = ret.health.diseasesAndVaccinesInfo.Vaccines;
    return vaccinesArray.slice(2, vaccinesArray.length)
      .map((item) => (
        <CollapsableMessage
          key={item.category}
          header={item.category}
          body={item.description}
        />
      ));
  } catch {
    return 'No information found.';
  }
};

export default Vaccines;
