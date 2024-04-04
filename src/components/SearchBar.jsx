import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from './Form/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Common/button';

function SearchBar({ onSearch, className }) {
    const navigate = useNavigate();
    const params = useParams();

    const formatDate = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const todayString = formatDate(today);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowString = formatDate(tomorrow);

    const [location, setLocation] = useState(params.location || '');
    const [startDate, setStartDate] = useState(params.startDate || todayString);
    const [endDate, setEndDate] = useState(params.endDate || tomorrowString);
    const [personal, setPersonal] = useState(params.personal || '');

    useEffect(() => {
        setLocation(params.location || '제주');
        setStartDate(params.startDate || todayString);
        setEndDate(params.endDate || tomorrowString);
        setPersonal(params.personal || '2');
    }, [params]);

    const handleSearch = () => {
        const trimmedLocation = location.trim();
        if (!trimmedLocation) {
            alert('지역명을 입력해주세요.');
            return;
        }
        if (onSearch) {
            onSearch(trimmedLocation);
        }
        setLocation('');
        setPersonal('');
        if (params.type) {
            navigate(
                `/list/${startDate}/${endDate}/${encodeURIComponent(
                    trimmedLocation
                )}/${params.type}/${personal}`
            );
        } else {
            navigate(
                `/list/${startDate}/${endDate}/${encodeURIComponent(
                    trimmedLocation
                )}/호텔/${personal}`
            );
        }
    };

    const handleStartDateChange = (date) => {
        const formattedDate = formatDate(date);
        setStartDate(formattedDate);
    };

    const handleEndDateChange = (date) => {
        const formattedDate = formatDate(date);
        setEndDate(formattedDate);
    };

    const handlePersonalChange = (e) => {
        setPersonal(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    return (
        <div
            className={`flex flex-col w-full md:flex-row md:max-w-[1200px] md:gap-5 p-6 bg-white rounded-2xl  ${className}`}>
            <Input
                placeholder="지역명 입력"
                className="md:grow"
                value={location}
                onChange={handleLocationChange}
            />
            <DatePicker
                selectsRange={true}
                selected={new Date(startDate)}
                onChange={(dates) => {
                    handleStartDateChange(dates[0]);
                    handleEndDateChange(dates[1]);
                }}
                startDate={new Date(startDate)}
                endDate={endDate ? new Date(endDate) : null}
                minDate={new Date()}
                className="md:grow h-8 p-6 rounded bg-gray-1 hover:bg-gray-200 hidden md:block"
            />
            <Input
                placeholder="인원 입력"
                className="md:grow bg-gray-1 hidden md:block"
                value={personal}
                onChange={handlePersonalChange}
            />
            <Button text="검색" onClick={handleSearch} className="" />
        </div>
    );
}

export default SearchBar;
