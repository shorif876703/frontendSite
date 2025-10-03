import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
;

export default function LeaveList() {
    const [leaves, setLeaves] = useState([])
    let sno = 1;
    const { id } = useParams();

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                setLeaves(response.data.leaves)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.message)
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

  return (
    // <>{empLoading ? <div>Loading...</div> :
    <div className='p-6'>
        <div className="text-center">
          <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className="flex justify-between items-center">
        <input
          className='px-4 py-0.5 bg-red-100 border'
          type="text"
          placeholder='Search by department name'
        //   onChange={handleFilter}
        />
        <Link
          to="/employe-dashboard/add-leave"
          className='px-4 py-1 bg-teal-600 rounded text-white'
        >Add New Leave</Link>
      </div>
        <table className="mt-5 w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-3 border-gray-300">
                <tr>
                    <th className="px-6 py-3">S.NO:</th>
                    <th className="px-6 py-3">Leave Type</th>
                    <th className="px-6 py-3">From</th>
                    <th className="px-6 py-3">To</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                {leaves.map((leave) => (
                    <tr key={leave._id} className="bg-white border-b dark:border-gray-300">
                        <td className="px-6 py-3">{sno++}</td>
                        <td className="px-6 py-3">{leave.leaveType}</td>
                        <td className="px-6 py-3">{new Date(leave.fromDate).toLocaleDateString()}</td>
                        <td className="px-6 py-3">{new Date(leave.toDate).toLocaleDateString()}</td>
                        <td className="px-6 py-3">{leave.reason}</td>
                        <td className="px-6 py-3">{leave.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    // }</>
  )
}
