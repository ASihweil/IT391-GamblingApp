import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
{ path: '/dashboard', element: <Dashboard /> }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
