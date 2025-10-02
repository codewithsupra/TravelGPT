"use client"
import React from 'react'
import Image from 'next/image';
import { ArrowBigRight } from 'lucide-react';
import { Trip } from '../page';
import { useEffect,useState } from 'react';
import axios from "axios";
import Link from 'next/link';

type Props = {
  trip: Trip;
};

function TripCard({ trip }: Props) {
  const imgAlt = trip.tripDetail.hotels?.[0]?.hotel_name ?? "Trip image";
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    if (trip) {
      getDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip]);

  async function getDetails() {
    try {
      const res = await axios.post("/api/google-place-detail", { placeName:trip.tripDetail.destination});
      // accept either a plain string (url) or an object { photoUrl }
      const url =
        typeof res.data === "string" ? res.data : res.data?.photoUrl ?? res.data?.url ?? "";
      if (url) setPhotoUrl(url);
    } catch (err:unknown) {
        const e=err as Error;
        console.error(e);
    }
  }

  return (
    <Link href={'/view-trip/'+ trip?.tripId} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center cursor-pointer text-center gap-4">
      <Image
        className="rounded-2xl object-cover w-full h-[200px]"
        src={photoUrl || '/download.jpeg'}
        alt={imgAlt??"Trip image is loading..."}
        width={400}
        height={400}
      />

      <h2 className="text-2xl text-primary flex flex-wrap justify-center items-center gap-2">
        <span>Your trip from</span>
        <strong className="flex items-center gap-3 font-semibold">
          {trip.tripDetail.origin} <ArrowBigRight /> {trip.tripDetail.destination}
        </strong>
      </h2>

      <h2 className="text-primary font-semibold text-xl">
        Number of days: {trip.tripDetail.duration}
      </h2>

      <h3 className="text-blue-500 font-medium">
        Budget type: {trip.tripDetail.budget}
      </h3>
    </Link>
  );
}

export default TripCard;
