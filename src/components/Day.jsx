import React, { useContext } from 'react'
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';


const Day = (props) => {
    const {day, rowIdx} = props;

    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") 
        ? "bg-blue-600 text-white rounded-full w-7" : ""
    }
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
    
    const {showEventModal,setShowEventModal} = useContext(GlobalContext);
    const {daySelected,setDaySelected} = useContext(GlobalContext);
    const getShowEventModal = () => {
      setShowEventModal(!showEventModal);
      setDaySelected(day.format("dddd, MMMM DD"));
    }
  return (
    
    <div onClick={getShowEventModal} className={`border border-gray-200 flex flex-col ${getColorDate()}`}>
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && <p className='text-sm mt-1'>{day.format("ddd")}</p>}
        <p className={`text-sm p-1 my-1 text-center" ${getCurrentDayClass()}`}>{day.format("DD")}</p>
      </header>
    </div>
  )
}

export default Day
