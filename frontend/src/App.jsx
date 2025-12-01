import React from 'react'
import Login from './pages/auth/Login'
import SignUpPage from './pages/auth/Signup'
import MainRoute from './routes/MainRoute'
import ChatNavbar from './components/Navbar'
import Menubar from './components/Menubar'

const App = () => {
  return (
    <div className='min-h-screen w-full '>
      <ChatNavbar/>
    <div className='flex '>
      <Menubar/>
       <MainRoute/>
    </div>
    </div>
  )
}

export default App