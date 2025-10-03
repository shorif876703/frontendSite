import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Navbar() {
    const { user, logout } = useAuth()
  return (
    <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
          <p>Welcome {user.name}</p>
          <button onClick={logout} className='px-4 py-1 bg-teal-700 hover:bg-teal-800' >Log Out</button>
    </div>
  )
}
