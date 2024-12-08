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
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <NotFound/>,
    children:[
      {
        path:'/',
        element:<HomePage/>,
      },
      {
        path:'/signin',
        element: <Sginin/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/verify',
        element:<Verify/>
      },
      {
        path:'/messages',
        element:<Messages/>
      },

      {
        path:'*',
        element:<NotFound/>
      }
    ]
  }
])

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}/>
    </>
    
  )
}

export default App
