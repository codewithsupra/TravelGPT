"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import EmptyStateBox from './EmptyStateBox'
import GroupSize from './GroupSize'
import Budget from './Budget'
import FinalUI from './FinalUI'
import TripDuration from './TripDuration'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api'
import { useTripDetails, useUserDetails } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';
import Interests from './Interests'
import SpecialRequirements from './Special'

type Message = {
  role: "user" | "assistant" | "system"
  content: string,
  ui?:string,
}
 export type  TripInfo={
    budget:string,
    destination:string,
    group_size:string,
    duration:string
    origin:string,
    hotels:Hotel[],
    itinerary:Itinerary[]
}
export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: GeoCoordinates;
  rating: number;
  description: string;
};

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  // some activities include geo info — keep optional in case not present
  geo_coordinates?: GeoCoordinates;
  place_address?: string;
  ticket_pricing?: string;
  // travel time between locations as freeform text in your JSON
  time_travel_each_location?: string;
  best_time_to_visit?: string;
};

export type Itinerary = {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
};




function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const[final,setFinal]=useState(false);
  const [tripDetails,setTripDetails]=useState<TripInfo|null>(null);
  const SaveTripDetail=useMutation(api.tripDetail.CreateTripDetail);
  const{userDetails,setUserDetails}=useUserDetails();
  //Trip Detail COntext
  const {tripDetailInfo,setTripDetailInfo}=useTripDetails();

  function scrollToBottom() {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }
  useEffect(()=>{
    function handleFocusChat(){
      const element=document.getElementById("chat-input") as HTMLTextAreaElement|null;
      if(element){
        element.focus();
        element.selectionStart=element.selectionEnd=element.value.length
      } 
    }
    window.addEventListener("focus-chat",handleFocusChat);
    return ()=>window.removeEventListener("focus-chat",handleFocusChat)
  },[])

  async function onSend(text?:string) {
    const trimmed = (text??input??"").trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const updated = [...messages, userMsg]
     setMessages(updated);
   
   
    setInput("");
    scrollToBottom();
    setLoading(true);

    try {
      const res = await axios.post("/api/aimodel", { messages: updated,isFinal:final }) 
      const data = res.data;
      //show the shape of data
      console.log("Trip",data);
      

      if (data && typeof data === "object" && (data.resp || data.ui)&& !final) {
        console.log("UI component",data.ui)
        setMessages((prev) => [...prev, { role: "assistant", content: String(data.resp ?? data.message ?? ""),ui:data.ui??"" }])
      }
      else if(final && data && typeof data==="object"){
        
        setTripDetails(data?.trip_plan?? data);
        setTripDetailInfo(data.trip_plan??data)
        setFinal(false);
        const tripId=uuidv4();
        console.log('attempting to save trip,tripId:',tripId);
        console.log('user details!!',userDetails);
         const saved = await SaveTripDetail({
            tripDetail:data?.trip_plan,
            tripId,
            uid:userDetails?._id
        });
        console.log("Savted trip details",saved);
    } else if (typeof data === "string") {
        setMessages((prev) => [...prev, { role: "assistant", content: data }])
        
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "No response from AI" }])
      }
    } catch (error: unknown) {
      console.error("AI request failed", error)
      setMessages((prev) => [...prev, { role: "assistant", content: "Failed to fetch response from AI" }])
    } finally {
      setLoading(false)
      setTimeout(scrollToBottom, 50)
    }
    
  }
  function GenerateUi(ui:string){
    const token=(ui??"").toLowerCase().trim();
    if(!token) return null;
    if(token.includes("budget") ){
        //BudgetUI Component
        return <Budget onSelectedOption={(value:string)=>{
            setInput(value);
            onSend(value);

        }} />
    }else if(token.includes("groupsize")){
        //gorupsize component
        return <GroupSize onSelectedOption={(value:string)=>{
            setInput(value);
            onSend(value);

        }} />

    }
    else if(token.includes('tripduration')){
        //trip duration component
        return <TripDuration onSelectedOption={(value:string)=>{
            setInput(value);
            onSend(value);

        }}/>
    }
    else if(token.includes("interests")){
      return <Interests onSelectedOption={(value:string)=>{
        setInput(value);
        onSend(value);
      }}/>
    }
    else if (token.includes("special")) {
  return <SpecialRequirements onSelectedOption={(value: string) => {
    setInput(value)
    onSend(value)
  }} />
}
 
    else if(token.includes("final")){
        return <FinalUI  viewTrip={()=>console.log()}
        disable={!tripDetails}
        />
    }
    return null

  }
  useEffect(()=>{
    const lastMsg=messages[messages.length-1];
    if(lastMsg?.ui==='final'){
        setFinal(true);
        setInput("Okay,great");
    }

  },[messages])
  useEffect(()=>{
    if(final && input){
        onSend()
    }
  },[final])

  return (
    <div className='h-[80vh] flex flex-col border bg-gray-50 rounded-2xl shadow-xl p-5'>
      {/* Display messages or empty state */}
      <section ref={containerRef} className='flex-1 overflow-y-auto p-4 space-y-3'>
        {messages.length === 0 && !loading ? (
          <EmptyStateBox  onSelectOption={(v:string)=>{
            setInput(v);
            onSend(v);
          } }/>
        ) : (
          <>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-lg px-4 py-2 rounded-lg ${m.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-black"}`}>
                  {m.content}
                  {m.role==="assistant" && m.ui && GenerateUi(m.ui??"")}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-lg px-4 py-2 rounded-lg bg-gray-100 text-black animate-pulse">
                  AI is typing<span className="ml-1 animate-ping inline-block">...</span>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* User input */}
      <section>
        <div className="mt-6 relative">
          <Textarea
            id="chat-input"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={3}
            placeholder="Ask me to plan your trip- e.g., `5 days in Tokyo`"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                onSend();
              }
            }}
            className="w-full resize-none rounded-xl border border-gray-300 bg-white/80 p-4 pr-16 text-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary transition"
          />

          <Button
            onClick={()=>onSend()}
            size="icon"
            aria-label="Send prompt"
            className="absolute right-3 bottom-3 inline-flex items-center justify-center rounded-full bg-primary text-white hover:opacity-95 p-2 shadow"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Chatbox;
