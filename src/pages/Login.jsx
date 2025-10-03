import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Login() {
  let pass = document.getElementById('password')
  const [show, setShow] = useState(false)
  const showPassword = () => {
    if (show) {
      setShow(false)
      pass.type = "text"
    } else {
      setShow(true)
      pass.type = "password"
    }
  }

  const [email, setEmail] = useState('')
  const [password, serPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://employe-backend.vercel.app/api/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.user)
        localStorage.setItem("token",response.data.token)
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard')
        }else {
          navigate('/employe-dashboard')
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error)
      } else {
        setError("Server Error")
      }
    }
  };
  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-50% space-y-6'>
        <h2 className='font-sevillana text-3xl text-white'>Employe Management System</h2>
          <div className="border shadow p-6 w-80 bg-white">
            <h2 className='text-2xl font-bold mb-4'>Lgin</h2>
        {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="email">Email:</label>
                    <input className='w-full px-3 py-2 border' type="email" id='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='relative'>
                    <label htmlFor="password">Password:</label>
                    <input className='w-full px-3 py-2 border' type="password" id='password' placeholder='******' required onChange={(e) => serPassword(e.target.value)} />
                    <p onClick={showPassword} className="ml-[-4vh] mt-[.7vh] inline-block  p-1 absolute text-xl cursor-pointer hover:text-[red] duration-300">{show ? <FaEyeSlash/> : <FaEye/> }</p>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <label className="inline-flex items-center">
                  <input type="checkbox" className='form-checkbox' />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-teal-600">Forgot</a>
              </div>
              <button className='w-full bg-teal-600 text-white py-2'>Login</button>
            </form>
          </div>


    </div>
  )
}
