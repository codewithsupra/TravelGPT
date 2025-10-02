import React, { useState } from 'react'
type Props={
    onSelectedOption:(value:string)=>void;
}

function TripDuration({onSelectedOption}:Props) {
    const presets=[1,2,3,5,10,15];
    const[custom,setCustom]=useState<number|"">("");
  return (
    <div className='mt-2'>

      <div className='grid grid-cols-4 gap-2'>
        {
            presets.map((val,index)=>(
                <button 
                key={index}
                type="button"
                onClick={()=>onSelectedOption(String(val))}
                className='p-3 border rounded-2xl bg-white text-black hover:bg-primary cursor-pointer text-center'
                >
                    <div className='text-lg font-semibold'>{val}</div>
                    <div className='text-sm text-gray-500'>days</div>
                </button>
            ))
        }

      </div>
      <div className='mt-3 flex gap-2 items-center '>
        <input 
        type="number" 
        min={1}
        value={custom}
        onChange={(e)=>setCustom(e.target.value?Number(e.target.value):"")}
        placeholder="No. of days"
        className='w-1/2 p-2 rounded-lg border'
        />
        <button 
        type="button"
        onClick={()=>{
            if(! custom || Number(custom)<1) return;
            onSelectedOption(String(custom));
        }}
        className='px-4 py-2 rounded-lg bg-primary text-white'
         >Set</button>

      </div>
    </div>
  )
}

export default TripDuration;
