import React, { useState } from 'react'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai'
import {FaRegCalendarAlt} from 'react-icons/fa';
import GlobalContext from '../context/GlobalContext';
import { useContext } from 'react';
import dayjs from 'dayjs';
const CalendarHeader = () => {
  const {monthIndex,setMonthIndex} = useContext(GlobalContext);
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const handleReset = () => {
    
    setMonthIndex(dayjs().month());
  }
  return (
    <div>
      <header className='px-4 py-2 flex items-center justify-between'>
        <h1 className='mr-5'> <FaRegCalendarAlt /></h1>
        <h1 className='mr-10 text-xl text-gray-500 font-bold'>Calendar</h1>
        <button onClick={handleReset} className='cursor-pointer text-gray-600 mx-2 border rounded py-2 px-4 mr-5'>Today</button>
        <button onClick={handlePrevMonth}>
          <span className="cursor-pointer text-gray-600 mx-2">
            <MdChevronLeft />
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="cursor-pointer text-gray-600 mx-2">
            <MdChevronRight />
          </span>
        </button>
        <h2 className='ml-4 text-xl text-gray-500 font-bold'>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
        <button>
          <span className='cursor-pointer mx-5'>
            <AiOutlineSearch/>
          </span>
        </button>
      </header>
    </div>
  )
}

export default CalendarHeader