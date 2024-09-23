import React, {useEffect, useRef} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setMessages } from '../../redux/messageSlice';

export default function Messages() {
    const dispatch = useDispatch();
    const receiver = useSelector((store)=>store.user.selectedUser);
    const messages = useSelector((store)=>store.message.messages)
    const { socket } = useSelector((store)=>store.socket)
    const selectedUser = useSelector((store)=>store.user.selectedUser)
   
    // console.log("messages : ",messages)
    const messagesEndRef = useRef(null);

    const getMessage = async ()=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_KEY}/api/message/get-message/${receiver?._id}`, {withCredentials:true})
            // console.log(response.data.messages)
            dispatch(setMessages(response.data.messages || []))
        }catch(err){
            dispatch(setMessages([]))
            console.log("Error in Message: ", err)
        }
    }

  useEffect(()=>{

    getMessage()
  },[receiver]);

  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  },[messages])

  useEffect(()=>{

    socket?.on("newMessage",(newMessage)=>{
        // console.log("NEW MESSAGE ------: ", newMessage)
        
          dispatch(setMessages([...messages, newMessage]))
    })
  },[socket, messages])

  return (
    <div className='' name='1-1' >
        {
            messages?.map((message)=>{
                return (
                  <>
                  {
                    (selectedUser?._id === message.sender || selectedUser?._id === message.receiver)
                    ? <div key={message?._id} ref={messagesEndRef} className={ 
                        message?.sender === receiver?._id 
                        ? `bg-gray-400 py-1 px-2 my-2 rounded-md w-fit break-words float-left clear-both` 
                        : `bg-sky-200 py-1 px-2 my-2 rounded-md w-fit break-words float-right clear-both` 
                      } >{message?.message}</div>
                  : null
                  }
                  </>
                )
            })
        }
    </div>
  )
}
