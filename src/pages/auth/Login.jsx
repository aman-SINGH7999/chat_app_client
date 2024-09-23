import React,{useState} from 'react'
import axiox from 'axios'
import { toast } from 'sonner'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../../redux/userSlice'


export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateSignup = ()=>{
    if(!email.length){
      toast.error("Email is Required");
      return false
    }
    if(!password.length){
      toast.error("Password is Required");
      return false
    }
    return true;
  }


const handleSubmit = async (e)=>{
  e.preventDefault();
  if(validateSignup()){
    try{
      const path = `${process.env.REACT_APP_API_KEY}/api/auth/login`;
      // console.log("path : ", path)
      const responce = await axiox.post(path, {email, password},{withCredentials : true});
      // console.log("Responce : ",responce.data)
      if(responce.data.success===true){
        toast.success(responce.data.message);
        dispatch(setAuthUser(responce.data.user))
        // navigate(`/profile/${responce.data.user._id}`);
        navigate("/chat")
      }else{
        toast.error(responce.data.message);
      }
    }catch(err){
      // console.log("Error : ",err);
      toast.error(err.response.data.message);
    }
  }
}

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='h-4/5 bg-white border-1 text-opacity-90 shadow-2xl flex flex-col justify-center items-center w-11/12 sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-3/5'>
            <h1 className='text-3xl font-bold my-4'>Login Here</h1>
            <form action="" className='flex flex-col justify-center items-center my-4 w-full p-4' onSubmit={handleSubmit}>
              <input className='my-2 outline-gray-500 py-1 px-2 w-full border-2 border-gray-400 rounded-xl text-xl' type="email" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input className='my-2 outline-gray-500 py-1 px-2 w-full border-2 border-gray-400 rounded-xl text-xl' type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <button className='bg-green-500 py-1 px-4 rounded-xl font-semibold my-2 w-full text-xl hover:bg-green-600 cursor-pointer' type='submit'>Login</button>
            </form>
            <p>if you don't have an account?<Link to="/auth/signup">Sign Up</Link></p>
        </div>
    </div>
  )
}
