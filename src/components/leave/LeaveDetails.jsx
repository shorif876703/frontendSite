import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function LeaveDetails() {
    const {id} = useParams()
    const [leave, setLeave] = useState(null)
    const Navigate = useNavigate();

    useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://backend-site-mongo-db-atlast.vercel.app/api/leave/detail/${id}`, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response.data.success) {
          setLeave(response.data.leave)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error)
        }
      }
    };
    fetchLeave();
    }, [])

  const changeStatus = async (id, status) => {
    console.log(status)
        try {
        const response = await axios.put(`https://backend-site-mongo-db-atlast.vercel.app/api/leave/${id}`, {status}, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response.data.success) {
          Navigate('/admin-dashboard/leaves')
        }
        } catch (error) {
          console.log(error.response)
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error)
        }
      }
  }

    return (
    <>{leave ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <img src={`https://backend-site-mongo-db-atlast.vercel.app/${leave.employeId.userId.profileImage}`} className='rounded-full border w-72' />
            </div>
            <div>
                <div className="flex space-x-3 mb-3">
                    <p className="text-lg font-bold">Name:</p>
                    <p className="font-medium">{leave.employeId.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-3">
                    <p className="text-lg font-bold">Employe ID:</p>
                    <p className="font-medium">{leave.employeId.employeId}</p>
                </div>
                <div className="flex space-x-3 mb-3">
                    <p className="text-lg font-bold">Leave Type:</p>
                    <p className="font-medium">{leave.leaveType}</p>
                </div>
                <div className="flex space-x-3 mb-3">
                    <p className="text-lg font-bold">Reason:</p>
                    <p className="font-medium">{leave.reason}</p>
                </div>
                <div className="flex space-x-3 mb-3">
                    <p className="text-lg font-bold">Department:</p>
                    <p className="font-medium">{leave.employeId.department.dep_name}</p>
                </div>
                <div className="flex space-x-3 mb-3">
                    <p className="text-lg font-bold">Start Date:</p>
                    <p className="font-medium">{new Date(leave.fromDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-3">
                    <p className="text-lg font-bold">End Date:</p>
                    <p className="font-medium">{new Date(leave.toDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-3">
                    <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action:" : "Status:"}</p>
                {leave.status === "Pending" ? (
                  <div className='flex space-x-2'>
                    <button className='px-2 py-0.5 bg-teal-300 hover:bg-teal-400 duration-200 rounded' onClick={() => changeStatus(leave._id, "Approved")}>Approve</button>
                    <button className='px-2 py-0.5 bg-red-300 hover:bg-red-400 duration-200 rounded' onClick={() => changeStatus(leave._id, "Rejected")}>Reject</button>
                  </div>
                ) : (
                  <p className="font-medium">{leave.status}</p>
                )}
                </div>
            </div>
        </div>
    </div>
    ): <div>Loading...</div>}</>
  )
}
