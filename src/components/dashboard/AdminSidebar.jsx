import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt,  FaMoneyBillWave, FaCogs } from 'react-icons/fa'

export default function AdminSidebar() {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className='text-2xl text-center font-sans-pacific'>Employe MS</h3>
      </div>
      <div className="px-4">
              <NavLink className={({isActive}) => `${isActive ? "bg-teal-400" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} to="/admin-dashboard" end>
                <FaTachometerAlt /><span>Dashboard</span>
              </NavLink>
              <NavLink className={({isActive}) => `${isActive ? "bg-teal-400" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} to="/admin-dashboard/employes">
                <FaUsers /><span>Employ</span>
              </NavLink>
              <NavLink className={({isActive}) => `${isActive ? "bg-teal-400" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} to="/admin-dashboard/departments">
                <FaBuilding /><span>Department</span>
              </NavLink>
              <NavLink className={({isActive}) => `${isActive ? "bg-teal-400" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} to="/admin-dashboard/leaves">
                <FaCalendarAlt /><span>Leave</span>
              </NavLink>
              <NavLink className={({isActive}) => `${isActive ? "bg-teal-400" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} to="/admin-dashboard/salary/add">
                <FaMoneyBillWave /><span>Salary</span>
              </NavLink>
              <NavLink className={({isActive}) => `${isActive ? "bg-teal-400" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} to="/admin-dashboard/settings">
                <FaCogs /><span>Settings</span>
              </NavLink>
      </div>
    </div>
  )
}
