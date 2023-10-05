import React, { useContext, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai'
import GlobalContext from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const SearchHeader = ({setSearch}) => {
    const {savedEvents,setSearchEvents} = useContext(GlobalContext);
    const [query,setQuery] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const events = savedEvents.filter((evt) => {
            if (evt.title.indexOf(query) > -1) {
                return true
            } else {
                return false            }
        });
        setSearchEvents(events);
        navigate('/search');
    };

  return (
    <div>
      <header className='px-4 py-2 flex items-center justify-between max-sm:p-0'>
        <div className='flex px-4 py-2 max-sm:px-0'>
            <button 
                onClick={() => {
                    setSearch(false);
                    setSearchEvents([]);
                    navigate('');
                }} 
                className='hover:bg-gray-100 hover:rounded-full p-2'>
                <AiOutlineArrowLeft />
            </button>
            <h1 className='mx-10 max-sm:mx-1 text-xl text-gray-500 font-bold py-2'>Search</h1>
        </div>
        <form 
            onSubmit={handleSubmit}
            className='bg-white rounded-md shadow-lg border-black px-4 py-2 my-2 lg:w-2/5 w-3/5 flex items-center justify-start
            max-sm:p-0 max-sm:mr-6
        '>
            <button 
                className='cursor-pointer mr-5 hover:bg-gray-300 hover:rounded-full p-2'>
                <AiOutlineSearch/>
            </button>
            <input 
                type='text'
                name='search'
                placeholder='Search Event'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='focus:bg-white'
            />
        </form>
      </header>
    </div>
  )
}

export default SearchHeader
