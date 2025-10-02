"use client"
import React, { useState } from 'react'
import { Clock,TicketCheckIcon } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { Clock12 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExternalLink as ExtIcon } from 'lucide-react';
import { Activity } from './Chatbox';
import { useEffect } from 'react';
import axios from 'axios';
import { TicketCheck } from 'lucide-react';

type Props={
    activity:Activity
}

function ActivityInfo({activity}:Props) {
    const[imageUrl,setImageURL]=useState<string>("");
    useEffect(()=>{
        if(activity.place_name){
            fetchImageURL();
        }

    },[activity])
    async function fetchImageURL(){
        const res=await axios.post("/api/google-place-detail",{
            placeName:activity.place_name
        });
        console.log(res.data);
       const url =
        typeof res.data === "string" ? res.data : res.data?.photoUrl ?? res.data?.url ?? "";
      if (url) setImageURL(url);
        setImageURL(res.data)

    }
  return (
    <article className="flex flex-col gap-3 bg-white/80 p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="w-full h-44 md:h-48 relative rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={imageUrl || "/download.jpeg"}
          alt={activity.place_name ||""}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">
          {activity.place_name}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">{activity.place_details}</p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm text-blue-600">
            <TicketCheck className="w-4 h-4" />
            <span className="font-medium">{activity.ticket_pricing ?? "N/A"}</span>
          </p>

          <div className="flex items-center gap-4 text-sm text-orange-600">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {activity.time_travel_each_location ?? "-"}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Clock12 className="w-4 h-4" />
              {activity.best_time_to_visit ?? "-"}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              activity.place_name
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-center rounded-xl bg-gray-100 hover:bg-orange-400 text-black transition-colors"
            >
              <ExtIcon className="w-4 h-4" />
              <span className="ml-2">View</span>
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ActivityInfo

