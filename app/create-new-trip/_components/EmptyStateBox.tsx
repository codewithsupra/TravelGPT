import React from 'react'
import { Globe2, Plane, Landmark } from 'lucide-react'

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
]

function EmptyStateBox({onSelectOption}:{onSelectOption:(value:string)=>void}){
    
  return (
    <div className='mt-7 flex flex-col items-center justify-center text-center'>
      <div className='w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4'>
        <span className='text-3xl text-primary animate-pulse'>✈️</span>
      </div>
      <h2 className='text-xl font-bold text-gray-700'>
        Start planning new <span className='text-primary'>Trips</span> now
      </h2>
      <p className='text-gray-500 mt-2'>
        Ask our AI to help you create personalized travel itineraries easily!
      </p>

      {/* Suggestion List */}
      <div className="mt-6   flex flex-col justify-center gap-6">
        {suggestionList.map((l, index) => (
          <div
            key={index}
            onClick={()=>onSelectOption(l.title)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 shadow-sm cursor-pointer hover:bg-primary hover:text-white transition"
          >
            {l.icon}
            <span className="text-sm font-medium">{l.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmptyStateBox;
