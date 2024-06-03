import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const Login = () => {
    return (
        <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>            
            <div className='w-[350px] text-[#ffffff] p-2'>
                <div className='bg-[#6f68d1] p-4 rounded-md'>
                    <h2 className='text-xl mb-3 font-bold'>Welcome to ECommerce</h2>
                    <p className='text-sm mb-3 font-medium'>Please Sign in to your account</p>

                    <form>
                    

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="email">Email</label>
                            <input className=' px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' type="text" name='email' id='email' placeholder='Email' required />
                        </div>

                         <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="name">Password</label>
                            <input className=' px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' type="text" name='password' id='password' placeholder='Password' required />
                        </div>


                        <button className='bg-slate-800 w-full hover:shadow-blue-300/hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>Sign In</button>

                        <div className='flex items-center mb-3 gap-3 justify-center'>
                            <p>Don't have a account?
                                <Link className='font-bold' to={'/register'}> Sign Up</Link>
                            </p>
                        </div>

                        <div className='w-full flex items-center items-center mb-3'>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                            <div className='w-[10%] flex justify-center items-center'>
                                <span className='pb-1'>or</span>
                            </div>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                        </div>

                        <div className='flex justify-center items-center gap-3'>
                            <div className='w-[135%] h-[35px] flex rounded-md 
                            bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>                            
                                <span><FaGoogle /></span>
                            </div>

                            <div className='w-[135%] h-[35px] flex rounded-md 
                            bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden'>                            
                                <span><FaFacebook /></span>
                            </div> 
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;