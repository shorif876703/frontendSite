import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Add() {

    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({})
    const Navigate = useNavigate()

    useEffect(() => {
        const getDepartments = async () => {
        const departments = await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments()
    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "image") {
            setFormData((prevData) => ({...prevData, [name] : files[0]}))
        } else {
            setFormData((prevData) => ({...prevData, [name] : value}))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })
        try {
            const response = await axios.post("http://localhost:5000/api/employe/add", formDataObj, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            if (response.data.success) {
                Navigate("/admin-dashboard/employes")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.response.data.error)
            }
        }
    }

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className="text-2xl font-bold mb-6">Add New Emoloye</h2>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/*name*/}
                <div className="">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >Name</label>
                    <input
                        type="text"
                        name='name'
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        placeholder='Enter Name'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >Email</label>
                    <input
                        type="email"
                        name='email'
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        placeholder='Enter Email'
                        required onChange={handleChange}
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="employeId"
                        className="block text-sm font-medium text-gray-700"
                    >Employe ID</label>
                    <input
                        type="text" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        name='employeId'
                        placeholder='Enter Employe ID' required
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700"
                    >Date of Birth</label>
                    <input
                        type="date"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name='dob'
                        placeholder='Enter DOB'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                    >Gender</label>
                    <select
                        name="gender" id="gender" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="">
                    <label
                        htmlFor="maritalStatus" className='block text-sm font-medium text-gray-700'
                    >Married Status</label>
                    <select
                        name="maritalStatus" id="maritalStatus"
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        onChange={handleChange}
                    >
                        <option value="">Select Status</option>
                        <option value="married">Married</option>
                        <option value="unmarried">Un Married</option>
                    </select>
                </div>
                <div className="">
                    <label
                        htmlFor="designation" className="block text-sm font-medium text-gray-700"
                    >Designation</label>
                    <input
                        type="text"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name='designation' placeholder='Designation'
                        required onChange={handleChange}
                    />
                </div>
                {/* Department*/}
                <div className="">
                    <label
                        htmlFor="department"
                        className='block text-sm font-medium text-gray-700'
                    >Department</label>
                    <select
                        name="department" id="department" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        onChange={handleChange}
                    >
                        <option value="">Select Department</option>
                          {departments.map(dep => (
                          <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>
                {/* Salary*/}
                <div className="">
                    <label
                        htmlFor="salary"
                        className="block text-sm font-medium text-gray-700"
                    >Salary</label>
                    <input
                        type="number"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name='salary'
                        placeholder='Enter Salary'
                        required
                        onChange={handleChange}
                    />
                </div>
                {/* Password */}
                <div className="">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >Password</label>
                    <input
                        type="password"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name='password'
                        placeholder='Enter Password'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="role"
                        className='block text-sm font-medium text-gray-700'
                    >Role</label>
                    <select
                        name="role"
                        id="role"
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        onChange={handleChange}
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employe">Employe</option>
                    </select>
                </div>
                {/* Image Upload*/}
                <div className="">
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                    >Upload Image</label>
                    <input
                        type="file"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md cursor-pointer"
                        name='image'
                        accept='image/'
                        required
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button
                type='submit'
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >Add Employe</button>
        </form>
    </div>
  )
}
