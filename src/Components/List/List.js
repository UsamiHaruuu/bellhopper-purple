import React, { useState, useEffect } from 'react';
import { Button, Container, Content, Notification, Block, Title, Column, Delete, Field, Control, Input } from 'rbx';
import Footer from '../Footer.js'

const List = () => {
  const [list, setList] = useState([]);
  const [unit, setUnit] = useState('');

  const handleUnitChange = event => {
    setUnit(event.target.value);
  };

  const handleSubmit = () => {
    const newList = list.slice(0);
    newList.push(unit);
    setList(newList);
    setUnit('');
  };

  const removeItem = (element) => {
    const itemIndex = list.indexOf(element);
    const newList = list.slice(0);
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
        {list.map(element=> {
          return (
            <Notification>
              {element}
              <Delete onClick={()=>removeItem(element)}/>
            </Notification>
          );
        })}
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
            <Button size="medium" color="warning" onClick={handleSubmit}>
              Add
            </Button>
          </Control>
        </Field>
      </Column>
      <Footer />
    </Content>
  );
};

export default List;

