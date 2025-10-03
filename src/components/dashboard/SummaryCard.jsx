import React from 'react'

export default function SummaryCard({icon, text, number, color}) {
  return (
    <div className='rounded flex bg-white'>
      <div className={`text-3xl flex justify-center items-center ${color} text-white px-4`}>
        {icon}
      </div>
      <div className="pl-4 pl-1">
        <p className='text-lg font-semibold'>{text}</p>
        <p className='text-xl font bold'>{number}</p>
      </div>
    </div>
  )
}
