import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { columns, EmployeButtons } from '../../utils/EmployeHelper';
import DataTable from 'react-data-table-component';
// import { useAuth } from '../../context/authContext';

export default function List() {
  const [employes, setEmployes] = useState([]);
  const [empLoading, setEmpLoading] = useState(false)
  // const { user } = useAuth()

  useEffect(() => {
    const fetchEployes = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get("https://employe-backend.vercel.app/api/employe", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`,
          },
        })

        const imgStyle = {
          width: '50px',
          height: '50px',
        }
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employes.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img style={imgStyle} className='rounded-full' src={`https://employe-backend.vercel.app/${emp.userId.profileImage}` } />,
              action: (<EmployeButtons Id={emp._id} />),
            }
          ))
          setEmployes(data)
          setFilteredEmploye(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error)
        }
      } finally {
        setEmpLoading(false)
      }
    };
    fetchEployes();
  }, [])
    const [filteredEmploye, setFilteredEmploye] = useState([]);

    const handleFilter = (e) => {
    const records = employes.filter((emp) => emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredEmploye(records)
  }

  // const filterPosition = (role) => {
  //   if (user.role == "admin") {
  //   const records = user.filter((emp) => emp.role.toLowerCase().includes(role.toLowerCase()))
  //   setFilteredEmploye(records)
  //   }
// }

  return (
    <>{empLoading ? <div>Loading...</div> :
    <div className='p-6'>
        <div className="text-center">
          <h3 className='text-2xl font-bold'>Manage Employe</h3>
        </div>
        <div className="flex justify-between items-center">
        <input
          className='px-4 py-0.5 bg-red-100 border'
          type="text"
          placeholder='Search by department name'
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employe"
          className='px-4 py-1 bg-teal-600 rounded text-white'
        >Add New Employe</Link>
        </div>
        <button className='px-4 py-1 bg-teal-600 rounded text-white mt-6 mb-6' onClick={() =>filterPosition("admin")}>Admin</button>
        <button className='px-4 py-1 bg-teal-600 rounded text-white m-6'onClick={() => filterPosition("employe")}>Employe</button>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredEmploye}/>
      </div>
    </div>
    }</>
  )
}
