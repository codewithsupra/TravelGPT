
export const SelectSpecialRequirementOptions = [
  {
    id: 1,
    title: 'Dietary Needs',
    desc: 'Vegetarian, Vegan, Halal, Gluten-free, etc.',
    icon: '🥗',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 2,
    title: 'Accessibility',
    desc: 'Wheelchair access, reduced mobility support',
    icon: '♿',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 3,
    title: 'Specific Activities',
    desc: 'Theme parks, shopping, hiking, etc.',
    icon: '🎢',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 4,
    title: 'Other',
    desc: 'Anything else you want us to know',
    icon: '✍️',
    color: 'bg-gray-100 text-gray-600',
  },
];


import React from 'react'


type Props = {
  onSelectedOption: (value: string) => void
}

function SpecialRequirements({ onSelectedOption }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 justify-center mt-1">
      {SelectSpecialRequirementOptions.map((list, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelectedOption(list.title + ":"+list.desc)}
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

export default SpecialRequirements

