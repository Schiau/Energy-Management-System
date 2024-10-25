import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import WelcomePage from './pages/Welcome/WelcomPage'
import Error404 from './pages/Error404/Error404'
import UserPage from './pages/UserPage/UserPage'
import RegistrionUserPage from './pages/RegistrationUser/RegistrationUsePage'
import LogInPage from './pages/LogIn/LogInPage'
import AdminPage from './pages/AdminPage/AdminPage'
import SaveUserPage from './pages/SaveUserPage/SaveUserPage'
import SaveDevicePage from './pages/SaveDevicePage/SaveDevicePage'
import AdminUserDevices from './pages/AdminUserDevices/AdminUserDevices'

const router = createBrowserRouter([
  {  
  path: "/",
  element: <WelcomePage />,
  errorElement: <Error404 />,
},
{
  path: "/registration",
  element: <RegistrionUserPage />,
  errorElement: <Error404 />
},
{
  path: "/authentification",
  element: <LogInPage />,
  errorElement: <Error404 />
},
{
  path: "/user",
  element: <UserPage />,
  errorElement: <Error404 />
},
{
  path: "/admin",
  element: <AdminPage />,
  errorElement: <Error404 />,
},
{
  path: "/admin/user/:id?",
  element: <SaveUserPage />,
  errorElement: <Error404 />,
},
{
  path: "/admin/device/:id?",
  element: <SaveDevicePage />,
  errorElement: <Error404 />,
},
{
  path: "/admin/devices/:id?",
  element: <AdminUserDevices />,
  errorElement: <Error404 />,
},
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
