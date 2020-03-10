import React, { useState, useEffect } from 'react';
import {
  Panel, Button, Content, Column, Delete, Field, Control, Input,
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
          setTrip(data[uuid].trips[tripId]);
          if (data[uuid].trips[tripId].list) {
            setList(data[uuid].trips[tripId].list);
          }
        }
      }
    };
    db.on('value', handleData, (error) => alert(error));
    return () => {
      db.off('value', handleData);
    };
  }, [uuid, tripId]);


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
    setInput('');
    // Only add to list on success
    if (addToList(uuid, tripId, trip, input)) {
      setList(newList);
    }
  };

  const complete = (element) => {
    setList(completeTask(uuid, tripId, trip, element));
  };

  const removeItem = (element, event) => {
    event.stopPropagation();
    setList(removeTask(uuid, tripId, trip, element));
  };
  return (
    <Content style={{ textAlign: 'left' }}>
      <p className="dashboard-header-content">
        Here is your to do list for your upcoming trip to
        {' '}
        <b>{trip.city ? `${trip.city}, ${trip.country}` : trip.country}</b>
      </p>
      <Column size="three-fifths" offset="one-fifth">
        <Panel>
          <Panel.Heading>
          To Do List
          </Panel.Heading>
          {list.map((element) => (
            <Panel.Block active={!!element.complete} onClick={() => complete(element)} key={element.description}>
              <Panel.Icon>
                <FontAwesomeIcon icon={element.complete ? faCheckSquare : faSquare} size="lg" />
              </Panel.Icon>
              {element.description.trim()}
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
