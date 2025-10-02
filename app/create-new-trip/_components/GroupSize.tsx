export const SelectTravelesList = [

    {

        id: 1,

        title: 'Just Me',

        desc: 'A sole traveles in exploration',

        icon: '✈️',

        people: '1'

    },

    {

        id: 2,

        title: 'A Couple',

        desc: 'Two traveles in tandem',

        icon: '🥂',

        people: '2 People'

    },

    {

        id: 3,

        title: 'Family',

        desc: 'A group of fun loving adv',

        icon: '🏡',

        people: '3 to 5 People'

    },

    {

        id: 4,

        title: 'Friends',

        desc: 'A bunch of thrill-seekes',

        icon: '⛵',

        people: '5 to 10 People'

    },

]


import React from 'react'
type Props={
    onSelectedOption:(value:string)=>void;
}

function GroupSize({onSelectedOption}:Props) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 justify-center mt-1'>
        {SelectTravelesList.map((list,index)=>(
            <div key={index}
             onClick={()=>onSelectedOption(list.title+":"+list.people) }
             className='p-3 border rounded-2xl bg-white text-black hover:bg-primary cursor-pointer'>
                <h2>{list.icon}</h2>
                <h2>{list.title}</h2>


            </div>

        ))}
      
    </div>
  )
}

export default GroupSize;
