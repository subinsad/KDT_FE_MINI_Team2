import Input from './Form/Input';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Button from './Common/Button';

function SearchBar() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <div className="flex">
            <Input placeholder="지역명 입력" className="w-4/12" />
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
            />
            <Button text="검색" className="text-white bg-black " />
        </div>
    );
}

export default SearchBar;
