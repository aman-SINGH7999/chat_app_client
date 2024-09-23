import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from './pages/profile/Profile';
import Chat from './pages/chat/Chat';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';



function App() {
  const authUser = useSelector((store)=> store.user.authUser)
  const { socket } = useSelector((store)=>store.socket)
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("UusEffect RUN")
    const serverURL = process.env.REACT_APP_API_KEY
    if(authUser){
      const socket = io(serverURL,{
        query:{
          userId : authUser?._id
        }
      }); 
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers', (onlineUsers)=>{
          dispatch(setOnlineUsers(onlineUsers))
      })
      return ()=> socket.close();
    }else{
        if(socket){
          socket.close();
          dispatch(setSocket(null))
        }
    }
      
  },[authUser])


  const PrivetRoute = ({children})=>{
    return authUser?._id ? children : <Navigate to="/auth/login" />
  }
  const AuthRoute = ({children})=>{
    return authUser?._id ? <Navigate to={`/chat`} /> : children
  }

  return (
    <Routes>
      <Route path="/auth/login" element={
        <AuthRoute>
          <Login />
        </AuthRoute>
      } />
      <Route path="/auth/signup" element={
        <AuthRoute>
          <Signup />
        </AuthRoute>
      } />
      <Route path='/profile/:id' element={
        <PrivetRoute>
          <Profile />
        </PrivetRoute>
      } />
      <Route path='/chat' element={
        <PrivetRoute>
          <Chat />
        </PrivetRoute>
        } />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}

export default App;
