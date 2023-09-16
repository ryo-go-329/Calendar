import React, { useState, useReducer, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

//reducer を作成
const saveEventsReducer = (state,{type,payload}) => {
  switch (type){
      case 'save':
          return [...state,payload];
      default:
          throw new Error();
  }
};
const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parseEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parseEvents
};

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);
  const [daySelected,setDaySelected] = useState(dayjs());
  const [savedEvents,dispatchEvent] = useReducer(saveEventsReducer,[],initEvents);

  useEffect(()=>{
    localStorage.setItem("savedEvents",JSON.stringify(savedEvents));
  },[savedEvents]);
  return (
    <GlobalContext.Provider value={{
       monthIndex, setMonthIndex,
       showEventModal, setShowEventModal,
       daySelected,setDaySelected,
       savedEvents,dispatchEvent
       }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;