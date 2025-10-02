import React from 'react'
export const SelectInterestOptions = [
  {
    id: 1,
    title: 'Adventure',
    desc: 'Thrilling experiences, hiking, outdoor activities',
    icon: '🏔️',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    title: 'Sightseeing',
    desc: 'Explore landmarks and attractions',
    icon: '📸',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 3,
    title: 'Cultural',
    desc: 'Museums, art, history, traditions',
    icon: '🏛️',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 4,
    title: 'Food',
    desc: 'Taste the local cuisine',
    icon: '🍜',
    color: 'bg-red-100 text-red-600',
  },
  {
    id: 5,
    title: 'Nightlife',
    desc: 'Bars, clubs, and evening fun',
    icon: '🌃',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    id: 6,
    title: 'Relaxation',
    desc: 'Chill, spa, beaches',
    icon: '🛀',
    color: 'bg-green-100 text-green-600',
  },
];
 type Props={
        onSelectedOption:(value:string)=>void
    }

function Interests({onSelectedOption}:Props) {
  return (
    <div className='grid grid-cols-2  md:grid-cols-3 gap-4  justify-center mt-1'>
        {SelectInterestOptions.map((option,index)=>(
            <button 
            key={index} 
            type="button"
            onClick={()=>onSelectedOption(option.title+":"+option.desc)}
            className='p-2border rounded-2xl bg-white text-black hover:bg-primary cursor-pointer text-center'
            >
            <div className='text-3xl rounded-full p-3'>{option.icon}</div>
            <h2 className='text-lg text-primary font-semibold mt-2 '>{option.title}</h2>
        
            </button>

        ))}
      
    </div>
  )
}

export default Interests
