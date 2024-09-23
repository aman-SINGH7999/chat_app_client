import React, {useState} from 'react'
// import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import demoImg from '../../images/logo.jpg'
import { MdArrowBackIos } from "react-icons/md";

export default function Profile() {
const userData = useSelector((store)=> store.user.authUser)
// console.log("user data : ",userData)
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [image, setImage] = useState("");
const [bio, setBio] = useState("");
const navigate = useNavigate();

  return (
    <div className='flex bg-sky-200 justify-center items-center h-screen' >
      <div className='w-11/12 flex justify-center items-center h-5/6'>
        <div className='w-1/2 flex flex-col space-y-10 justify-center items-center'>
          <div className='flex justify-center items-center w-4/5 space-x-2'>
             <button onClick={()=> navigate("/chat")} className='bg-blue-400 rounded-md py-2 px-2 font-semibold pl-3 hover:bg-blue-500'><MdArrowBackIos /></button> 
             <button className='py-1 bg-blue-400 w-4/5 rounded-md hover:bg-blue-500 font-semibold'>Edit Profile</button>
          </div>
          <img src={demoImg} alt="ProfilePicture" className='rounded-full w-4/5' />
        </div>
        <div className=' flex flex-col w-1/2 justify-center items-center space-y-4 bg-gray-300'>
          <h1 className=''>Create Your profile</h1>
          <form action="" className='flex flex-col justify-center items-center space-y-4'>
              <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
              <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
              <input type="file" name='profilePic' accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
              <input type="text" placeholder='Add Your Bio' value={bio} onChange={(e)=>setBio(e.target.value)} />
              <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
