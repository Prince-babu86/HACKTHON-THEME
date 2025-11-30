import { Route } from 'lucide-react'
import React from 'react'
import { Routes } from 'react-router-dom'

// pages
import Home from '../pages/Home'

const MainRoute = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
    </>
  )
}

export default MainRoute