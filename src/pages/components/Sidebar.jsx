import React, {useState, useEffect} from 'react'
import { IoSearch } from "react-icons/io5";
import OtherUser from './OtherUser';
import Logout from '../auth/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchUser } from '../../redux/userSlice';
import profilepic from '../../images/logo.jpg';
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {
const [search, setSearch] = useState("");
const dispatch = useDispatch();
const authUser = useSelector((store)=> store.user.authUser)
const visible = useSelector((store)=>store.message.visible)
// const selectedUser = useSelector((store)=>store.user.selectedUser);
const navigate = useNavigate();


  
useEffect(()=>{
  dispatch(setSearchUser(""));
},[])

  return (
    <div className={
      !visible
      ? `flex flex-col bg-sky-200 h-screen p-4 w-full sm:w-1/2 md:w-3/5 lg:w-2/5`
      : `hidden sm:block lex flex-col bg-sky-200 h-screen p-4 w-full sm:w-1/2 md:w-3/5 lg:w-2/5`
    }>
      
      <div onClick={()=>navigate(`/profile/${authUser._id}`)} className='cursor-pointer flex justify-start items-center py-3 mt-4 px-4 bg-blue-400 rounded-md font-semibold hover:bg-blue-500 w-full' >
        <img src={profilepic} alt="profile pic" className='h-8 border-2 rounded-full mx-2' />
        <div>
          <p>{authUser?.email}</p>
          <p>{authUser?._id}</p>
        </div>
      </div>

      <form action="" onSubmit={(e)=> e.preventDefault()} className='m-2 flex items-center py-4 border-b-2 border-gray-500'>
        <input type="text" value={search} onChange={(e)=>{
            setSearch(e.target.value);
            dispatch(setSearchUser(e.target.value));
          }} className="border-2 border-gray-400 rounded-md py-1 px-2 w-full" placeholder='Search..' />
        {/* <button type='submit' className='bg-gray-400 py-1 px-2 rounded-md mx-2'>
            <IoSearch  className='text-2xl' />
        </button> */}
      </form>
      <OtherUser />
      <Logout />
    </div>
  )
}
