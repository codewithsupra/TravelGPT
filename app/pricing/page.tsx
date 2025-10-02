import React from 'react'
import { PricingTable } from '@clerk/nextjs'
import { MapPlusIcon } from 'lucide-react'

function page() {
  return (
    <div className='m-20 space-y-10 '>
        <h2 className='flex items-center gap-2 justify-center font-extrabold text-4xl text-primary'><MapPlusIcon />AI Powered Trip</h2>
        <div style={{ maxWidth: '400px', maxHeight:'auto', margin: '0 auto', padding: '0 1rem' }}>
      <PricingTable />
    </div>
      
    </div>
  )
}

export default page
