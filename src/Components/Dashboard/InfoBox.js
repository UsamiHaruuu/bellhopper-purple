import React from 'react';
import { Message } from 'rbx';

const InfoBox = ({ title, contents }) => (
  <Message className="info-box">
    <Message.Header>
      {title}
    </Message.Header>
    <Message.Body>
      {contents}
    </Message.Body>
  </Message>
);

export default InfoBox;
