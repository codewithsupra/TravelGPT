
"use client"
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Button } from "@/components/ui/button";
import { Send, Globe2, Plane, Landmark, ArrowBigDown } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";

export const suggestionList = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
  {
    title: "Book a Flight",
    icon: <Plane className="text-blue-400 h-5 w-5" />,
  },
  {
    title: "Find Landmarks",
    icon: <Landmark className="text-blue-400 h-5 w-5" />,
  },
  {
    title: "Explore Globally",
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
];

function Hero() {
    const {user}=useUser();
    const router=useRouter();
    function onSend(){
        if(!user){
            router.push('/sign-in');
            return;
    }else{
        //user exists
        router.push("/create-new-trip")
    }
}
  return (
    <section className="mt-24 flex justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-6">
        <h2 className="text-2xl md:text-5xl font-bold">
          Hey, I am  your personal{" "}
          <span className="text-primary">Trip Planner</span>
        </h2>
        <p className="text-lg md:text-2xl text-muted-foreground">
          Tell me what you want and watch your dream itinerary unfold in
          seconds.
        </p>

        {/* Input Box with send button inside */}
        <div className="mt-6 relative">
          <Textarea
            rows={4}
            placeholder="Explore Amsterdam and its hidden treasures..."
            className="w-full resize-none rounded-xl border border-gray-300 bg-white/80 p-4 pr-16 text-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary transition"
          />

          {/* Absolute-positioned circular icon button */}
          <Button
          onClick={()=>onSend()}
            size="icon"
            aria-label="Send prompt"
            className="absolute right-3 bottom-3 inline-flex items-center justify-center rounded-full bg-primary text-white hover:opacity-95 p-2 shadow"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestion List (side by side) */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {suggestionList.map((l, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 shadow-sm cursor-pointer hover:bg-primary  transition"
            >
              {l.icon}
              <span className="text-sm font-medium">{l.title}</span>
            </div>
          ))}
        </div>
        <h2 className="flex  mx-14 my-7 justify-center gap-2"> Not sure where to start? Watch a <strong>live demo below!</strong><ArrowBigDown /></h2>
        {/* video dialog */}
        <div className="mt-6 flex justify-center">

        <HeroVideoDialog
  className="w-full max-w-xl rounded-lg  block dark:hidden "
  animationStyle="from-center"
  videoSrc="https://www.example.com/dummy-video"
  thumbnailSrc="https://media.istockphoto.com/id/1473860079/video/amsterdam-keizersgracht-canal-at-dusk.jpg?s=640x640&k=20&c=XRSdvVcaZjxOIrkSjAAiEGz6PYmV_S5i5M5Eo3tIXE0="
  thumbnailAlt="Dummy Video Thumbnail"
/>
</div>

      </div>
    </section>
  );
}

export default Hero;
