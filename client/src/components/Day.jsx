import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';


const Day = (props) => {
    const {day, rowIdx} = props;
    const {setShowEventModal,setDaySelected,savedEvents,setSelectedEvents} = useContext(GlobalContext);


    //日付の色を付ける
    const getCurrentDayClass = () => {
        return day.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") 
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
    
    //Modal表示
    const getShowEventModal = () => {
      setShowEventModal(true);
      // setDaySelected(day.format("dddd, MMMM DD"));
      setDaySelected(day.format("YYYY-MM-DD"));
    }
    const [dayEvents,setDayEvents] = useState([]);
    

    //選択した日のEventを取得
    useEffect(()=>{
      if (savedEvents){
        const events = savedEvents.filter(
          (evt) => dayjs(evt.day).format("DD-MM") === day.format("DD-MM")
        );
        
        setDayEvents(events);
      }
      
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
