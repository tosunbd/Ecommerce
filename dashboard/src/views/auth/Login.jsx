import { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { seller_login, messageClear } from '../../store/Reducers/authReducer';
import { toast } from 'react-hot-toast';
import { overrideStyle } from '../../utils/utils';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loader, errorMessage, successMessage, dispatchMessage } = useSelector(state => state.auth);

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(seller_login(state));
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate('/');
        }
        if (dispatchMessage) {
            toast.dispatch(dispatchMessage);
            dispatch(messageClear());
        }
    }, [errorMessage,successMessage])

    return (
        <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
            <div className='w-[350px] text-[#ffffff] p-2'>
                <div className='bg-[#6f68d1] p-4 rounded-md'>
                    <h2 className='mb-3 text-xl font-bold'>Welcome to ECommerce</h2>
                    <p className='mb-3 text-sm font-medium'>Please Sign in to your account</p>

                    <form onSubmit={submit}>

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="email">Email</label>
                            <input onChange={inputHandle} value={state.email} className='px-3 py-2 bg-transparent border rounded-md outline-none  border-slate-400' type="email" name='email' id='email' placeholder='Email' required />
                        </div>

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="name">Password</label>
                            <input onChange={inputHandle} value={state.password} className='px-3 py-2 bg-transparent border rounded-md outline-none  border-slate-400' type="password" name='password' id='password' placeholder='Password' required />
                        </div>

                        <button disabled={loader ? true : false} className='w-full py-2 mb-3 text-white rounded-md bg-slate-800 hover:shadow-blue-300/hover:shadow-lg px-7'>
                            {
                                loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Sign In'
                            }
                        </button>


                        {/* <button className='w-full py-2 mb-3 text-white rounded-md bg-slate-800 hover:shadow-blue-300/hover:shadow-lg px-7'>Sign In</button> */}

                        <div className='flex items-center justify-center gap-3 mb-3'>
                            <p>Don't have a account?
                                <Link className='font-bold' to={'/register'}> Sign Up</Link>
                            </p>
                        </div>

                        <div className='flex items-center justify-center w-full mb-3'>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                            <div className='w-[10%] flex justify-center items-center'>
                                <span className='pb-1'>or</span>
                            </div>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                        </div>

                        <div className='flex items-center justify-center gap-3'>
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