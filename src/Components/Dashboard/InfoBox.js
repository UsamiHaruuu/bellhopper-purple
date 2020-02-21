import React, { useState } from 'react';
import { Message, Button, Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const InfoBox = ({ title, contents }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Message className="info-box">
      <Message.Header>
        {title}
        <Button onClick={() => setCollapsed(!collapsed)}>
          <Icon>
            <FontAwesomeIcon icon={!collapsed ? faCaretDown : faCaretUp} />
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
