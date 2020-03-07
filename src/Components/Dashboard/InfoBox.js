import React, { useState } from 'react';
import { Message, Button, Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { addToList } from '../List/helpers';

const InfoBox = ({
  title, contents, uuid, tripId, trip, todo,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Message className="info-box">
      <Message.Header>
        {title}
        <Button onClick={() => addToList(uuid, tripId, trip, todo)}>
          Add To Todo List
        </Button>
        <Button onClick={() => setCollapsed(!collapsed)}>
          <Icon>
            <FontAwesomeIcon icon={collapsed ? faCaretDown : faCaretUp} />
          </Icon>
        </Button>
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
