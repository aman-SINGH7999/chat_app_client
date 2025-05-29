import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'

export default function Chat() {
  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}
