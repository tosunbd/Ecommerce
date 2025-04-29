import { MdEmail } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { FaUser, FaList, FaLock, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaHeart, FaCartShopping } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);  
  const user = true;
  const wishlist_count = 3;

  return (
    <div className="w-full">
      
      {/* Top Contact and Social Header */}
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
              <img className="w-6 h-4" src={`${window.location.origin}/images/language.png`} alt="Language"/>
              <span className="text-sm text-black">US</span>
              <IoMdArrowDropdown />
              <ul className="absolute left-0 top-8 bg-black text-white p-2 w-[100px] flex flex-col gap-2 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:top-10 transition-all duration-200 z-10">
                <li className="cursor-pointer hover:text-blue-500">English</li>
                <li className="cursor-pointer hover:text-blue-500">Bangla</li>
              </ul>
            </div>
            <span className="text-gray-500">|</span>
            <div className="flex items-center space-x-2">
              {user ? (
                <Link className="flex items-center gap-2 text-sm text-black cursor-pointer" to="/dashboard">
                  <FaUser />
                  <span>Taufiqul Islam</span>                
                </Link>
              ) : (
                <Link className="flex items-center gap-2 text-sm text-black cursor-pointer" to="/login">
                  <FaLock />
                  <span>Login</span>                
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logo and Menu */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center h-[80px] px-4 md:px-6">
          
          <div className="w-3/12 md-lg:w-full md-lg:pt-4">
            <div className="flex items-center justify-between">
              <Link to='/'>
                <img src={`${window.location.origin}/images/logo.png`} alt="Logo" />
              </Link>
              {/* FaList Icon */}
              <div className="hidden md-lg:flex items-center justify-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer" onClick={() => setShowSidebar(!showSidebar)}>
                <span><FaList /></span>
              </div>

            </div>
          </div>

          <div className="w-9/12 md:lg:w-full">
            <div className="flex flex-wrap items-center justify-between pl-8 md-lg:justify-center">

              {/* LEFT MENU */}
              <ul className="flex items-start justify-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                <li><Link to="/" className={`p-2 block ${pathname === '/' ? 'text-[#059473]' : 'text-slate-600'}`}>Home</Link></li>
                <li><Link to="/shop" className={`p-2 block ${pathname === '/shop' ? 'text-[#059473]' : 'text-slate-600'}`}>Shop</Link></li>
                <li><Link to="/blog" className={`p-2 block ${pathname === '/blog' ? 'text-[#059473]' : 'text-slate-600'}`}>Blog</Link></li>
                <li><Link to="/about" className={`p-2 block ${pathname === '/about' ? 'text-[#059473]' : 'text-slate-600'}`}>About Us</Link></li>
                <li><Link to="/contact" className={`p-2 block ${pathname === '/contact' ? 'text-[#059473]' : 'text-slate-600'}`}>Contact Us</Link></li>
              </ul>

              {/* RIGHT ICONS */}
              <div className="flex items-center justify-center gap-5 md-lg:hidden">
                {/* Heart Icon */}
                <div className="relative flex items-center justify-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                  <span className="text-xl text-green-500"><FaHeart /></span>
                  <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs -top-[3px] -right-[5px]">
                    {wishlist_count}
                  </div>
                </div>
                {/* Cart Icon */}
                <div className="relative flex items-center justify-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                  <span className="text-xl text-green-500"><FaCartShopping /></span>
                  <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs -top-[3px] -right-[5px]">
                    {wishlist_count}
                  </div>
                </div>
              </div>

            </div>            
          </div>

        </div>
      </div>

      {/* Sidebar */}
      <div onClick={() => setShowSidebar(!showSidebar)} className="hidden md:lg:block">
        <div className={`fixed duration-200 transition-all ${showSidebar ? 'invisible' : 'visible'} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,.5)] top-0 left-0 z-20`}>
       
          
        </div>

           <div className={`w-[300px] z-[9999] transition-all duration-200 fixed ${showSidebar ? '-left-[300x]' : 'left-0 top-0'} overflow-y-auto bg-white h-screen py-6 px-8`}>
            {/* Sidebar content */}
            <div className="flex flex-col justify-start gap-6">
              <Link to='/'>
                <img src={`${window.location.origin}/images/logo.png`} alt="Logo" />
              </Link> 
              <div className="flex justify-start gap-10 flex- items-right">
                <div className="relative flex items-center space-x-2 group">
                  <img className="w-6 h-4" src={`${window.location.origin}/images/language.png`} alt="Language"/>
                  <span className="text-sm text-black">US</span>
                  <IoMdArrowDropdown />
                  <ul className="absolute left-0 top-8 bg-black text-white p-2 w-[100px] flex flex-col gap-2 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:top-10 transition-all duration-200 z-10">
                    <li className="cursor-pointer hover:text-blue-500">English</li>
                    <li className="cursor-pointer hover:text-blue-500">Bangla</li>
                  </ul>
                  <span className="text-gray-500">|</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {user ? (
                    <Link className="flex items-center gap-2 text-sm text-black cursor-pointer" to="/dashboard">
                      <FaUser />
                      <span>Taufiqul Islam</span>                
                    </Link>
                  ) : (
                    <Link className="flex items-center gap-2 text-sm text-black cursor-pointer" to="/login">
                      <FaLock />
                      <span>Login</span>                
                    </Link>
                  )}
                </div>


              </div>

              {/* LEFT MENU */}
              <ul className="flex flex-col items-start justify-start text-sm font-bold uppercase">
                <li><Link to="/" className={`py-2 block ${pathname === '/' ? 'text-[#059473]' : 'text-slate-600'}`}>Home</Link></li>
                <li><Link to="/shop" className={`py-2 block ${pathname === '/shop' ? 'text-[#059473]' : 'text-slate-600'}`}>Shop</Link></li>
                <li><Link to="/blog" className={`py-2 block ${pathname === '/blog' ? 'text-[#059473]' : 'text-slate-600'}`}>Blog</Link></li>
                <li><Link to="/about" className={`py-2 block ${pathname === '/about' ? 'text-[#059473]' : 'text-slate-600'}`}>About Us</Link></li>
                <li><Link to="/contact" className={`py-2 block ${pathname === '/contact' ? 'text-[#059473]' : 'text-slate-600'}`}>Contact Us</Link></li>
              </ul>
              
            </div>
            
          </div>
      </div>

    </div>
  );
};

export default Header;
