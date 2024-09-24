import React, { useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import demoImg from '../../images/logo.jpg'
import { MdArrowBackIos } from "react-icons/md";
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../../redux/userSlice'
import { CgSpinner } from "react-icons/cg";

export default function Profile() {
const authUser = useSelector((store)=> store.user.authUser)
const [firstName, setFirstName] = useState(authUser?.firstName || "");
const [lastName, setLastName] = useState(authUser?.lastName || "");
const [image, setImage] = useState("");
const [bio, setBio] = useState(authUser?.bio || "");
const navigate = useNavigate();
const dispatch = useDispatch();
const [edit, setEdit] = useState(false)
const [loading, setLoading] = useState(false)

const validateProfile = ()=>{
  if(firstName && lastName && image && bio) return true
  return false
}

const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("image", image);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);

    console.log(firstName, lastName, image, bio)
    try{
      if(validateProfile()){
        const response = await axios.post(`${process.env.REACT_APP_API_KEY}/api/profile/update-profile`,  formData ,{
          headers : {"Content-Type" : "multipart/form-data"},
          withCredentials : true,
        })
        setLoading(false)
        setEdit(false)
        toast.success(response?.data?.message)
        dispatch(setAuthUser(response.data.response))
        console.log("updated profile : ", response)
      }else{
        setLoading(false)
        toast.error("All Fields are Required")
      }
    }catch(err){
      setLoading(false)
      toast.error(err.response.data.message)
      console.log("Error in updating profile : ", err)
    }
}


  return (
    <div className='flex bg-sky-200 justify-center items-center h-screen' >
      <div className={ loading ? ` w-full md:w-11/12 flex justify-center items-center h-5/6 opacity-35 pointer-events-none` : `w-full md:w-11/12 flex justify-center items-center h-5/6 flex-col md:flex-row`}>
        <div className='w-11/12 md:w-1/2 flex flex-col space-y-10 justify-center items-center'>
          <div className='flex justify-center items-center w-full md:w-4/5 space-x-2'>
          <button onClick={()=> navigate("/chat")} className='bg-blue-400 rounded-md py-2 px-2 font-semibold pl-3 hover:bg-blue-500'><MdArrowBackIos /></button> 
          {
            edit 
            ? <button disabled className={`cursor-not-allowed py-1 bg-blue-400 w-full md:w-4/5 rounded-md hover:bg-blue-500 font-semibold`}>Edit Profile</button>
            : <button onClick={()=>setEdit(true)}  className={`py-1 bg-blue-400 w-full md:w-4/5 rounded-md hover:bg-blue-500 font-semibold`}>Edit Profile</button>
          }   
          </div>
          <img src={authUser?.image || demoImg} alt="ProfilePicture" className='rounded-full w-72 h-72 object-cover' />
        </div>
        <div className={ edit ? `flex flex-col w-11/12 my-4 md:w-1/2 justify-center items-center space-y-4 bg-gray-300 rounded-md p-4 pb-5` : `hidden` }>
          <div className='flex border-b-2 border-gray-500 w-4/5 py-1'>
            <h1 className='text-2xl font-semibold pb-1 w-full flex items-center justify-start'>Create Your profile</h1>
            <button onClick={()=> setEdit(false)} className='rounded-md px-2 bg-gray-400 text-sm font-semibold hover:bg-gray-500 h-8' type='button'>Back</button>
          </div>
          <form action="" className='flex flex-col justify-center items-center space-y-4 w-4/5' onSubmit={handleSubmit}>
              <input className='w-full rounded-md py-1 px-2' type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
              <input className='w-full rounded-md py-1 px-2' type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
              <input className='w-full rounded-md py-1 px-2' type="file" name='image' accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
              <input className='w-full rounded-md py-1 px-2' type="text" placeholder='Add Your Bio' value={bio} onChange={(e)=>setBio(e.target.value)} />
              <button className='w-full rounded-md py-1 px-2 bg-gray-400 font-semibold hover:bg-gray-500' type='submit'>Submit</button>
          </form>
        </div>
        <div className={ edit ? `hidden` : `flex flex-col w-11/12 my-4 md:w-1/2 justify-center items-center space-y-4 bg-gray-100 rounded-md p-4 pb-5`}>
          <h1 className='text-2xl font-semibold border-b-2 border-gray-500 pb-1 w-full flex items-center justify-start'>Your profile</h1>
          <div className='font-semibold flex flex-col justify-start w-full space-y-3'>
            <table>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{authUser?.email}</td>
              </tr>
              <tr>
                <td >First Name</td>
                <td>:</td>
                <td>{authUser?.firstName}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>:</td>
                <td>{authUser?.lastName}</td>
              </tr>
              <tr>
                <td>Bio</td>
                <td>:</td>
                <td>{authUser?.bio}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div className={loading ? `absolute flex justify-center items-center text-7xl animate-spin overflow-hidden`:`hidden`}>
        <CgSpinner />
      </div>
    </div>
  )
}
