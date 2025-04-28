import { MdEmail } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { FaUser, FaList, FaLock, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(true);  
  const user = true;

  return (
    <div className="w-full">

      {/* Top Contact and Social Header (visible on larger screens) */}
      <div className="bg-[#caddff]">
        <div className="container mx-auto flex justify-between items-center h-[50px] px-4 md:px-6 md-lg:hidden">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 text-sm text-black">
              <MdEmail />
              <span>support@gmail.com</span>
            </div>
            <span className="text-gray-500">|</span>
            <div className="flex items-center gap-2 text-sm text-black">
              <IoPhonePortrait />
              <span>+(123) 4567 890</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FaFacebook className="cursor-pointer hover:text-blue-600" />
              <FaTwitter className="cursor-pointer hover:text-blue-400" />
              <FaLinkedin className="cursor-pointer hover:text-blue-700" />
              <FaGithub className="cursor-pointer hover:text-gray-800" />
            </div>
            <span className="text-gray-500">|</span>
            <div className="relative flex items-center space-x-2 group">
              <img className="w-6 h-4" src="http://localhost:5174/images/language.png" alt="Language"/>
              <span className="text-sm text-black">US</span>
              <IoMdArrowDropdown />
              <ul className="absolute left-0 top-8 bg-black text-white p-2 w-[100px] flex flex-col gap-2 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:top-10 transition-all duration-200 z-10">
                <li className="cursor-pointer hover:text-blue-500">English</li>
                <li className="cursor-pointer hover:text-blue-500">Bangla</li>
              </ul>
            </div>
            <span className="text-gray-500">|</span>
            <div className="flex items-center space-x-2">
              {user ?  
                <Link className="flex items-center gap-2 text-sm text-black cursor-pointer" to={"/dashboard"}>
                  <FaUser />
                  <span>Taufiqul Islam</span>                
                </Link>
                :
                <Link className="flex items-center gap-2 text-sm text-black cursor-pointer" to={"/login"}>
                  <FaLock />
                  <span>Login</span>                
                </Link>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Logo and Menu (Always visible) */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center h-[80px] px-4 md:px-6">
          <div class='md-lg:w-full w-3/12 md-lg:pt-4'>
                                                                                                              

          </div>
          <Link to='/'>
            <img src="http://localhost:5174/images/logo.png" alt="Logo" />
          </Link>
          {/* FaList Icon - visible on small screens only */}
          <div className="hidden md-lg:flex items-center justify-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer" onClick={() => setShowSidebar(!showSidebar)}>
            <span><FaList /></span>
          </div>
            
          </div>
        </div>
      </div>
  );
};

export default Header;
