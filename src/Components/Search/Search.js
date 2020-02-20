import React, { useState } from 'react';
import {
  Image, Block, Title, Column, Button,
} from 'rbx';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { countryCodes } from '../Dashboard/CountryHelpers/CountryCodes';

const Search = () => {
  const [text, setText] = useState('');

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
        <Autocomplete
          id="country-search"
          options={countryCodes}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...params} label="Country" variant="outlined" fullWidth />
          )}
          onChange={(event, value) => setText(value.name)}
        />
        <Block />
        <Button
          as="a"
          href={`/#/dashboard?country=${text}`}
          color="link"
          size="large"
          disabled={text === ''}
        >
        Search
        </Button>
      </Column>
    </Column.Group>
  );
};

export default Search;
