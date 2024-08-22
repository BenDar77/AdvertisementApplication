import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const queryClient = useQueryClient();
  const username = queryClient.getQueryData('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication-related data (e.g., token)
    localStorage.removeItem('token');
    // Clear username from query cache
    queryClient.removeQueries('username');
    // Navigate to the login page
    navigate('/login');
  };
  

  return (
    <div className='bg-gray-600 flex justify-between items-center h-24 mx-auto px-4 text-white'>
  <h1 className='text-3xl font-bold text-[rgb(0,223,154)]'> Job advertisement application</h1>
  <ul className='hidden md:flex items-center'>
    <Link to="/addCategory" className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>Add advert category</Link>
    <Link to="/addAdvert" className='p-4 hover:bg-[#00df9a] rounded-xl mr-10 cursor-pointer duration-300 hover:text-black'>Add advert</Link>
    <Link to="/LinkAdvert" className='p-4 hover:bg-[#00df9a] rounded-xl mr-10 cursor-pointer duration-300 hover:text-black'>Link advert to category</Link>
    <li className='text-white py-4 my-2' >User:</li>
    <li className='text-[rgb(0,223,154)] py-4 px-2 my-2'>johndoe{username}</li>
    <li className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black' onClick={handleLogout}>Logout</li>
  </ul>
</div>
  );
};

export default Navbar;