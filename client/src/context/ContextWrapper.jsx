import React, { useState, useReducer, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import * as api from '../api';

// const getPosts = async () => {
//   try {
//     return await api.fetchPosts().then(result => {
//       return result.data;
//     })
      
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//reducer を作成
const saveEventsReducer = (state=[],{type,payload}) => {
  switch (type){
      case 'fetch':
        return payload;
      case 'post':
        return [...state,payload];
      case 'update':
        return state.map((evt) => (evt._id === payload._id ? payload : evt))
      case 'delete':
        return state.filter((evt) => (evt._id !== payload ))
      default:
        throw new Error();
  }
};
// const initEvents = async () => {
//   const storageEvents = localStorage.getItem("savedEvents");
//   const parseEvents = storageEvents ? JSON.parse(storageEvents) : [];
//   return parseEvents
//   const data = await getPosts();
//   return data;
// };

const ContextWrapper = (props) => {
  
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);
  const [daySelected,setDaySelected] = useState(dayjs());
  // const [savedEvents,dispatchEvent] = useReducer(saveEventsReducer,[],initEvents);
  const [savedEvents,dispatchEvent] = useReducer(saveEventsReducer,null);
  const [selectedEvents,setSelectedEvents] = useState(null);
  const [searchEvents,setSearchEvents] = useState([]);



  useEffect(() => {
    async function getPosts(){
      const response = await api.fetchPosts();
      dispatchEvent({type:'fetch',payload:response.data});
    }
    getPosts();
  },[savedEvents])
  // useEffect(()=>{
  //   localStorage.setItem("savedEvents",JSON.stringify(savedEvents));
  // },[savedEvents]);

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
       selectedEvents,setSelectedEvents,
       searchEvents,setSearchEvents,

       }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;