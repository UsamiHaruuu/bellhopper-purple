import React, { useState } from 'react';
import { Message, Button, Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown, faCaretUp, faPlusSquare, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { addToList } from '../List/helpers';

const InfoBox = ({
  title, contents, uuid, tripId, trip, todo,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [added, setAdded] = useState(false);

  const addClick = () => {
    addToList(uuid, tripId, trip, todo);
    setAdded(true);
  };

  return (
    <Message className="info-box">
      <Message.Header>
        {title}
        <div>
          <Button
            onClick={() => addClick()}
            color={!added ? 'light' : 'success'}
          >
            <Icon>
              <FontAwesomeIcon icon={!added ? faPlusSquare : faCheck} />
            </Icon>
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon>
              <FontAwesomeIcon icon={collapsed ? faCaretDown : faCaretUp} />
            </Icon>
          </Button>
        </div>
      </Message.Header>
      {!collapsed && (
      <Message.Body>
        {contents}
      </Message.Body>
      )}
    </Message>
  );
};

export default InfoBox;
