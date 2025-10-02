"use client"
import { FrownIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserDetails } from '../provider';
import { TripInfo } from '../create-new-trip/_components/Chatbox';
import TripCard from './_components/TripCard';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Trip = {
  tripId: any;
  tripDetail: TripInfo;
  _id: string;
}

function MyTrips() {
  const [myTrips, setMyTrips] = useState<Trip[]>([]);
  const { userDetails } = useUserDetails();
  const [loading,setLoading]=useState<boolean>(true);
  const convex = useConvex();

  useEffect(() => {
    if (userDetails) {
      fetchTrips();
    }
  }, [userDetails]);

  async function fetchTrips() {
    setLoading(true);
    const result = await convex.query(api.tripDetail.getUserTrips, {
      uid: userDetails._id,
    });
    console.log("fetched trips count", result.length);
    setMyTrips(result);
    setLoading(false);
  }

  return (
    <div className="px-10 p-10 space-y-6 md:px-24 lg:px-48">
      <h2 className="text-xl font-bold text-center">My Trips</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading trips...</p>
      ) : myTrips.length === 0 ? (
        <div className="p-7 border rounded-3xl space-y-4 flex flex-col justify-center items-center text-center">
          <h2 className="flex items-center gap-2 text-lg font-medium">
            You don’t have any trips right now <FrownIcon />
          </h2>
          <Link href="/create-new-trip">
            <Button className="hover:bg-primary text-lg cursor-pointer">
              Create new trip
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myTrips.map((trip, index) => (
            <TripCard key={index} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
