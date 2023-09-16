import React, { useContext, useState } from 'react'
import { MdClose } from 'react-icons/md';
import GlobalContext from '../context/GlobalContext';
const EventModal = () => {
    // const {showEventModal,setShowEventModal} = useContext(GlobalContext);
    // const {daySelected,setDaySelected} = useContext(GlobalContext);
    // const {savedEvents,dispatchEvent} = useContext(GlobalContext);
    const {setShowEventModal,daySelected,dispatchEvent} = useContext(GlobalContext);
    const [title, setTitle] = useState("");

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const calendarEvent = {
            title:title,
            // day:daySelected,
            day:daySelected.valueOf(),
            id:Date.now(),
        };
        dispatchEvent({type:"save",payload:calendarEvent});
        setShowEventModal(false);
    };
  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <form className='bg-white rounded-lg shadow-2xl w-1/4'>
            <header className='bg-gray-100 px-4 py-2 flex justify-end'>
                <div className='text-gray-400'>
                    <button onClick={() => setShowEventModal(false)}>
                        <MdClose />
                    </button>
                </div>
            </header>

            <div className='p-3'>
                <div className='grid grid-cols-1/5 items-end gap-y-7'>
                    <input 
                        type='text'
                        name='title'
                        placeholder='Add Title'
                        required
                        value={title}
                        className='pt-3 border-0 text-gray-700 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    <p>{daySelected}</p>
                </div>
            </div>
            <footer className='flex justify-end border-t p-3 mt-5'>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white'
                >
                Save
                </button>
            </footer>
        </form>
    </div>
  )
}

export default EventModal
