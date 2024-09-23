import React from 'react'
import { useDispatch } from 'react-redux'
import { setAuthUser, setOtherUsers, setSelectedUser} from '../../redux/userSlice'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast} from 'sonner'


export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

const handleClick = async (e)=>{
    try{
        dispatch(setAuthUser(null))
        // dispatch(setOtherUsers(null))
        dispatch(setSelectedUser(null))
        await axios.get(`${process.env.REACT_APP_API_KEY}/api/auth/logout`, {withCredentials:true})
        toast.success("Logout Successfully")
        navigate('/auth/login');
    }catch(err){
        console.log("Error in logout: ", err)
    }

}

  return (
    <div>
        <button onClick={handleClick} className=' py-1 px-4 mb-4 bg-blue-400 rounded-md font-semibold hover:bg-blue-500 w-full'>Logout</button>
    </div>
  )
}
