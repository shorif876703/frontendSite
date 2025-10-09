import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployes } from '../../utils/EmployeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddSalary() {
    const [salary, setSalary] = useState(null);
    const [departments, setDepartments] = useState(null)
    const [employes, setEmployes] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, []);

    const handleDepartment = async (e) => {
        const emps = await getEmployes(e.target.value)
        setEmployes(emps)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({...prevData, [name] : value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://employe-backend.vercel.app/api/salary/add', salary, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
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
    <>{departments ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Department*/}
                <div>
                    <label
                        htmlFor="department"
                        className='block text-sm font-medium text-gray-700'
                    >Department</label>
                    <select
                        name="department" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        onChange={handleDepartment}
                    >
                        <option value="">Select Department</option>
                          {departments.map(dep => (
                          <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>

                {/* Employe*/}
                <div>
                    <label
                        htmlFor="employeId"
                        className='block text-sm font-medium text-gray-700'
                    >Employe</label>
                    <select
                        name="employeId"
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        onChange={handleChange}
                    >
                        <option value="">Select Employe</option>
                          {employes.map(emp => (
                          <option key={emp._id} value={emp._id}>{emp.employeId}</option>
                        ))}
                    </select>
                </div>

                <div className="">
                    <label
                        htmlFor="basicSalary" className="block text-sm font-medium text-gray-700"
                    >Basic Salary</label>
                    <input
                        type="number"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        name='basicSalary'
                        placeholder='Basic Salary'
                        required onChange={handleChange}
                    />
                </div>
                {/* Salary*/}
                <div className="">
                    <label
                        htmlFor="allowances"
                        className="block text-sm font-medium text-gray-700"
                    >Allowances</label>
                    <input
                        type="number"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name='allowances'
                        placeholder='Enter Allowances'
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="">
                    <label
                        htmlFor="deductions"
                        className="block text-sm font-medium text-gray-700"
                    >Deductions</label>
                    <input
                        type="number"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name='deductions'
                        placeholder='Enter Deductions'
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="">
                    <label
                        htmlFor="payDate"
                        className="block text-sm font-medium text-gray-700"
                    >Pay Date</label>
                    <input
                        type="date"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name='payDate'
                        required
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button
                type='submit'
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >Add Salary</button>
        </form>
    </div>
    ) : (<div>Loading...</div>) }</>
  )
}
