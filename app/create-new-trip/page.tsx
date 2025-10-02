"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Chatbox from './_components/Chatbox';
import Itinerary from './_components/Itinerary';
import { useTripDetails } from '../provider';
import GlobalMap from './_components/GlobalMap';
import { Globe2, Plane } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function CreateNewTrip() {
  const { setTripDetailInfo } = useTripDetails();
  const [activeIndex, setActiveIndex] = useState<number>(1);

  useEffect(() => {
    setTripDetailInfo(null);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-10">
      <div>
        <Chatbox />
      </div>

      <div className="col-span-3 relative">
        {activeIndex === 0 ? <Itinerary /> : <GlobalMap />}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
              size="lg"
              className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black text-white"
            >
              {activeIndex === 0 ? (
                <div className="flex gap-2 items-center">
                  <span>View World Map</span>
                  <Globe2 />
                </div>
              ) : (
                <Plane />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{activeIndex === 0 ? "Switch to World Map" : "Back to Itinerary"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default CreateNewTrip;
