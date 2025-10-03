import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "80px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "200px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "100px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "150px"
    },
    {
        name: "Date of birth",
        selector: (row) => row.dob,
        width: "130px",
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true"
    },
]

export const fetchDepartments = async () => {
    let departments;
    try {
    const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`,
        },
    })
    if (response.data.success) {
        departments = response.data.departments
    }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            console.log(error.response.data.error)
        }
    }
    return departments
};

// employes for salary form

export const getEmployes = async (id) => {
    let employes;
    try {
        const response = await axios.get(`http://localhost:5000/api/employe/department/${id}`, {
            headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (response.data.success) {
            employes = response.data.employes
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            console.log(error.response.data.error)
        }
    }
    return employes;
};


export const EmployeButtons = ({ Id}) => {
    const Navigate = useNavigate()

    return (
        <div className="flex space-x-3">
            <button
                className="px-5 py-2 bg-teal-600 text-white rounded"
                onClick={() => Navigate(`/admin-dashboard/employes/${Id}`)}
            >View</button>
            <button
                className="px-5 py-2 bg-blue-600 text-white rounded"
                onClick={() => Navigate(`/admin-dashboard/employes/edit/${Id}`)}
            >Edit</button>
            <button
                className="px-5 py-2 bg-yellow-600 text-white rounded"
                onClick={() => Navigate(`/admin-dashboard/employes/salary/${Id}`)}
            >Salary</button>
            <button
                className="px-5 py-2 bg-red-600 text-white rounded"
                 onClick={() => Navigate(`/admin-dashboard/employes/leaves/${Id}`)}
            >Leave</button>
        </div>
    )
}