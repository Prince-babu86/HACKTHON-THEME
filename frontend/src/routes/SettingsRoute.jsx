import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Profile from '../components/Settings/Profile'
import AccountSettings from '../components/Settings/Account'
import NotificationsSettings from '../components/Settings/Notification'
import PrivacySettings from '../components/Settings/Privacy'
import AppearanceSettings from '../components/Settings/Appreance'
import SecuritySettings from '../components/Settings/Sequrity'
const SettingsRoute = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Profile/>} />
          <Route path="account" element={<AccountSettings/>} />
          <Route path="notifications" element={<NotificationsSettings/>} />
          <Route path="privacy" element={<PrivacySettings/>} />
          <Route path="appearance" element={<AppearanceSettings/>} />
          <Route path="chats" element={<h1>Chat Settings</h1>} />
          <Route path="language" element={<h1>Language</h1>} />
          <Route path="devices" element={<h1>Devices</h1>} />
          <Route path="security" element={<SecuritySettings/>} />
          <Route path="verification" element={<h1>Verify Account</h1>} />
          <Route path="activity" element={<h1>Activity Log</h1>} />
          <Route path="help" element={<h1>Help Center</h1>} />
          <Route path="danger" element={<h1>Danger Zone ⚠️</h1>} />
        </Routes>
    </>
  )
}

export default SettingsRoute