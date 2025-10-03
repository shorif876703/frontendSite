import React from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from "../components/dashboard/Navbar"
import { Outlet } from 'react-router-dom'

export default function AdminDashboard() {

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet/>
      </div>
    </div>
  )
}
