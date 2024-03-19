import Input from './Form/Input';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function SearchBar() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <div className="flex">
            <Input placeholder="지역명 입력" />
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
            />
        </div>
    );
}

export default SearchBar;
