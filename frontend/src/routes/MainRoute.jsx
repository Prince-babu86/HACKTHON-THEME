
import React from 'react'
import { Routes  , Route} from 'react-router-dom'

// pages
import Home from '../pages/Home'
import LoginPage from '../pages/auth/Login'
import SignUpPage from '../pages/auth/Signup'

const MainRoute = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/signup' element={<SignUpPage/>} />
        </Routes>
    </>
  )
}

export default MainRoute