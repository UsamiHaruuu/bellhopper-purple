import React, { useState } from 'react';
import {
  Image, Block, Title, Column, Button,
} from 'rbx';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import countryData from '../Dashboard/CountryHelpers/CountryData';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Search = () => {
  const [input, setInput] = useState({});
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  const startDate = JSON.stringify(state[0].startDate).split('T')[0].replace('"', '');

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
      ? `/#/dashboard?city=${input.city}&country=${input.country}&startDate=${startDate}`
      : `/#/dashboard?country=${input.country}&startDate=${startDate}`
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
        <div>
          <DateRange
            editableDateInputs
            minDate={addDays(new Date(), 0)}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
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
