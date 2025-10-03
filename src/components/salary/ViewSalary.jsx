import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/authContext';

export default function ViewSalary() {
    const { salaries, setSalaries } = useState(null);
    const { filteredSalaries, setFilteredSalaries } = useState(null);
    const { id } = useParams();
    let sno = 1;
    const { user } = useAuth();

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/salary/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                console.log(response.data.salary);
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.message)
            }
        }
    };
    if (!filteredSalaries) {
        alert(salaries)
    }
console.log(filteredSalaries)
    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
        const filterRecords = salaries.filter((leave) => leave.employeId.toLocaleLowerCase().includes(q.toLocaleLowerCase()));
        setFilteredSalaries(filterRecords)
    };

    return (
        <>
            {filteredSalaries === null ? (<div>Loading...</div>) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Salary History</h2>
                    </div>
                    <div className="flex justify-end my-3">
                        <input
                            type="text"
                            className="border px-2 rounded-md py-05 border-gray-300"
                            placeholder='Search by employe ID'
                            onChange={filterSalaries}
                        />
                    </div>

                    {filteredSalaries.lentgh > 0 ?(
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">S.NO:</th>
                                    <th className="px-6 py-3">Employe ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary) => (
                                    <tr key={salary.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-3">{sno++}</td>
                                        <td className="px-6 py-3">{salary.employeId.employeId}</td>
                                        <td className="px-6 py-3">{salary.basicSalary}</td>
                                        <td className="px-6 py-3">{salary.allowances}</td>
                                        <td className="px-6 py-3">{salary.deductions}</td>
                                        <td className="px-6 py-3">{salary.netSalary}</td>
                                        <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                                    </tr>
                                ))};
                            </tbody>
                        </table>
                    ) : (<div>No Records</div>)}
                </div>
            )}
        </>
    );
};

