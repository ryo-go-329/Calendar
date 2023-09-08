import {getMonth} from "./util";
import './App.css';
import Month from "./components/Month";
import Sidebar from "./components/Sidebar";
import CalendarHeader from "./components/CalendarHeader";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "./context/GlobalContext";
import dayjs from "dayjs";
import EventModal from "./components/EventModal";

function App() {
  //console.table(getMonth(8));
  const [currentMonth,setCurrentMonth] = useState(getMonth);
  const {monthIndex,showEventModal} = useContext(GlobalContext);
  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex));
  },[monthIndex]);

  return (
    <>
        {showEventModal && <EventModal />}
        <div className="h-screen flex flex-col">
            <CalendarHeader />
          <div className="flex flex-1">
            <Sidebar />
            <Month month={currentMonth}/>
          </div>
        </div>
      
    </>
  );
}

export default App;
