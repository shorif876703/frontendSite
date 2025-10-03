import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
// import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Setting() {
  // let oldPass = document.getElementById('oldPassword')
  // let newPass = document.getElementById('newPassword')
  // let confirmPass = document.getElementById('confirmPassword')
  // const [show, setShow] = useState(true)

  // const showPassword = (pass) => {
  //   if (show) {
  //     pass.type = "text"
  //     setShow(false)
  //   } else {
  //     setShow(true)
  //     pass.type = "password"
  //   }
  // }
  // const showPassword2 = () => {
  //   if (show) {
  //     newPass.type = "text"
  //     setShow(false)
  //   } else {
  //     setShow(true)
  //     newPass.type = "password"
  //   }
  // }
  // const showPassword3 = () => {
  //   if (show) {
  //     confirmPass.type = "text"
  //     setShow(false)
  //   } else {
  //     setShow(true)
  //     confirmPass.type = "password"
  //   }
  // }

  const Navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",

  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not match");
    } else {
      try {
        const response = await axios.put(`http://localhost:5000/api/setting/change-password`, setting, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response.data.success) {
          Navigate('/admin-dashboard/employes')
          setError("")
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error)
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        {/* Department Name */}
        <div className="">
          <label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">Old Password</label>
          <input type="password" name='oldPassword' id='oldPassword' placeholder='Old Password' onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required/>
          {/* <p onClick={() => showPassword(oldPass)} className="ml-[-4vh] mt-[.7vh] inline-block  p-1 absolute text-xl cursor-pointer hover:text-[red] duration-300">{show ? <FaEyeSlash/> : <FaEye/> }</p> */}

        </div>
        <div className="">
          <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">New Password</label>
          <input type="password" name='newPassword' id='newPassword' placeholder='New Password' onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required/>
          {/* <p onClick={() => showPassword(newPass)} className="ml-[-4vh] mt-[.7vh] inline-block  p-1 absolute text-xl cursor-pointer hover:text-[red] duration-300">{show ? <FaEyeSlash/> : <FaEye/> }</p> */}

        </div>
        <div className="">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required/>
          {/* <p onClick={() => showPassword(confirmPass)} className="ml-[-4vh] mt-[.7vh] inline-block  p-1 absolute text-xl cursor-pointer hover:text-[red] duration-300">{show ? <FaEyeSlash/> : <FaEye/> }</p> */}

        </div>
        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'>Change Password</button>
      </form>
    </div>
  )
}
