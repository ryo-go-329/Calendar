import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import { LuSubtitles } from 'react-icons/lu';
import { BiTimeFive } from 'react-icons/bi';
import {CiLocationOn} from 'react-icons/ci';


const Events = ({searchEvents}) => {
    useEffect(()=>{
        console.log(searchEvents);
    },[])
    
  return (
    <div className='flex flex-col justify-start w-full md:w-3/5'>
        {searchEvents.map((event) => (
            <div className='flex max-sm:flex-wrap justtify-center items-center h-16 rounded-md shadow-xl pt-1 max-sm:text-xs max-sm:mx-2 max-sm:mt-2'>
                <p className='text-md max-sm:text-xs leading-normal'><span className='font-bold text-xl  max-sm:text-sm mx-2'>{dayjs(event.day).format("DD")}</span>{dayjs(event.day).format("YYYY-MMMM")}</p>
                <h1 className='text-2xl max-sm:text-sm font-bold mx-6 leading-normal'>{event.title}</h1>
                <LuSubtitles />
                <p className='leading-normal mx-4'>{event.description}</p>
                <BiTimeFive />
                <p className='mr-2 leading-normal'>{event.start}</p>
                <p className='mr-2 leading-normal'>~</p>
                <BiTimeFive />
                <p className='mr-6 leading-normal'>{event.end}</p>
                <CiLocationOn />
                <p className='leading-normal'>{event.location}</p>
            </div>
        ))}
    </div>

  )
}

export default Events
