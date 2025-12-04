import React from 'react'
import Users from '../components/Users'
import ChatUI from '../components/UserChat'

const ChatUserPage = () => {
  return (
    <div className='flex w-full '>
        <Users/>
        <ChatUI/>
    </div>
  )
}

export default ChatUserPage