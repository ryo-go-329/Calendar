import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';


const Day = (props) => {
    const {day, rowIdx} = props;
    
    //日付の色を付ける
    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") 
        ? "bg-blue-600 text-white rounded-full w-7" : ""
    }
    //休み日の色を付ける
    const getColorDate = () => {
      if (day.format("d") === "6") {
        return "bg-blue-50";
      } 
      else if (day.format("d") === "0") {
        return "bg-red-50";
      } else {
        return "";
      }
    }
    
    const {setShowEventModal,setDaySelected,savedEvents,setSelectedEvents} = useContext(GlobalContext);
    const getShowEventModal = () => {
      setShowEventModal(true);
      setDaySelected(day.format("dddd, MMMM DD"));
    }
    const [dayEvents,setDayEvents] = useState([]);
    
    useEffect(()=>{
      const events = savedEvents.filter(
        (evt) => dayjs(evt.day).format("DD-MM") === day.format("DD-MM")
      );
      
      setDayEvents(events);
    },[savedEvents,day]);
    
  return (
    
    <div onClick={getShowEventModal} className={`border border-gray-200 flex flex-col ${getColorDate()}`}>
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && <p className='text-sm mt-1'>{day.format("ddd")}</p>}
        <p className={`text-sm p-1 my-1 text-center" ${getCurrentDayClass()}`}>{day.format("DD")}</p>
      </header>
      <div
       className='flex-1 cursor-pointer' 
       onClick={()=>{
        setDaySelected(day);
        setShowEventModal(true);
      }}>
        {dayEvents.map((evt,idx) => (
          <div 
            onClick={() => setSelectedEvents(evt)}
            key={idx} 
            className={'bg-neutral-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate'}>
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Day
