"use client"
import React, { useEffect, useState } from 'react'
import { Timeline } from "@/components/ui/timeline";
import Image from 'next/image';
import { Clock, Clock12, ExternalLink, Phone, Star, TicketCheckIcon, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCardItem from './HotelCardItem';
import ActivityInfo from './ActivityInfo';
import { useTripDetails } from '@/app/provider';
import { TripInfo } from './Chatbox';




function Itinerary() {
    const {tripDetailInfo,setTripDetailInfo}=useTripDetails();
    const[tripData,setTripData]=useState<TripInfo | null>(null);
    useEffect(()=>{
        if(tripDetailInfo){
            setTripData(tripDetailInfo)
        }

    },[tripDetailInfo])
 const data = tripData?[
    { 
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData.hotels.map((hotel,index)=>(
            <HotelCardItem key={index} hotel={hotel}/>
           
          ))}
        </div>
      ),
    },
    ...tripData.itinerary.map((dayData)=>({
        title:`Day ${dayData.day}`,
        content:(
            <div>
                <p>Best Time: {dayData.best_time_to_visit_day   } </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                {dayData.activities.map((activity,index)=>(
                    <ActivityInfo key={index} activity={activity}/>


                ))}
                </div>
            </div>
        )
    }))
    
  ]:[];
  return (
   <div className="relative w-full h-[83vh] overflow-auto">
  {tripData ? (
    <Timeline data={data} tripData={tripData} />
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10">
      {/* Hero image with overlay */}
      <div className="relative w-full max-w-4xl h-80 rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src="/download.jpeg"
          alt="Travel Inspiration"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Your Journey Awaits ✈️
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
            Plan unforgettable adventures with curated stays, hidden gems, and
            experiences tailored just for <span className="text-emerald-300 font-semibold">you</span>.
          </p>
          <button onClick={()=>{
            window.dispatchEvent(new Event("focus-chat"));
          }}className="mt-6 px-6 py-3 cursor-pointer rounded-full bg-emerald-500 text-white font-semibold shadow-lg hover:bg-emerald-600 transition">
            Start Planning Now
          </button>
        </div>
      </div>

      {/* Below hero */}
      <div className="mt-12 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Tailored just for You. <span className="text-emerald-500">Lets get Started...</span>
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          The right panel will soon be filled with your personalized itinerary —
          curated hotels, activities, and insider tips. For now, imagine the
          possibilities.
        </p>
      </div>
    </div>
  )}
</div>

  );
}

export default Itinerary;
