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
  }, [dispatch]);

  return (
    <div
      className={
        !visible
          ? `flex flex-col bg-gray-100 h-screen p-4 w-full sm:w-1/3 md:w-1/4`
          : `hidden sm:flex flex-col bg-gray-100 h-screen p-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/5`
      }
    >
      {/* Profile */}
      <div
        onClick={() => navigate(`/profile/${authUser._id}`)}
        className="cursor-pointer flex items-center gap-3 p-3 mb-5 bg-white border border-gray-200 shadow-sm rounded-md hover:bg-gray-50 transition duration-200"
      >
        <img
          src={authUser?.image || profilepic}
          alt="profile pic"
          className="h-11 w-11 border rounded-full object-cover"
        />
        <div className="overflow-hidden">
          <div className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
            {authUser?.firstName || authUser?.email} {authUser?.lastName}
          </div>
          <p className="text-sm text-gray-500 italic whitespace-nowrap overflow-hidden text-ellipsis">
            {authUser?.bio || 'No Bio'}
          </p>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            dispatch(setSearchUser(e.target.value));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Search users..."
        />
      </form>

      {/* Other Users */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
        <OtherUser />
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <Logout />
      </div>
    </div>
  );
}
