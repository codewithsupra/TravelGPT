"use client"
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUserDetails } from '@/app/provider';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Trip } from '@/app/my-trips/page';
import { useState } from 'react';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { useTripDetails } from '@/app/provider';
import GlobalMap from '@/app/create-new-trip/_components/GlobalMap';


function ViewTrip() {
    const {tripid}=useParams();
   const {userDetails}=useUserDetails();
   const convex=useConvex();
   const[tripData,setTripData]=useState<Trip>();
   const {tripDetailInfo,setTripDetailInfo}=useTripDetails();
   useEffect(()=>{
    if(tripid){
        fetchTrip();
    }

   },[tripid])
   async function fetchTrip(){
    const result=await convex.query(api.tripDetail.getTripById,{
        uid:userDetails._id,
        tripId:tripid+''
    })
    console.log(result); //shape of the trip record returned by the DB
    setTripData(result);
    setTripDetailInfo(result.tripDetail)
   }
  return (
    <div className='grid grid-cols-5'>
        <div className='col-span-3'>
            <Itinerary />

        </div>
        <div className='col-span-2'>
            <GlobalMap />
        
        </div>
      
    </div>
  )
}

export default ViewTrip
