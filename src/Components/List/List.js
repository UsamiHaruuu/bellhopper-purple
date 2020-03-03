import React, { useState, useEffect } from 'react';
import {
  Panel, Button, Content, Notification, Block, Title, Column, Delete, Field, Control, Input,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { db } from '../../Firebase/helpers';
import { addToList, removeTask, completeTask } from './helpers';

const List = ({ uuid, tripId }) => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');
  const [trip, setTrip] = useState({});

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    const handleData = (snap) => {
      if (snap.val()) {
        const data = snap.val();
        if (data[uuid] !== undefined) {
          setTrip(data[uuid].trips[data[uuid].currentTrip.tripID]);
          if (data[uuid].trips[data[uuid].currentTrip.tripID].list) {
            setList(data[uuid].trips[data[uuid].currentTrip.tripID].list);
          }
        }
      }
    };
    db.on('value', handleData, (error) => alert(error));
    return () => {
      db.off('value', handleData);
    };
  }, [uuid]);


  const handleSubmit = () => {
    if (!input) {
      return;
    }
    const item = {
      complete: false,
      description: '',
    };
    item.description = input;
    const newList = list.slice(0);
    newList.push(item);
    setList(newList);
    setInput('');
    addToList(uuid, tripId, trip, input);
  };

  const complete = (element) => {
    setList(completeTask(uuid, tripId, trip, element));
  };

  const removeItem = (element, event) => {
    event.stopPropagation();
    setList(removeTask(uuid, tripId, trip, element));
  };
  return (
    <Content style={{ textAlign: 'center' }}>
      <Block />
      <Block />
      <Title size={1} as="b">BellHopper</Title>
      <Title size={5}>
        Here is your To-Do list for your upcoming trip to
        {' '}
        {trip.city ? trip.city : trip.country}
      </Title>
      <Column size="three-fifths" offset="one-fifth">
        <Panel>
          <Panel.Heading>
            <Notification color="dark">
          ToDo
            </Notification>
          </Panel.Heading>
          {list.map((element) => (
            <Panel.Block active={!!element.complete} onClick={() => complete(element)} key={element.description}>
              <Panel.Icon>
                <FontAwesomeIcon icon={element.complete ? faCheckSquare : faSquare} size="lg" />
              </Panel.Icon>
              {element.description}
              <Column vcentered={1} align="right" offset={11}>
                <Delete size="medium" onClick={(event) => removeItem(element, event)} />
              </Column>
            </Panel.Block>
          ))}
        </Panel>
        <Field align="centered" kind="addons">
          <Control expanded>
            <Input
              size="medium"
              placeholder="Add an Item"
              value={input}
              onChange={handleInputChange}
              maxLength="50"
            />
          </Control>
          <Control>
            <Button size="medium" color="dark" onClick={handleSubmit}>
              Add
            </Button>
          </Control>
        </Field>
      </Column>
    </Content>
  );
};

export default List;
