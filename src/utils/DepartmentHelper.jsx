import { useNavigate } from "react-router-dom"
import axios from "axios"

const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
    const Navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?")
        if (confirm) {
            try {
                const response = await axios.delete(`https://backend-site-mongo-db-atlast.vercel.app/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                if (response.data.success) {
                    onDepartmentDelete()
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            }
        }
    }
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => Navigate(`/admin-dashboard/department/${Id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white" onClick={() => handleDelete(Id)}>Delete</button>
        </div>
    )
};

export {columns, DepartmentButtons}