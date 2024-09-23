import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'

export default function Chat() {
  return (
    <div className='flex '>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}
