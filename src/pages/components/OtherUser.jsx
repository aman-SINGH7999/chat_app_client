import React, { useEffect } from 'react'
import profilepic from '../../images/logo.jpg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers, setSelectedUser } from '../../redux/userSlice';
import { setVisible } from '../../redux/messageSlice';


export default function OtherUser() {
    const dispatch = useDispatch();
    const otherUsers = useSelector((store)=>store.user.otherUsers)
    const selectedUser = useSelector((store)=>store.user.selectedUser)
    const { onlineUsers } = useSelector((store)=>store.user)
    const searchUser = useSelector((store)=>store.user.searchUser)
    // console.log("other users : ", otherUsers)
    console.log("Online user : ", onlineUsers)

    const handleClick = (user)=>{
        dispatch(setVisible(true));
        dispatch(setSelectedUser(user));
    }

    const getAllUsers = async ()=>{
        try{
          const response = await axios.get(`${process.env.REACT_APP_API_KEY}/api/auth/user-info`, {withCredentials:true})
        //   console.log("RESPONSE : ",response.data)
          dispatch(setOtherUsers(response.data))
        }catch(err){
          console.log("Error in Other User: ",err)
        }
      }
    
      useEffect(()=>{
        getAllUsers();
      },[])

  return (
    <div className='flex flex-col flex-1 h-4/6 mb-2 overflow-scroll overflow-x-hidden focus:overscroll-contain no-scrollbar'>
        {
        otherUsers?.filter((user)=>{
          if(searchUser === "") return user;
          else if(user?.email?.includes(searchUser)) return user;
        }).map((user)=>{
          return (
            <>
            {

              <div key={user._id} className={ selectedUser?._id === user._id ?`flex justify-start mx-2 bg-gray-200 rounded-md py-2 cursor-pointer` :`flex justify-start mx-2 rounded-md py-2 cursor-pointer hover:bg-blue-300`} onClick={()=>handleClick(user)}>
                  <img src={profilepic} alt="profile pic" className='h-8 border-2 rounded-full mx-2' />
                  {
                    onlineUsers?.includes(user?._id) 
                    ? <>
                    <div className='h-3 w-3 bg-green-400 -mx-4 rounded-full'></div> 
                    <div className='mx-6'><p>{user.email}</p></div>
                    </>
                    : <div className='mx-1'><p>{user.email}</p></div>
                  }
             </div>
            }
            </>
          )
        })
      }
    </div>
  )
}
