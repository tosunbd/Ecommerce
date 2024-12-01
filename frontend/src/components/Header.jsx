import { MdEmail } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full bg-[#caddff]">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-[50px] px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          {/* Email */}
          <div className="flex items-center gap-2 text-sm text-black">
            <MdEmail />
            <span>support@gmail.com</span>
          </div>
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

          {/* Language */}
          <div className="flex items-center space-x-2">
            <img
              src="https://flagcdn.com/w40/us.png"
              alt="USA Flag"
              className="h-4 w-6"
            />
            <span>EN</span>
          </div>

          {/* User */}
          <div className="flex items-center space-x-2">
            <span>Taufiqul Islam</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
