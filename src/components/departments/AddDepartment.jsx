import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddDepartment() {
    const [department, setDepartment] = useState({
        dep_name: "",
        description: ""
    })

    const Navigate = useNavigate()

    const handlechange = (e) => {
        const { name, value } = e.target;
        setDepartment({...department, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("https://employe-backend.vercel.app/api/department/add", department, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            if (response.data.success) {
                Navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.response.data.error)
            }
        }
    }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
    <h3 className='text-2xl font-bold mb-6'>Add Department</h3>
    <form onSubmit={handleSubmit}>
        <div className="">
            <label className='text-sm font-medium text-gray-700' htmlFor="de_name">Department Name</label>
            <input
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                type="text"
                name='dep_name'
                placeholder='Enter Department Name'
                onChange={handlechange}
                required
            />
        </div>
        <div className="">
            <label className='block text-sm font-medium text-gray-700' htmlFor="description">Description</label>
            <textarea
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                name="description"
                id="description"
                placeholder='Description'
                onChange={handlechange}
                rows={4}
            ></textarea>
        </div>
        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Add Department</button>
    </form>
    </div>
  )
}
