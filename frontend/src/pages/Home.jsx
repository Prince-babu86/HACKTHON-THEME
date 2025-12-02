import React from 'react'
import Navbar from '../components/Navbar'
import Menubar from '../components/Menubar'
import UsersList from '../components/Users'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className='flex'>
     <UsersList/>
     <Banner/>
    </div>
  )
}

export default Home