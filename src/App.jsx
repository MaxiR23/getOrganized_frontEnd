import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'

import ProtectedRoutes from './layouts/ProtectedRoutes'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import Project from './pages/Project'
import EditProject from './pages/EditProject'

import NewCollaborator from './pages/NewCollaborator'

import { AuthProvider } from './context/AuthProvider'
import { ProjectProvider } from './context/ProjectProvider'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgot-password' element={<ForgetPassword />} />
              <Route path='forgot-password/:token' element={<NewPassword />} />
              <Route path='confirm-account/:id' element={<ConfirmAccount />} />
            </Route>

            <Route path='/projects' element={<ProtectedRoutes />}>
              <Route index element={<Projects />} />
              <Route path='create-project' element={<NewProject />} />
              <Route path='add-collab/:id' element={<NewCollaborator />} />
              <Route path=':id' element={<Project />} />
              <Route path='edit/:id' element={<EditProject />} />
            </Route>

          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
