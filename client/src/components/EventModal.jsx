import React, { useContext, useState } from 'react'
import { MdClose, MdContactSupport, MdDeleteOutline } from 'react-icons/md';
import GlobalContext from '../context/GlobalContext';


import * as api from '../api'

const EventModal = () => {
    const {setShowEventModal,daySelected,dispatchEvent,selectedEvents} = useContext(GlobalContext);
    const [event,setEvent] = useState(selectedEvents ? selectedEvents : {
        title:"",description:"",day:daySelected,start:"",end:"",location:""
    });
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const calendarEvent = {
            title:event.title,
            description:event.description,
            day:daySelected,
            start:event.start,
            end:event.end,
            location:event.location
        };
        if (! selectedEvents) {
            //新規作成
            async function createPost(newPost){
                const response = await api.createPost(newPost);
                dispatchEvent({type:"post",payload:response});
            }
            createPost(calendarEvent);
        } else {
            //編集
            async function updatePost(id,updatedPost){
                const response = await api.updatePost(id,updatedPost);
                dispatchEvent({type:"update",payload:response});
            }
            updatePost(selectedEvents._id,calendarEvent);
        };
        setShowEventModal(false);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        
        if (selectedEvents) {
            //削除
            async function deletePost(id){
                await api.deletePost(id);
                dispatchEvent({type:"delete",payload:id});
            }
            deletePost(selectedEvents._id);
            setShowEventModal(false)
        } 
    };
  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <form className='bg-white rounded-lg shadow-2xl w-1/2'>
            <header className='bg-gray-100 px-4 py-2 flex justify-center'>
                <div className='text-gray-400 flex'>
                    <p>{selectedEvents ? 'Edit': 'Create'}</p>
                    <p>{daySelected}</p>
                    <div className='pl-2 pt-1'>
                        <button onClick={handleDelete}>
                            <MdDeleteOutline />
                        </button>
                        <button onClick={() => setShowEventModal(false)}>
                            <MdClose />
                        </button>
                    </div>
                    
                </div>
            </header>

            <div className='p-3'>
                <div className='grid grid-cols-1/5 items-end'>
                    <input 
                        type='text'
                        name='title'
                        placeholder='Add Title'
                        required
                        value={event.title}
                        className='pt-3 border-0 text-gray-700 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                        // onChange={(e)=>setTitle(e.target.value)}
                        onChange={(e) => {setEvent({...event,title:e.target.value})}}
                    />
                    <input 
                        type='text'
                        name='description'
                        placeholder='Description'
                        value={event.description}
                        className='pt-3 border-0 text-gray-700 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                        // onChange={(e)=>setTitle(e.target.value)}
                        onChange={(e) => {setEvent({...event,description:e.target.value})}}
                    />
                    
                    <div className='flex'>
                    <input 
                        type='time'
                        name='start'
                        placeholder='Start'
                        value={event.start}
                        className='pt-3 border-0 text-gray-700 text-xl font-semibold pb-2 w-1/2 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                        // onChange={(e)=>setTitle(e.target.value)}
                        onChange={(e) => {setEvent({...event,start:e.target.value})}}
                    />
                    <input 
                        type='time'
                        name='end'
                        placeholder='End'
                        value={event.end}
                        className='pt-3 border-0 text-gray-700 text-xl font-semibold pb-2 w-1/2 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                        // onChange={(e)=>setTitle(e.target.value)}
                        onChange={(e) => {setEvent({...event,end:e.target.value})}}
                    />
                    </div>
                    
                    <input 
                        type='text'
                        name='location'
                        placeholder='Location'
                        value={event.location}
                        className='pt-3 border-0 text-gray-700 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                        // onChange={(e)=>setTitle(e.target.value)}
                        onChange={(e) => {setEvent({...event,location:e.target.value})}}
                    />
                </div>
            </div>
            <footer className='flex justify-end border-t p-3 mt-2'>
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
