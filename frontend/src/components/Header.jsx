import { MdEmail } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { FaUser, FaLock, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";


import { Link } from "react-router-dom";

const Header = () => {

  const user = true;

  return (
    <div className="w-full bg-[#caddff]">
      <div className="container mx-auto flex justify-between items-center h-[50px] px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Email */}
          <div className="flex items-center gap-2 text-sm text-black">
            <MdEmail />
            <span>support@gmail.com</span>
          </div>
          {/* Separator */}
          <span className="text-gray-500">|</span>
          {/* Phone */}
          <div className="flex items-center gap-2 text-sm text-black">
            <IoPhonePortrait />
            <span>+(123) 4567 890</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Social Media */}
          <div className="flex items-center space-x-2">
            <FaFacebook className="hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-700 cursor-pointer" />
            <FaGithub className="hover:text-gray-800 cursor-pointer" />
          </div>

          {/* Separator */}
          <span className="text-gray-500">|</span>

          {/* Language */}
          <div className="relative group flex items-center space-x-2">
            <img
              src="http://localhost:5173/images/language.png"
              alt="Language"
              className="h-4 w-6"
            />
            <span className="text-sm text-black">US</span>
            <IoMdArrowDropdown />
            <ul
              className="absolute left-0 top-8 bg-black text-white p-2 w-[100px] flex flex-col gap-2 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:top-10 transition-all duration-200 z-10"
            >
              <li className="hover:text-blue-500 cursor-pointer">English</li>
              <li className="hover:text-blue-500 cursor-pointer">Bangla</li>
            </ul>
          </div>

          {/* Separator */}
          <span className="text-gray-500">|</span>

          {/* User */}
          <div className="flex items-center space-x-2">
            {
              user ?  
                <Link className="flex cursor-pointer justify-center items-center gap-2
                text-sm text-black" to={"/dashboard"}>
                  <span><FaUser /></span>                  
                  <span>Taufiqul Islam</span>                
                </Link>
                :
                <Link className="flex cursor-pointer justify-center items-center gap-2
                text-sm text-black" to={"/login"}>
                  <span><FaLock /></span>                  
                  <span>Login</span>                
                </Link>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
