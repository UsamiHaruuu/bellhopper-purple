import React, { useState, useEffect } from 'react';
import {
  Button, Content, Notification, Block, Title, Column, Delete, Field, Control, Input, Icon,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../Firebase/helpers';

const List = ({uuid}) => {
  const [list, setList] = useState([]);
  const [unit, setUnit] = useState('');
  const [tripId, setTripId] = useState(null);
  const [trip, setTrip] = useState({});

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
        }
      }
    };
    db.on('value', handleData, (error) => alert(error));
    return () => {
      db.off('value', handleData);
    };
  }, [tripId]);

  const handleSubmit = () => {
    const item = {
      checked: false,
      description: '',
    };
    item.description = unit;
    const newList = list.slice(0);
    newList.push(item);
    setList(newList);
    setUnit('');
  };

  const completeTask = (item) => {
    const newList = list.slice(0);
    const helperArray = newList.map((thing) => thing.description);
    const itemIndex = helperArray.indexOf(item.description);
    newList[itemIndex].complete = !newList[itemIndex].complete;
    setList(newList);
  };

  const removeItem = (element) => {
    const newList = list.slice(0);
    const helperArray = newList.map((thing) => thing.description);
    const itemIndex = helperArray.indexOf(element.description);
    newList.splice(itemIndex, 1);
    setList(newList);
  };

  return (
    <Content style={{ textAlign: 'center' }}>
      <Block />
      <Block />
      <Title size={1} as="b">BellHopper</Title>
      <Title size={5}>Here is your todo List for Costa Rica</Title>
      <Column size="three-fifths" offset="one-fifth">
        {list.map((element) => (
          <Notification key={element.description} align="left" color={element.complete ? 'info' : 'dark'}>
            <Column.Group>
              <Column>
                <Button size="large" align="left" onClick={() => completeTask(element)}>
                  {element.complete ? (
                    <Icon>
                      <FontAwesomeIcon icon={faCheckSquare} size="2x" />
                    </Icon>
                  )
                    : (
                      <Icon backgroundColor="white" size="large" />)}
                </Button>
              </Column>
              <Column align="center">
                <Content>
                  <Title subtitle size={4}>
                    {element.description}
                  </Title>
                </Content>
              </Column>
              <Column align="right">
                <Delete size="large" onClick={() => removeItem(element)} />
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
