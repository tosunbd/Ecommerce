import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNav } from '../navigation/index';
import { BiLogOutCircle } from 'react-icons/bi';

const Sidebar = ({ showSidebar, setShowSidebar }) => {

    const location = useLocation();
    const pathName = location.pathname;
    const [allNav, setAllNav] = useState([]);

    useEffect(() => {    
        const navs = getNav('admin');
        setAllNav(navs);
    }, []);

    return (
        <div>            
        <div onClick={() => setShowSidebar(false)} className={`fixed duration-200 ${!showSidebar ? 'invisible' : 'visible'} w-screen h-screen f bg-[#8cbce780] top-0 left-0 z-10`}>
          
            </div>
        <div className={`w-[260px] h-screen fixed bg-[#e6e7fb] z-50 top-0 shadow-[0_0_15px_0_rgba(34,41,47,0.05)] transition-all
            ${showSidebar ? 'left-0' : '-left-[260px]'} lg:left-0`}>
                <div className='h-[70px] flex justify-center items-center'>
                    <Link to='/' className='w-[180px] h-[50px]'>
                        <img className='w-full h-full' src="http://localhost:5173/images/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className='px-[16px]'>
                    
                    <ul>
                        {allNav.map((n, i) => (
                            <li
                                key={i}
                                className={`rounded-sm flex justify-start items-center gap-[12px] transition-all mb-1 ${
                                    pathName === n.path ? 'bg-blue-500 shadow-indigo-500/50' : ''
                                }`}
                            >
                                <Link
                                    to={n.path}
                                    className={`px-[12px] py-[9px] flex justify-start items-center gap-[12px] transition-all duration-200 hover:pl-4 ${
                                        pathName === n.path
                                            ? 'text-black font-bold'
                                            : 'text-black hover:text-blue-700'
                                    }`}
                                >
                                    <span>{n.icon}</span>
                                    <span>{n.title}</span>
                                </Link>
                            </li>
                            
                        ))}
              
                      <li>
                        <button className='text-[#030811] font-bold duration-200 px-[12px] py-[9px] flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1'>
                        <span><BiLogOutCircle /></span>
                        <span>Logout</span>
                        </button>
                      </li>
          
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
