import React from 'react'
import UsersList from '../components/ContactUsers'
import AIHeroCenter from '../components/Banner'
import { Outlet } from 'react-router-dom'

const Contacts = () => {
  return (
    <div className='flex w-full'>
        <UsersList/>
        <Outlet/>
        {/* <AIHeroCenter/> */}
    </div>
  )
}

export default Contacts