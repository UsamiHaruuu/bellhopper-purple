import React, { useState, useEffect } from 'react';
import {
  Panel, Button, Content, Notification, Block, Title, Column, Delete, Field, Control, Input, Icon,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const TestList = () => (
  <Panel>
    <Panel.Heading>
      <Notification color="dark">
        ToDo
      </Notification>
    </Panel.Heading>
    <Panel.Block as="a">
      <Panel.Icon>
        <FontAwesomeIcon icon={faCheckSquare} size="lg" />
      </Panel.Icon>
      This is the first bit of example text
    </Panel.Block>
    <Panel.Block as="a">
      <Panel.Icon>
        <FontAwesomeIcon icon={faCheckSquare} size="lg" />
      </Panel.Icon>
      This is the second bit of example text
    </Panel.Block>
    <Panel.Block as="a">
      <Panel.Icon>
        <FontAwesomeIcon icon={faCheckSquare} size="lg" />
      </Panel.Icon>
      This is the third bit of example text
    </Panel.Block>

  </Panel>
);

// {list.map((element) => (
//     <Notification key={element.description} align="left" color={element.complete ? 'info' : 'dark'}>
//       <Column.Group breakpoint="mobile">
//         <Column size={3}>
//           <Button size="medium" onClick={() => complete(element)}>
//             {element.complete ? (
//               <Icon>
//                 <FontAwesomeIcon icon={faCheckSquare} size="2x" />
//               </Icon>
//             )
//               : (
//                 <Icon backgroundColor="white" size="large" />)}
//           </Button>
//         </Column>
//         <Column align="left" size={8}>
//           {element.description}
//         </Column>
//         <Column align="right" size={1}>
//           <Delete size="medium" onClick={() => removeItem(element)} />
//         </Column>
//       </Column.Group>
//     </Notification>
//   ))}

export default TestList;
