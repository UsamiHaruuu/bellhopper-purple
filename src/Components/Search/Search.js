import React, { useState } from 'react';
import {
  Image, Block, Title, Column, Button,
} from 'rbx';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateRange } from 'react-date-range';
import countryData from '../Dashboard/CountryHelpers/CountryData';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
const getDate = () => {
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return today;
}
const Search = () => {
  const [input, setInput] = useState({});
  let dateRange = 0;
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  if (state[0].endDate && state[0].endDate !== null) {
    dateRange = Math.floor((Date.parse(JSON.stringify(state[0].endDate).split('T')) - Date.parse(JSON.stringify(state[0].startDate).split('T'))) / 86400000) + 1;
  }
  const startDate = JSON.stringify(state[0].startDate).split('T')[0].replace('"', '');
  console.log(startDate)
  dateRange = Math.min(15, dateRange);
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
      ? `/#/dashboard?city=${input.city}&country=${input.country}&startDate=${startDate}&dateRange=${dateRange}`
      : `/#/dashboard?country=${input.country}&startDate=${startDate}&dateRange=${dateRange}`
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
            maxDate={addDays(new Date(), 14)}
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
