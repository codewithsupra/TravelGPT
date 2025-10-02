import React from 'react'
import { Button } from '@/components/ui/button'
import { Globe2 } from 'lucide-react'
type Props={
    viewTrip:()=>void,
    disable:boolean
}

function FinalUI({viewTrip,disable}:Props) {
  return (
    <div className='flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl'>
        <Globe2 className='text-primary text-4xl animate-bounce'/>
        <h2 className='mt-3 text-lg font-semibold text-primary'>
            Planning your trip
        </h2>
        <p className='text-gray-500 text-sm text-center mt-1'>
            Gathering <strong className='text-black'>best destinations,activites and details</strong> for you.
        </p>
        <Button disabled={disable} className='mt-5'  onClick={viewTrip}>View Trip</Button>
      
    </div>
  )
}

export default FinalUI
;