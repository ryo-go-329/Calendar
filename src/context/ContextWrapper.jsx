import React, { useState, useReducer, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

//reducer を作成
const saveEventsReducer = (state,{type,payload}) => {
  switch (type){
      case 'save':
          return [...state,payload];
      case 'update':
          return state.map((evt) => (evt.id === payload.id ? payload : evt))
      case 'delete':
          return state.filter((evt) => (evt.id !== payload.id ))
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
  const [selectedEvents,setSelectedEvents] = useState(null);

  useEffect(()=>{
    localStorage.setItem("savedEvents",JSON.stringify(savedEvents));
  },[savedEvents]);

  useEffect(()=>{
    if (! showEventModal) {
      setSelectedEvents(null)
    }
  },[showEventModal])
  return (
    <GlobalContext.Provider value={{
       monthIndex, setMonthIndex,
       showEventModal, setShowEventModal,
       daySelected,setDaySelected,
       savedEvents,dispatchEvent,
       selectedEvents,setSelectedEvents
       }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;