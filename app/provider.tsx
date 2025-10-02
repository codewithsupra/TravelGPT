"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { TripContextType, TripDetailContext } from '@/context/TripDetailContext';
import { TripInfo } from './create-new-trip/_components/Chatbox';

function Provider({children}:Readonly<{
    children:React.ReactNode
}>) {
    const CreateUser=useMutation(api.user.newUserr);
    const[userDetails,setUserDetails]=useState<any>();
    const[tripDetailInfo,setTripDetailInfo]=useState<TripInfo|null>(null);
    const{user}=useUser();
    useEffect(()=>{
        if(user){ 
        CreateNewUser()
        };

    },[user])
    
    const CreateNewUser=async()=>{
        // save new user if not exist
        if(user){
            const result=await CreateUser({
            email:user?.primaryEmailAddress?.emailAddress??'',
            imageUrl:user?.imageUrl,
            name:user?.fullName??''

        })
        console.log(result); //the result is the user details
        setUserDetails(result);

        }
    }
  return (
     <UserDetailsContext.Provider value={{userDetails,setUserDetails}} >
        <TripDetailContext.Provider value={{tripDetailInfo,setTripDetailInfo}}>
    <div>
        <Header />
        {children}

    </div>
    </TripDetailContext.Provider>
    </UserDetailsContext.Provider>
  )
}

export default Provider;
export function useUserDetails(){
    return useContext(UserDetailsContext);
}
export function useTripDetails():TripContextType{
    return useContext(TripDetailContext);
}
