import React, { useState } from 'react'
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddLeave() {
    const { user } = useAuth();
    const Navigate = useNavigate();

    const [leave, setLeave] = useState({
        userId: user._id,
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevData) => ({...prevData, [name] : value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      try {
        const response = await axios.post(`http://localhost:5000/api/leave/add`,leave, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response.data.success) {
          Navigate(`/employe-dashboard/leaves/${user._id}`)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error)
        }
      }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md-shadow-md">
            <h2 className="text-2xl font-bold mb-6">Requiest for Leave</h2>
            <form onSubmit={handleSubmit} >
                <div className="flex flex-col space-y-4">
                    <div className="">
                        <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">Leave Type</label>
                        <select name="leaveType" id="leaveType" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" onChange={handleChange} required>
                            <option value="">Select Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* from data */}
                        <div className="">
                            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From Date</label>
                            <input type="date" id='fromDate' name='fromDate' className="mt-1 p-2 block w-full border border-gray-300 rounded-md" onChange={handleChange} required />
                        </div>
                        {/* to data */}
                        <div className="">
                            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To Date</label>
                            <input type="date" id='toDate' name='toDate' className="mt-1 p-2 block w-full border border-gray-300 rounded-md" onChange={handleChange} required />
                        </div>
                    </div>
                    {/* description */}
                    <div className="">
                        <label className='block text-sm font-medium text-gray-700' htmlFor="reason">Description</label>
                        <textarea name="reason" id="reason" placeholder='Reason' className="w-full border border-gray-300" onChange={handleChange}></textarea>
                    </div>
                </div>
                <button type='submit' className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md ">Add Salary</button>
            </form>
        </div>
    );
};
