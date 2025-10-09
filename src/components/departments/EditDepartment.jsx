import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export default function EditDepartment() {
    const { id } = useParams()
    const [department, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(false)
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response.data.success) {
          setDepartment(response.data.department)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error)
        }
      } finally {
        setDepLoading(false)
      }
    };
    fetchDepartments();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({...department, [name] : value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
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
    <>{depLoading ? <div>Loading...</div> :
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
        <h2 className='text-2xl font-bold mb-6'>EditDepartment</h2>
        <form onSubmit={handleSubmit}>
            <div className="">
                <label className='text-sm font-medium text-gray-700' htmlFor="de_name">Department Name</label>
              <input
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                type="text"
                name='dep_name'
                value={department.dep_name}
                placeholder='Enter Department Name'
                onChange={handleChange}
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
                value={department.description}
                onChange={handleChange}
                rows={4}
              ></textarea>
            </div>
            <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Edit Department</button>
        </form>
        </div>
    }</>
  )
}
