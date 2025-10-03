import React from 'react'
import EmployeSidebar from '../components/EmployeDashboard/EmployeSidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'

export default function EmployeDashboard() {
  return (
    <div className='flex'>
      <EmployeSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet/>
      </div>
    </div>
  )
}
