
export const SelectBudgetOptions = [



    {

        id: 1,

        title: 'Cheap',

        desc: 'Stay conscious of costs',

        icon: '💵',

        color: 'bg-green-100 text-green-600'

    },

    {

        id: 2,

        title: 'Moderate',

        desc: 'Keep cost on the average side',

        icon: '💰',

        color: 'bg-yellow-100 text-yellow-600'

    },

    {

        id: 3,

        title: 'Luxury',

        desc: 'Don’t worry about cost',

        icon: '💸',

        color: 'bg-purple-100 text-purple-600'

    },

]
import React from "react"
type Props={
    onSelectedOption:(value:string)=>void
}


function Budget({onSelectedOption}:Props) {
  return (
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 justify-center mt-1">
      {SelectBudgetOptions.map((list, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelectedOption(`${list.title}:${list.desc}`)}
          className="p-3 border rounded-2xl bg-white text-black hover:bg-primary cursor-pointer text-left"
        >
          <div className="text-3xl rounded-full p-3">{list.icon}</div>
          <h2 className="text-lg font-semibold mt-2">{list.title}</h2>
          <p className="text-sm text-gray-500">{list.desc}</p>
        </button>
      ))}
    </div>
  )
}

export default Budget
