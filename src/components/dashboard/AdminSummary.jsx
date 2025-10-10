import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'

export default function AdminSummary() {
const [summery, setSummery] = useState(null)

  useEffect(() => {
    const fetchSummery = async () => {
      try {
        const summery = await axios.get('https://backend-site-mongo-db-atlast.vercel.app/api/dashboard/summery', {
          headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummery(summery.data)
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error)
        }
        console.log(error.message)
    }
    }
    fetchSummery()
  }, [])

  if (!summery) {
    return <div>Loading...</div>
  }

  return (
    <div className='p-6 '>
      <h3 className='text-2xl font-hold'>Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 grap-4 mt-6">
        <SummaryCard icon={ <FaUsers/>} text="Total Employes" number={summery.totalEmployes} color="bg-teal-600" />
        <SummaryCard icon={ <FaBuilding/>} text="Total Departments" number={summery.totalDepartments} color= "bg-yellow-600" />
        <SummaryCard icon={ <FaMoneyBillWave/>} text="Monthly Salary" number={summery.totalSalary} color= "bg-red-600" />
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <SummaryCard icon={ <FaFileAlt/>} text="Leave Applied" number={summery.leaveSummery.appliedFor} color= "bg-teal-600" />
        <SummaryCard icon={ <FaCheckCircle/>} text="Leave Approved" number={summery.leaveSummery.approved} color= "bg-green-600" />
        <SummaryCard icon={ <FaHourglassHalf/>} text="Leave Pending" number={summery.leaveSummery.pending} color= "bg-yellow-600" />
        <SummaryCard icon={ <FaTimesCircle/>} text="Leave Rejected" number={summery.leaveSummery.rejected} color= "bg-red-600" />
        </div>
      </div>
    </div>
  )
}
