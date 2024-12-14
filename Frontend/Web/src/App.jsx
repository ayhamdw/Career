import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root'
import NotFound from './General-Components/NotFound/NotFound'
import HomePage from './HomePage/HomePage.jsx'
import Sginin from './Components/Sginin/Signin'
import Signup from './Components/Signup/Signup'
import Verify from './Components/Verify/Verify'
import Messages from './General-Components/Messages/Messages'
import Settings from './General-Components/Settings/Settings.jsx';
import Requests from './General-Components/Requests/Requests.jsx'
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import ServiceProvider from './Components/ServiceProvider/ServiceProvider.jsx'
import Community from './General-Components/Community/Community.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signin", element: <Sginin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/verify", element: <Verify /> },
      { path: "/messages", element: <ProtectedRoute><Messages /></ProtectedRoute> },
      { path: "/service-provider", element: <ProtectedRoute><ServiceProvider /></ProtectedRoute> },
      { path: "/community", element: <Community /> },
      { path: "/requests", element: <ProtectedRoute><Requests /></ProtectedRoute> },
      { path: "settings/*", element: <ProtectedRoute><Settings /></ProtectedRoute> },
      { path: "*", element: <NotFound /> },
      
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
    
  )
}

export default App
