import React, { useEffect, useState } from 'react'
import ChatContainer from './compoenets/ChatContainer'
import {Routes,Route} from 'react-router-dom'
import Notes from './compoenets/Notes'
import Header from './compoenets/Header'
import jwt_decode from 'jwt-decode'
import Notification from './compoenets/Notification'

const App = () => {
  const [getUser,setGetUser]=useState()
  const user =jwt_decode(localStorage.getItem('user'))
  


  useEffect(() => {
    setGetUser(user)
  }, [])
  
  console.log(getUser?.email)
  return (
    <>
    {/* <Notes/> */}
    <Header/>
    <Routes>
      <Route path='/' element={<Notes/>} />
      <Route path='/chat' element={<ChatContainer nickname={getUser?.email}/>} />
      <Route path='/noti' element={<Notification nickname={getUser?.email}/>} />


    </Routes>
    </>
  )
}

export default App
