import React, { useState } from 'react'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai'
import {FaRegCalendarAlt} from 'react-icons/fa';
import GlobalContext from '../context/GlobalContext';
import { useContext } from 'react';
import SearchHeader from './SearchHeader';
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
  const [search,setSearch] = useState(null);
  return (
    <>
      {search ? <SearchHeader setSearch={setSearch}/> : 
    <div>
      <header className='px-4 py-4 flex items-center justify-between max-sm:p-0'>
        <h1 className='mr-5 max-sm:mr-3'> <FaRegCalendarAlt /></h1>
        <h1 className='mr-10 max-sm:mr-3 text-xl text-gray-500 font-bold '>Calendar</h1>
        <button 
          onClick={handleReset} 
          className='cursor-pointer text-gray-600 mx-2 border rounded py-2 px-4 mr-5 max-sm:mx-0 hover:bg-gray-100
        '>
        Today</button>
        <button onClick={handlePrevMonth} className='cursor-pointer text-gray-600 p-2 mx-2 max-sm:mx-0 hover:bg-gray-100 hover:rounded-full'>
          
            <MdChevronLeft />
        </button>
        <button onClick={handleNextMonth} className='cursor-pointer text-gray-600 p-2 mx-2 max-sm:mx-0 hover:bg-gray-100 hover:rounded-full'>
            <MdChevronRight />
        </button>
        <h2 className='ml-4 text-xl text-gray-500 font-bold'>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
        <button onClick={() => setSearch(true)} className='cursor-pointer text-gray-600 p-2 mx-5 max-sm:mx-0 hover:bg-gray-100 hover:rounded-full max-sm:pr-4'>
            <AiOutlineSearch/>
        </button>
      </header>
    </div>
      }
    </>
    
  )
}

export default CalendarHeader
