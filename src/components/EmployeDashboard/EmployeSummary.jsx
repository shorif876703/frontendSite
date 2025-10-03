import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

export default function EmployeSummary() {
    const { user } = useAuth();
  return (
    <div className="p-6">
      <div className='rounded flex bg-white'>
        <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4`}>
          <FaUser/>
        </div>
        <div className="pl-4 pl-1">
          <p className='text-lg font-semibold'>Wellconme Back</p>
          <p className='text-xl font bold'>{user.name}</p>
        </div>
      </div>
    </div>
  )
}
