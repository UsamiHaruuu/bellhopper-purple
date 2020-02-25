import React, { useState } from 'react';
import {
  Image, Block, Title, Column, Button,
} from 'rbx';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countryData from '../Dashboard/CountryHelpers/CountryData';

const Search = () => {
  const [input, setInput] = useState({});

  const redirect = (url) => {
    window.location.href = url;
    window.location.reload();
  };

  const formatOption = (option) => (
    option.city
      ? `${option.city}, ${option.country}`
      : `${option.country}`
  );

  const getUrl = () => (
    input.city
      ? `/#/dashboard?city=${input.city}&country=${input.country}`
      : `/#/dashboard?country=${input.country}`
  );

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
          options={[...countryData.countryCodes, ...countryData.cityData]}
          getOptionLabel={(option) => formatOption(option)}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...params} label="City / Country" variant="outlined" fullWidth />
          )}
          onChange={(event, value) => setInput(value)}
        />
        <Block />
        <Button
          onClick={() => redirect(getUrl())}
          color="link"
          size="large"
          disabled={Object.entries(input).length === 0}
        >
        Search
        </Button>
      </Column>
    </Column.Group>
  );
};

export default Search;
