import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeDashboard from './pages/EmployeDashboard'
import PrivetRoutes from './utils/PrivetRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/departments/DepartmentList'
import AddDepartment from './components/departments/AddDepartment'
import NewDataTable from './assets/NewDataTable'
import EditDepartment from './components/departments/EditDepartment'
import List from './components/employe/List'
import Add from './components/employe/Add'
import View from './components/employe/View'
import Edit from './components/employe/Edit'
import AddSalary from './components/salary/AddSalary'
import ViewSalary from './components/salary/ViewSalary'
import Table from './components/leave/Table'
import EmployeSummary from './components/EmployeDashboard/EmployeSummary'
import LeaveList from './components/leave/LeaveList'
import AddLeave from './components/leave/AddLeave'
import Setting from './components/EmployeDashboard/Setting'
import Settings from './components/EmployeDashboard/Setting'
import LeaveDetails from './components/leave/LeaveDetails'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/new' element={<NewDataTable />}></Route>
        <Route path='/admin-dashboard' element={
          <PrivetRoutes>
            <RoleBaseRoutes requiredRole = {["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivetRoutes>
        }>
          <Route index element={<AdminSummary/>}></Route>
          <Route path='/admin-dashboard/departments' element={<DepartmentList/>}></Route>
          <Route path='/admin-dashboard/add-department' element={<AddDepartment/>}></Route>
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />}></Route>

          <Route path='/admin-dashboard/employes' element={<List/>}></Route>
          <Route path='/admin-dashboard/add-employe' element={<Add />}></Route>
          <Route path='/admin-dashboard/employes/:id' element={<View />}></Route>
          <Route path='/admin-dashboard/employes/edit/:id' element={<Edit />}></Route>
          <Route path='/admin-dashboard/employes/leaves/:id' element={<LeaveList />}></Route>

          <Route path='/admin-dashboard/leaves' element={<Table/>}></Route>
          <Route path='/admin-dashboard/leaves/:id' element={<LeaveDetails/>}></Route>

          <Route path='/admin-dashboard/salary/add' element={<AddSalary />}></Route>
          <Route path='/admin-dashboard/employes/salary/:id' element={<ViewSalary />}></Route>

          <Route path='/admin-dashboard/settings' element={<Settings />}></Route>

        </Route>
        <Route path='/employe-dashboard' element={
            <PrivetRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employe"]}>
                <EmployeDashboard />
              </RoleBaseRoutes>
            </PrivetRoutes>
          }>
          <Route index element={<EmployeSummary />}></Route>

          <Route path='/employe-dashboard/profile/:id' element={<View/>}></Route>
          <Route path='/employe-dashboard/leaves/:id' element={<LeaveList/>}></Route>
          <Route path='/employe-dashboard/add-leave' element={<AddLeave />}></Route>
          <Route path='/employe-dashboard/settings' element={<Setting />}></Route>

          <Route path='/employe-dashboard/salary/:id' element={<ViewSalary/>}></Route>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}
