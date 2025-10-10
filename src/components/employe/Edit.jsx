import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const [employe, setEmploye] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: 0,
        department: "",
    });
    const [departments, setDepartments] = useState(null)
    const Navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, []);

    useEffect(() => {
    const fatchEmploye = async () => {
      try {
        const response = await axios.get(`https://backend-site-mongo-db-atlast.vercel.app/api/employe/${id}`, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response.data.success) {
            const employe = response.data.employe;
            setEmploye((prev) => ({
                ...prev,
                name: employe.userId.name,
                maritalStatus: employe.maritalStatus,
                designation: employe.designation,
                salary: employe.salary,
                department: employe.department
            }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error)
        }
      }
    };
    fatchEmploye();
  },[id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setEmploye((prevData) => ({...prevData, [name] : value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`https://backend-site-mongo-db-atlast.vercel.app/api/employe/${id}`, employe, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, }, })
            if (response.data.success) {
                Navigate("/admin-dashboard/employes")
            };
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.response.data.error)
            }
        }
    }

  return (
    <>{departments && employe ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className="text-2xl font-bold mb-6">Edit Emoloye</h2>
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
                        value={employe.name}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        placeholder='Enter Name'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="maritalStatus" className='block text-sm font-medium text-gray-700'
                    >Married Status</label>
                    <select
                        name="maritalStatus"
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        onChange={handleChange}
                        value={employe.maritalStatus}
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
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        name='designation'
                        placeholder='Designation'
                        value={employe.designation}
                        required onChange={handleChange}
                    />
                </div>
                {/* Salary*/}
                <div className="">
                    <label
                        htmlFor="salary"
                        className="block text-sm font-medium text-gray-700"
                    >Salary</label>
                    <input
                        type="number"
                        value={employe.salary}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name='salary'
                        placeholder='Enter Salary'
                        required
                        onChange={handleChange}
                    />
                </div>
                {/* Department*/}
                <div className="col-span-2">
                    <label
                        htmlFor="department"
                        className='block text-sm font-medium text-gray-700'
                    >Department</label>
                    <select
                        name="department" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        onChange={handleChange}
                        value={employe.department}
                    >
                        <option value="">Select Department</option>
                          {departments.map(dep => (
                          <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                type='submit'
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >Edit Employe</button>
        </form>
    </div>
    ) : (<div>Loading...</div>) }</>
  )
}
