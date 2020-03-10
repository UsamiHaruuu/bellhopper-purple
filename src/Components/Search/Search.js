import React, { useState } from 'react';
import { Block, Button } from 'rbx';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import countryData from '../Dashboard/CountryHelpers/CountryData';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { saveTrip } from './helpers';
import { generateRandomId, setCurrentTrip } from '../../Firebase/helpers';

const Search = ({ uuid }) => {
  const [input, setInput] = useState({});
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(
      new Date().setTime(new Date().getTime() + 7 * 86400 * 1000),
    ),
    key: 'selection',
  });
  console.log(state.startDate);
  const redirect = (url) => {
    window.location.href = url;
    window.location.reload();
  };

  const saveAndRedirect = () => {
    const tripId = generateRandomId();
    saveTrip(
      uuid,
      tripId,
      input.city,
      input.country,
      state.startDate,
      state.endDate,
    );
    setCurrentTrip(uuid, tripId);
    redirect(`/#/dashboard?tripId=${tripId}`);
  };

  const formatOption = (option) => (option.city ? `${option.city}, ${option.country}` : `${option.country}`);

  const handleInputChange = (value) => {
    if (value) {
      setInput(value);
    } else {
      setInput({});
    }
  };

  return (
    <div className="search-box">
      <Autocomplete
        id="country-search"
        options={[...countryData.countries, ...countryData.cities]}
        getOptionLabel={(option) => formatOption(option)}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField
            {...params}
            label="City / Country"
            variant="outlined"
            fullWidth
          />
        )}
        onChange={(event, value) => handleInputChange(value)}
      />
      {Object.entries(input).length > 0 && (
        <div style={{ backgroundColor: 'white', position: 'relative' }}>
          <DateRange
            editableDateInputs
            minDate={addDays(new Date(), 0)}
            onChange={(item) => setState(item.selection)}
            moveRangeOnFirstSelection={false}
            ranges={[state]}
          />
        </div>
      )}
      <Block />
      <Button
        onClick={() => saveAndRedirect()}
        color="link"
        size="large"
        disabled={Object.entries(input).length === 0}
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
