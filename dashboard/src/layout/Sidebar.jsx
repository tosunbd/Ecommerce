import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNav } from '../navigation/index';

const Sidebar = () => {

    const { pathName } = useLocation();
    const [allNav, setAllNav] = useState([]);
    useState(() => {    
        const navs = getNav('admin');
        setAllNav(navs)
    }, [])

    console.log(allNav);

    return (
        <div>            
            <div></div>
            <div className={`w-[260px] h-screen fixed bg-[#e6e7fb] z-50 top-0 shadow-[0_0_15px_0_rgba(34,41,47,0.05)] transition-all`}>
                <div className='h-[70px] flex justify-center items-center'>
                    <Link to='/' className='w-[180px] h-[50px]'>
                        <img className='w-full h-full' src="http://localhost:5173/images/logo.png" alt="" />
                    </Link>
                </div>
                <div className='px-[16px]'>
                    <ul>
                        {
                           allNav.map((n, i) => (
                            <li key={i}>
                              <Link
                                to={n.path}
                                className={`${
                                  pathName === n.path
                                  ? 'bg-blue-600 shadow-indigo-500/50 text-white duration-500'
                                  : 'bg-blue-600 text-white font-bold duration-200 hover:text-blue-700'
                                } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all mb-1`}
                              >
                                <span>{n.icon}</span>
                                <span>{n.title}</span>
                              </Link>


                            </li>
                          ))
                          
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;