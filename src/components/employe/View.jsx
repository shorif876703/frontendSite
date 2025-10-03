import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function View() {
    const {id} = useParams()
    const [employe, setEploye] = useState(null)

    useEffect(() => {
    const fetchEmploye = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employe/${id}`, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response.data.success) {
          setEploye(response.data.employe)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error)
        }
      }
    };
    fetchEmploye();
    }, [])

    return (
    <>{employe ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className="text-2xl font-bold mb-8 text-center">Employe Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <img src={`http://localhost:5000/${employe.userId.profileImage}`} className='rounded-full border w-72' />
            </div>
            <div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Name:</p>
                    <p className="font-medium">{employe.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Employe ID:</p>
                    <p className="font-medium">{employe.employeId}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Date of Birth:</p>
                    <p className="font-medium">{new Date(employe.dob).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Gender:</p>
                    <p className="font-medium">{employe.gender}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Department:</p>
                    <p className="font-medium">{employe.department.dep_name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Marital Status:</p>
                    <p className="font-medium">{employe.maritalStatus}</p>
                </div>
            </div>
        </div>
    </div>
    ): <div>Loading...</div>}</>
  )
}
