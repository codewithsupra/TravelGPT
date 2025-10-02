"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Star, Wallet } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Hotel } from "./Chatbox"; // adjust path to your types

type Props = {
  hotel: Hotel;
};

export default function HotelCardItem({ hotel }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    if (hotel?.hotel_name) {
      getDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel]);

  async function getDetails() {
    try {
      const res = await axios.post("/api/google-place-detail", { placeName: hotel.hotel_name });
      // accept either a plain string (url) or an object { photoUrl }
      const url =
        typeof res.data === "string" ? res.data : res.data?.photoUrl ?? res.data?.url ?? "";
      if (url) setPhotoUrl(url);
    } catch (err:unknown) {
        const e=err as Error;
        console.error(e);
    }
  }

  const mapsQuery = encodeURIComponent(`${hotel.hotel_name} ${hotel.hotel_address ?? ""}`);

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative w-full h-52 md:h-44 lg:h-48 bg-gray-100">
        <Image
          src={photoUrl || "/download.jpeg"}
          alt={hotel.hotel_name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-gray-800">{hotel.rating?.toFixed?.(1) ?? hotel.rating}</span>
        </div>

        {/* Price badge */}
        <div className="absolute top-3 right-3 inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
          <Wallet className="w-4 h-4" />
          <span>{hotel.price_per_night}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{hotel.hotel_name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{hotel.hotel_address}</p>

        <p className="text-sm text-gray-700 line-clamp-2">{hotel.description}</p>

        <div className="mt-2 flex gap-2">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              variant="outline"
              className="w-full justify-center cursor-pointer rounded-xl bg-gray-50 hover:bg-orange-400 text-black transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="ml-2">View on map</span>
            </Button>
          </Link>

          {/* If you want a second CTA later, this is a placeholder - kept small per your request */}
          
        </div>
      </div>
    </article>
  );
}
