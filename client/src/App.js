import {getMonth} from "./util";
import './App.css';
import Month from "./components/Month";
import Sidebar from "./components/Sidebar";
import CalendarHeader from "./components/CalendarHeader";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "./context/GlobalContext";
import dayjs from "dayjs";
import EventModal from "./components/EventModal";
import Events from "./components/Events";
import { Route, Routes } from 'react-router-dom';


function App() {
  //console.table(getMonth(8));
  const [currentMonth,setCurrentMonth] = useState(getMonth);
  const {monthIndex,showEventModal,searchEvents} = useContext(GlobalContext);
  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex));
  },[monthIndex]);

  return (
    <>
        {showEventModal && <EventModal />}
        <div className="h-screen flex flex-col max-sm:w-full">
            <CalendarHeader />
          <div className="flex flex-1 justify-center border-y-4">
            {/* <Month month={currentMonth}/> */}
            <Routes>
              <Route path="" element={<Month month={currentMonth}/>}/>
              <Route path="/search" element={<Events searchEvents={searchEvents}/>}/>
            </Routes>
            <Sidebar />
            {/* <Month month={currentMonth}/> */}
            
          </div>
        </div>
      
    </>
  );
}

export default App;
