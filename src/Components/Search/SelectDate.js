import React from 'react';
import { DateRange } from 'react-date-range';

const SelectDate = (date, setDate) => (
    <div style={{ display: 'flex' }}>
        <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
        />
    </div>
);
export default SelectDate
