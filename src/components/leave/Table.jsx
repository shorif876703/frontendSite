import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utils/leaveHelper';

export default function Table() {
  const [leaves, setLeaves] = useState(null)
  const [filteredLeaves, setFilteredLeaves] = useState(null)

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("https://employe-backend.vercel.app/api/leave", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      })


      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => (
          {
            _id: leave._id,
            sno: sno++,
            employeId: leave.employeId.employeId,
            name: leave.employeId.userId.name,
            leaveType: leave.leaveType,
            department: leave.employeId.department.dep_name,
            days: new Date(leave.toDate).getDate() - new Date(leave.fromDate).getDate(),
            status: leave.status,
            action: (<LeaveButtons Id={leave._id} />),
          }
        ))
        setLeaves(data)
        setFilteredLeaves(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error)
      }
    }
  }

  useEffect(() => {
    fetchLeaves();
  }, [])
  const filterByInput = (e) => {
    const data = leaves.filter(leave => leave.employeId.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredLeaves(data);
  }
  const filterByButton = (status) => {
    const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()))
    setFilteredLeaves(data);
  }

  const refreshWindow = () => {
    window.location.reload();
  }

  return (
    <>
      {filteredLeaves ? (
      <div className='p-6'>
        <div className="text-center">
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
          <input
            className='px-4 py-0.5 bg-red-100 border'
            type="text"
            placeholder='Search by Employe ID'
            onChange={filterByInput}
          />
          <div className="space-x-3">
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded' onClick={refreshWindow}>Refresh</button>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded' onClick={() => filterByButton("Pending")}>Pending</button>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded' onClick={() => filterByButton("Approved")}>Approved</button>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded' onClick={() => filterByButton("Rejected")}>Rejected</button>
          </div>
          </div>
          <div className="mt-3"><DataTable columns={columns} data={filteredLeaves}/></div>
        </div>
      ) : <div>Loading...</div>}
    </>
  )
}
