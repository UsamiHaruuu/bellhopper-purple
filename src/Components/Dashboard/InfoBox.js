import React, { useState } from 'react';
import { Card, Button, Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown, faCaretUp, faPlusSquare, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { addToList } from '../List/helpers';

const InfoBox = ({
  title, contents, uuid, tripId, trip, todo, collapsable,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [added, setAdded] = useState(false);

  const addClick = () => {
    addToList(uuid, tripId, trip, todo);
    setAdded(true);
  };

  return (
    <Card className="info-box">
      <Card.Header>
        <Card.Header.Title>{title}</Card.Header.Title>
        <Card.Header.Icon>
          <Button
            onClick={() => addClick()}
            color={!added ? 'light' : 'success'}
          >
            <Icon>
              <FontAwesomeIcon icon={!added ? faPlusSquare : faCheck} />
            </Icon>
          </Button>
          {collapsable && (
          <Button
            style={{ marginLeft: '10px' }}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon>
              <FontAwesomeIcon icon={collapsed ? faCaretDown : faCaretUp} />
            </Icon>
          </Button>
          )}
        </Card.Header.Icon>
      </Card.Header>
      {!collapsed && (
      <Card.Content>
        {contents}
      </Card.Content>
      )}
    </Card>
  );
};

export default InfoBox;
