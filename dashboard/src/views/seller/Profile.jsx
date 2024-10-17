import { FaRegEdit } from "react-icons/fa";
import { FaImages } from "react-icons/fa6";
import { FadeLoader } from "react-spinners";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { toast } from 'react-hot-toast';
import { profile_image_upload, add_user_info, messageClear } from '../../store/Reducers/authReducers';

const Profile = () => {

    const dispatch = useDispatch();
    const { userInfo, loader, errorMessage, successMessage } = useSelector(state => state.auth);
    const status = 'active';

    const [state, setState] = useState({
        shopName: '',
        division: '',
        district: '',        
        sub_district: ''
    });

    const add_profile_image = (e) => {
        const file = e.target.files[0];
        if (file)
        {
            const formData = new FormData();
            formData.append('image', file);
            dispatch(profile_image_upload({ image: formData }));
        }
    };

    const addUserInfo = (e) => {
        e.preventDefault();
        dispatch(add_user_info(state)); // state should contain shopName, division, district, sub_district
    };
    
   

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);  // Display success message as toast
            dispatch(messageClear());  // Clear the message after displaying it
        }
        if (errorMessage) {
            toast.error(errorMessage);  // Display error message if any
            dispatch(messageClear());  // Clear the error message
        }
    }, [errorMessage, successMessage, dispatch]);
    
    
    
    
    return (
        <div className='px-2 lg:px-7 py-5'>
            <div className='w-full flex flex-wrap'>
                <div className="w-full md:w-6/12">
                    <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
                        <div className="flex justify-center items-center py-3">
                            {
                                userInfo?.image ? <label className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden" htmlFor="img">
                                    <img src={userInfo?.image} alt="" />
                                    {
                                        loader && <div className="bg-slate-600 absolute left-0 top-0 w-full h-full
                                        opacity-70 flex justify-center items-center z-20">
                                            <span>
                                                <FadeLoader />
                                            </span>
                                        </div>
                                    }
                                </label>
                                :
                                <label className='flex justify-center items-center flex-col 
                                h-[150px] w-[200px] cursor-pointer border border-dashed
                                hover:border-red-500 border-[#d0d2d6] relative' htmlFor='img'>
                                    <span><FaImages /></span>
                                    <span>Select Image</span>
                                    {
                                        loader && <div className="bg-slate-600 absolute left-0 top-0 w-full h-full
                                        opacity-70 flex justify-center items-center z-20">
                                            <span>
                                                <FadeLoader />
                                            </span>
                                        </div>
                                    }
                                </label>
                            }
                            <input onChange={add_profile_image} type="file" className="hidden" id="img" />
                        </div>

                        <div className="px-0 md:px-5 py-2">
                            <div className="flex justify-between text-sm flex-col 
                            gap-2 p-4 bg-slate-800 rounded-md relative">
                                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg
                                    hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                                    <FaRegEdit />
                                </span>
                                <div className="flex gap-2">
                                    <span>Name:</span>
                                    <span>{ userInfo?.name }</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Email:</span>
                                    <span>{ userInfo?.email }</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Role:</span>
                                    <span>{ userInfo?.role }</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Status:</span>
                                    <span>{ userInfo?.status }</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Payment Acount:</span>
                                    {
                                        status === 'active' ?
                                            <span className="bg-red-500 text-white text-xs 
                                            cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">{ userInfo?.payment }</span>
                                            : <span className="bg-blue-500 text-white text-xs 
                                            cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">Click Active</span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="px-0 md:px-5 py-2">
                            {
                                !userInfo?.shopInfo ? <form onSubmit={addUserInfo}>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label className='text-left' htmlFor="shop">Shop Name</label>
                                        <input value={state.shopName} onChange={inputHandle}
                                            className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                                            border border-slate-700 rounded-md text-[#d0d2d6]'
                                            type="text"
                                            name='shopName'
                                            id='shopName'
                                            placeholder='Shop Name'
                                        />
                                    </div>
                                    
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label className='text-left' htmlFor="division">Division Name</label>
                                        <input
                                            value={state.division}
                                            onChange={inputHandle}
                                            className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                                            border border-slate-700 rounded-md text-[#d0d2d6]'
                                            type="text"
                                            name='division'
                                            id='division'
                                            placeholder='Division Name'
                                        />
                                    </div>

                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label className='text-left' htmlFor="district">District Name</label>
                                        <input
                                            value={state.district}
                                            onChange={inputHandle}
                                            className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                                            border border-slate-700 rounded-md text-[#d0d2d6]'
                                            type="text"
                                            name='district'
                                            id='district'
                                            placeholder='District Name'
                                        />
                                    </div>

                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label className='text-left' htmlFor="subDistrict">Sub District Name</label>
                                        <input
                                            value={state.sub_district}
                                            onChange={inputHandle}
                                            className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                                            border border-slate-700 rounded-md text-[#d0d2d6]'
                                            type="text"
                                            name='sub_district'  // Updated name attribute
                                            id='subDistrict'
                                            placeholder='Sub District Name'
                                        />
                                    </div>

                                    <div>
                                        <button disabled={loader ? true : false}
                                            type="submit"
                                            className='bg-red-500 hover:shadow-red-500/40 mt-2
                                            hover:shadow-md text-white rounded-md px-7 py-2 my-2'>
                                            {
                                                loader ? <PropagateLoader color='#fff'
                                                cssOverride={overrideStyle} /> : 'Save Changes'
                                            } 
                                        </button>                                        
                                    </div>
                                </form>

                                    :

                                <div className="flex justify-between text-sm flex-col 
                                    gap-2 p-4 bg-slate-800 rounded-md relative">
                                    <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg
                                        hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                                        <FaRegEdit />
                                    </span>
                                    <div className="flex gap-2">
                                        <span>Shop Name:</span>
                                        <span>{ userInfo?.shopInfo?.shopName }</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Division:</span>
                                        <span>{ userInfo?.shopInfo?.division }</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>District:</span>
                                        <span>{ userInfo?.shopInfo?.district }</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Sub District:</span>
                                        <span>{ userInfo?.shopInfo?.sub_district }</span>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>
                <div className="w-full md:w-6/12">
                    <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0" >
                        <div className="bg-[#6a5fdf] rounded-md text-[#d0d2d6] p-4">
                            <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">Change Password</h1>
                            <form>
                                <div className='flex flex-col gap-1 mb-2'>
                                    <label className='text-left' htmlFor="email">Email</label>
                                    <input
                                        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                                        border border-slate-700 rounded-md text-[#d0d2d6]'
                                        type="email"
                                        name='email'
                                        id='email'
                                        placeholder='Email'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 mb-2'>
                                    <label className='text-left' htmlFor="o_password">Password</label>
                                    <input
                                        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                                        border border-slate-700 rounded-md text-[#d0d2d6]'
                                        type="password"
                                        name='o_password'
                                        id='o_password'
                                        placeholder='Old Password'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 mb-2'>
                                    <label className='text-left' htmlFor="n_password">New Password</label>
                                    <input
                                        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                                        border border-slate-700 rounded-md text-[#d0d2d6]'
                                        type="password"
                                        name='n_password'
                                        id='n_password'
                                        placeholder='New Password'
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className='bg-red-500 hover:shadow-red-500/40 mt-2
                                        hover:shadow-md text-white rounded-md px-7 py-2 my-2'>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;