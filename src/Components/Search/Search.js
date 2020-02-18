import React, { useState } from 'react';
import {
  Image, Block, Title, Input, Column, Button,
} from 'rbx';

const Search = () => {
  const [text, setText] = useState('costa rica');

  return (
    <Column.Group>
      <Column
        size={6}
        offset={3}
        style={{ textAlign: 'center' }}
      >
        <Block />
        <Image.Container size={128} className="img-center">
          <Image alt="BellHopper Logo" src="/images/bell-solid.svg" />
        </Image.Container>
        <Block />
        <Title size={1} as="b">BellHopper</Title>
        <Title size={5}>where to?</Title>
        <Input
          onChange={(e) => setText(e.target.value)}
          placeholder="City / Country / Postal Code"
        />
        <Block />
        <Button
          as="a"
          href={`/#/dashboard?country=${text}`}
          color="link"
          size="large"
        >
        Search
        </Button>
      </Column>
    </Column.Group>
  );
};

export default Search;
