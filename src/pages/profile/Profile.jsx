import React, {useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import demoImg from '../../images/logo.jpg'
import { MdArrowBackIos } from "react-icons/md";

export default function Profile() {
const authUser = useSelector((store)=> store.user.authUser)
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [image, setImage] = useState("");
const [bio, setBio] = useState("");
const navigate = useNavigate();



const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);

    console.log(firstName, lastName, image, bio)
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_KEY}/api/profile/update-profile`,  formData ,{
        headers : {"Content-Type" : "multipart/form-data"},
        withCredentials : true,
      })
      console.log("updating profile : ", response)
    }catch(err){
        console.log("Error in updating profile : ", err)
    }
}

  return (
    <div className='flex bg-sky-200 justify-center items-center h-screen' >
      <div className='w-11/12 flex justify-center items-center h-5/6'>
        <div className='w-1/2 flex flex-col space-y-10 justify-center items-center'>
          <div className='flex justify-center items-center w-4/5 space-x-2'>
             <button onClick={()=> navigate("/chat")} className='bg-blue-400 rounded-md py-2 px-2 font-semibold pl-3 hover:bg-blue-500'><MdArrowBackIos /></button> 
             <button className='py-1 bg-blue-400 w-4/5 rounded-md hover:bg-blue-500 font-semibold'>Edit Profile</button>
          </div>
          <img src={demoImg} alt="ProfilePicture" className='rounded-full w-4/5 sm:w-3/5' />
        </div>
        <div className=' flex flex-col w-1/2 justify-center items-center space-y-4 bg-gray-300 rounded-md p-4 pb-5'>
          <h1 className='text-2xl font-semibold border-b-2 border-gray-500 pb-1 w-full flex items-center justify-center'>Create Your profile</h1>
          <form action="" className='flex flex-col justify-center items-center space-y-4 w-4/5' onSubmit={handleSubmit}>
              <input className='w-full rounded-md py-1 px-2' type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
              <input className='w-full rounded-md py-1 px-2' type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
              <input className='w-full rounded-md py-1 px-2' type="file" name='image' accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
              <input className='w-full rounded-md py-1 px-2' type="text" placeholder='Add Your Bio' value={bio} onChange={(e)=>setBio(e.target.value)} />
              <button className='w-full rounded-md py-1 px-2 bg-gray-400 font-semibold hover:bg-gray-500' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
