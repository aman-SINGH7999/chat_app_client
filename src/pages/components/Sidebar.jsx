// import React, {useState, useEffect} from 'react'
// import OtherUser from './OtherUser';
// import Logout from '../auth/Logout';
// import { useSelector, useDispatch } from 'react-redux';
// import { setSearchUser } from '../../redux/userSlice';
// import profilepic from '../../images/logo.jpg';
// import { useNavigate } from 'react-router-dom';


// export default function Sidebar() {
// const [search, setSearch] = useState("");
// const dispatch = useDispatch();
// const authUser = useSelector((store)=> store.user.authUser)
// const visible = useSelector((store)=>store.message.visible)
// const navigate = useNavigate();


  
// useEffect(()=>{
//   dispatch(setSearchUser(""));
// },[])

//   return (
//     <div className={
//       !visible
//       ? `flex flex-col bg-sky-200 h-screen p-4 w-full sm:w-1/2 md:w-3/5 lg:w-2/5`
//       : `hidden sm:block lex flex-col bg-sky-200 h-screen p-4 w-full sm:w-1/2 md:w-3/5 lg:w-2/5`
//     }>
      
//       <div onClick={()=>navigate(`/profile/${authUser._id}`)} className='cursor-pointer flex justify-start items-center py-3 mt-4 px-4 bg-blue-400 rounded-md font-semibold hover:bg-blue-500 w-full' >
//         <img src={authUser?.image || profilepic} alt="profile pic" className='h-8 w-8 border-2 rounded-full mx-2' />
//         <div>
//           <div className='flex'>
//             <p>{authUser?.firstName || authUser?.email}</p>
//             <p className='mx-1'>{authUser?.lastName}</p>
//           </div>
//           <i>{authUser?.bio || "No Bio"}</i>
//         </div>
//       </div>

//       <form action="" onSubmit={(e)=> e.preventDefault()} className='m-2 flex items-center py-4 border-b-2 border-gray-500'>
//         <input type="text" value={search} onChange={(e)=>{
//             setSearch(e.target.value);
//             dispatch(setSearchUser(e.target.value));
//           }} className="border-2 border-gray-400 rounded-md py-1 px-2 w-full" placeholder='Search..' />
//       </form>
//       <OtherUser />
//       <Logout />
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import OtherUser from './OtherUser';
import Logout from '../auth/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchUser } from '../../redux/userSlice';
import profilepic from '../../images/logo.jpg';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const authUser = useSelector((store) => store.user.authUser);
  const visible = useSelector((store) => store.message.visible);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchUser(''));
  }, []);

  return (
    <div
      className={
        !visible
          ? `flex flex-col bg-gradient-to-br from-sky-200 to-blue-300 h-screen p-3 w-full sm:w-1/3 md:w-1/4`
          : `hidden sm:block flex flex-col bg-gradient-to-br from-sky-200 to-blue-300 h-screen p-3 w-full sm:w-1/3 md:w-1/4 lg:w-1/5`
      }
    >
      {/* Profile */}
      <div
        onClick={() => navigate(`/profile/${authUser._id}`)}
        className="cursor-pointer flex items-center gap-3 p-3 mb-4 bg-white shadow-md rounded-xl hover:bg-blue-100 transition duration-200"
      >
        <img
          src={authUser?.image || profilepic}
          alt="profile pic"
          className="h-10 w-10 border-2 rounded-full object-cover"
        />
        <div className="overflow-hidden">
          <div className="font-semibold text-blue-800 whitespace-nowrap overflow-hidden text-ellipsis">
            {authUser?.firstName || authUser?.email} {authUser?.lastName}
          </div>
          <p className="text-sm italic text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {authUser?.bio || 'No Bio'}
          </p>
        </div>
      </div>

      {/* Search */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-4"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            dispatch(setSearchUser(e.target.value));
          }}
          className="w-full px-3 py-1.5 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          placeholder="Search..."
        />
      </form>

      {/* Other Users */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 pr-1">
        <OtherUser />
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <Logout />
      </div>
    </div>
  );
}
