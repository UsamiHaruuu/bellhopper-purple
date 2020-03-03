import React, { useState, useEffect } from 'react';
import {
  Button, Content, Notification, Block, Title, Column, Delete, Field, Control, Input, Icon,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../Firebase/helpers';
import { addToList, removeTask, completeTask } from './helpers';

const List = ({ uuid }) => {
  const [list, setList] = useState([]);
  const [unit, setUnit] = useState('');
  const [trip, setTrip] = useState({});
  const [tripId, setTripId] = useState(null);

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  useEffect(() => {
    const handleData = (snap) => {
      if (snap.val()) {
        const data = snap.val();
        if (data[uuid] !== undefined) {
          setTripId(data[uuid].currentTrip.tripID);
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
    if (!unit) {
      return;
    }
    const item = {
      checked: false,
      description: '',
    };
    item.description = unit;
    const newList = list.slice(0);
    newList.push(item);
    setList(newList);
    setUnit('');
    addToList(uuid, tripId, trip, unit);
  };

  const complete = (element) => {
    setList(completeTask(uuid, tripId, trip, element));
  };

  const removeItem = (element) => {
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
        {list.map((element) => (
          <Notification key={element.description} align="left" color={element.complete ? 'info' : 'dark'}>
            <Column.Group breakpoint="mobile">
              <Column size={3}>
                <Button size="large" align="left" onClick={() => complete(element)}>
                  {element.complete ? (
                    <Icon>
                      <FontAwesomeIcon icon={faCheckSquare} size="2x" />
                    </Icon>
                  )
                    : (
                      <Icon backgroundColor="white" size="large" />)}
                </Button>
              </Column>
              <Column align="left" size={8}>
                  {element.description}
              </Column>
              <Column align="right" size={1}>
                <Delete size="medium" onClick={() => removeItem(element)} />
              </Column>
            </Column.Group>
          </Notification>
        ))}
        <Field align="centered" kind="addons">
          <Control expanded>
            <Input
              size="medium"
              placeholder="Add an Item"
              value={unit}
              onChange={handleUnitChange}
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
