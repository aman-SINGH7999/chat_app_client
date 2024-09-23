import React,{useState} from 'react'
import axiox from 'axios'
import { toast } from 'sonner'
import { useNavigate, Link } from 'react-router-dom'


export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  const validateSignup = ()=>{
    if(!email.length){
      toast.error("Email is Required");
      return false
    }
    if(!password.length){
      toast.error("Password is Required");
      return false
    }
    if(password !== confirmPassword){
      toast.error("Password and Confirm Password Should be Same")
      return false
    }
    return true;
  }

const handleSubmit = async (e)=>{
  e.preventDefault();
  if(validateSignup()){
    try{
      const responce = await axiox.post(`${process.env.REACT_APP_API_KEY}/api/auth/signup`, {email, password}, {withCredentials:true});
      // console.log("Responce : ",responce)
      if(responce.status === 201){
        navigate('/auth/login')
      }
    }catch(err){
      // console.log("Error : ",err);
    }
  }
}

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='h-4/5 bg-white border-1 text-opacity-90 shadow-2xl flex flex-col justify-center items-center w-11/12 sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-3/5'>
            <h1 className='text-3xl font-bold my-4'>Sign Up Here</h1>
            <form action="" className='flex flex-col justify-center items-center my-4 w-full p-4' onSubmit={handleSubmit}>
              <input className='my-2 outline-gray-500 py-1 px-2 w-full border-2 border-gray-400 rounded-xl text-xl' type="email" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input className='my-2 outline-gray-500 py-1 px-2 w-full border-2 border-gray-400 rounded-xl text-xl' type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <input className='my-2 outline-gray-500 py-1 px-2 w-full border-2 border-gray-400 rounded-xl text-xl' type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
              <button className='bg-green-500 py-1 px-4 rounded-xl font-semibold my-2 w-full text-xl hover:bg-green-600 cursor-pointer' type='submit'>Sign Up</button>
            </form>
            <p>if already Sign Up? <Link to="/auth/login">Login</Link></p>
        </div>
    </div>
  )
}
