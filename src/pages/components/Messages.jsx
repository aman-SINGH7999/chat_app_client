// import React, {useEffect, useRef} from 'react'
// import axios from 'axios'
// import { useSelector, useDispatch } from 'react-redux'
// import { setMessages } from '../../redux/messageSlice';

// export default function Messages() {
//     const dispatch = useDispatch();
//     const receiver = useSelector((store)=>store.user.selectedUser);
//     const messages = useSelector((store)=>store.message.messages)
//     const { socket } = useSelector((store)=>store.socket)
//     const selectedUser = useSelector((store)=>store.user.selectedUser)
   
//     // console.log("messages : ",messages)
//     const messagesEndRef = useRef(null);

//     const getMessage = async ()=>{
//         try{
//             const response = await axios.get(`${process.env.REACT_APP_API_KEY}/api/message/get-message/${receiver?._id}`, {withCredentials:true})
//             // console.log(response.data.messages)
//             dispatch(setMessages(response.data.messages || []))
//         }catch(err){
//             dispatch(setMessages([]))
//             console.log("Error in Message: ", err)
//         }
//     }

//   useEffect(()=>{

//     getMessage()
//   },[receiver]);

//   useEffect(()=>{
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   },[messages])

//   useEffect(()=>{

//     socket?.on("newMessage",(newMessage)=>{
//         // console.log("NEW MESSAGE ------: ", newMessage)
        
//           dispatch(setMessages([...messages, newMessage]))
//     })
//   },[socket, messages])

//   return (
//     <div className='' name='1-1' >
//         {
//             messages?.map((message)=>{
//                 return (
//                   <>
//                   {
//                     (selectedUser?._id === message?.sender || selectedUser?._id === message?.receiver)
//                     ? <div key={message?._id} ref={messagesEndRef} className={ 
//                         message?.sender === receiver?._id 
//                         ? `bg-gray-400 py-1 px-2 my-2 rounded-md w-fit break-words float-left clear-both` 
//                         : `bg-sky-200 py-1 px-2 my-2 rounded-md w-fit break-words float-right clear-both` 
//                       } >{message?.message}</div>
//                   : null
//                   }
//                   </>
//                 )
//             })
//         }
//     </div>
//   )
// }


import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../../redux/messageSlice';
import { MdDelete } from "react-icons/md";

export default function Messages() {
  const dispatch = useDispatch();
  const receiver = useSelector((store) => store.user.selectedUser);
  const messages = useSelector((store) => store.message.messages);
  const { socket } = useSelector((store) => store.socket);
  const selectedUser = useSelector((store) => store.user.selectedUser);
  const authUser = useSelector((store) => store.user.authUser);

  const messagesEndRef = useRef(null);

  const getMessage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/message/get-message/${receiver?._id}`,
        { withCredentials: true }
      );
      dispatch(setMessages(response.data.messages || []));
    } catch (err) {
      dispatch(setMessages([]));
      console.log("Error in Message: ", err);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_KEY}/api/message/delete-message/${id}`, {
        withCredentials: true,
      });
      const updatedMessages = messages.filter((msg) => msg._id !== id);
      dispatch(setMessages(updatedMessages));
    } catch (err) {
      console.log("Error deleting message:", err);
    }
  };

  useEffect(() => {
    getMessage();
  }, [receiver]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    // optional cleanup
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages]);

  return (
    <div>
      {messages?.map((message) => {
        const isSender = message?.sender === authUser?._id;
        const isFromReceiver =
          selectedUser?._id === message?.sender || selectedUser?._id === message?.receiver;

        return isFromReceiver ? (
          <div
            key={message?._id}
            ref={messagesEndRef}
            className={`relative group ${
              message?.sender === receiver?._id
                ? `bg-gray-400 float-left`
                : `bg-sky-200 float-right`
            } py-1 px-2 my-2 rounded-md w-fit break-words clear-both`}
          >
            {message?.message}

            {/* Delete button (visible only to sender on hover) */}
            {isSender && (
              <button
                onClick={() => handleDeleteMessage(message?._id)}
                className="absolute -top-2 -right-2 hidden group-hover:block text-red-600"
              >
                <MdDelete />
              </button>
            )}
          </div>
        ) : null;
      })}
    </div>
  );
}
