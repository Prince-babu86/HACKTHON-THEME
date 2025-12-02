import React from 'react'
import SettingsMenu from '../components/SettingsMenu'
import SettingsRoute from '../routes/SettingsRoute'

const Settings = () => {
  return (
    <div className='flex w-full'>
        <SettingsMenu/>
       <div className='ml-72'>
         <SettingsRoute/>
       </div>
    </div>
  )
}

export default Settings