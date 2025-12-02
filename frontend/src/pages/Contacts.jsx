import React from 'react'
import UsersList from '../components/ContactUsers'
import AIHeroCenter from '../components/Banner'

const Contacts = () => {
  return (
    <div className='flex'>
        <UsersList/>
        <AIHeroCenter/>
    </div>
  )
}

export default Contacts