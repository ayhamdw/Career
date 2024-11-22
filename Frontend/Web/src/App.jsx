import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root'
import NotFound from './General-Components/NotFound/NotFound'
import HomePage from './HomePage/HomePage.jsx'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
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
        path:'/login',
        element: <Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
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
      <RouterProvider router={router}/>
    </>
    
  )
}

export default App
