import React, {useState} from 'react'
import profilepic from '../../images/logo.jpg';
import { IoSendSharp } from "react-icons/io5";
import Messages from './Messages';
import { useSelector, useDispatch} from 'react-redux'
import { setMessages, setVisible } from '../../redux/messageSlice';
import axios from 'axios';
import { MdArrowBackIos } from "react-icons/md";

export default function MessageContainer() {
  const dispatch = useDispatch();
  const selectedUser = useSelector((store)=>store.user.selectedUser);
  const messages = useSelector((store)=>store.message.messages)
  const authUser = useSelector((store)=> store.user.authUser)
  const visible = useSelector((store)=>store.message.visible)
  const [message, setMessage] = useState("");

  const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
        const response = await axios.post(`${process.env.REACT_APP_API_KEY}/api/message/send/${selectedUser?._id}`,{message}, {withCredentials:true});
        // console.log("Chat messages : ", [...messages,response?.data?.newMessage])
        const newMessage = response?.data?.newMessage;
        dispatch(setMessages([...messages, newMessage]));
        setMessage('');
      }catch(err){
        console.log("Error in message container: ", err);
      }
  }



  return (
    <div className={
      visible
      ? `bg-slate-300 h-screen flex items-baseline flex-col py-6 pl-2 pr-4 sm:p-6 sm:block sm:w-3/5 w-full`
      : `bg-slate-300 h-screen flex items-baseline flex-col py-6 pl-2 pr-4 sm:p-6 hidden sm:block sm:w-3/5 w-full`
      }>
      {
        selectedUser?._id 
        ? 
        <>
          {/* <button onClick={()=> dispatch(setVisible(false))} className={ 
            visible ? `sm:hidden py-1 px-4 mb-4 bg-gray-400 rounded-md font-semibold border-2 w-full hover:bg-gray-500` : `hidden`}>Back</button> */}
          
          <div className='flex flex-row w-full'>
            <button onClick={()=> dispatch(setVisible(false))} className={
              visible
              ? `sm:hidden flex justify-center items-center pl-3 my-2 bg-gray-400 rounded-md py-3 text-3xl`
              : `hidden`
            }><MdArrowBackIos /></button>
            <div className='flex justify-start items-center mx-2 my-2 bg-gray-400 rounded-md py-3 w-full' >
              <img src={profilepic} alt="profile pic" className='h-8 border-2 rounded-full mx-2' />
              <div>
                <p>{selectedUser?.email}</p>
                <p>{selectedUser?._id}</p>
              </div>
            </div>
          </div>

          <div className='w-full px-2 pr-8 flex-1 h-3/4 mx-2 overflow-scroll overflow-x-hidden focus:overscroll-contain no-scrollbar'>
          {
            selectedUser ?  <Messages /> : <div> Start Chatting</div>
          } 
          </div>

          <div className='w-full'>
            <form action="" onSubmit={handleSubmit} className='m-2 flex items-center py-4 border-b-2 border-gray-500 justify-end'>
              <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className="border-2 border-gray-400 rounded-md py-1 px-2 w-full" placeholder='Send messages' />
              <button type='submit' className='bg-gray-400 py-1 px-2 rounded-md mx-2'>
                <IoSendSharp className='text-2xl' />
              </button>
            </form>
          </div>
        </>
        : 
        <div className='flex justify-center items-center flex-col w-full h-full font-semibold space-y-3'>
            <div>Welcome <span className='text-2xl text-red-600'>{authUser?.email}</span></div>
            <div className='text-red-400'>Start chatting with your friends..</div>
        </div>
      }
      
      
    </div>
  )
}

