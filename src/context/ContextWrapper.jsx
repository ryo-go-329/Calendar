import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);
  const [daySelected,setDaySelected] = useState();
  return (
    <GlobalContext.Provider value={{
       monthIndex, setMonthIndex,
       showEventModal, setShowEventModal,
       daySelected,setDaySelected
       }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;