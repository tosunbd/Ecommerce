import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { admin_login, messageClear } from '../../store/Reducers/authReducers';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { overrideStyle } from '../../utils/utils';

const AdminLogin = () => {

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
        dispatch(admin_login(state));
        // console.log(state);
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
    }, [errorMessage,successMessage, dispatch])

    return (
        <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
            <div className='w-[350px] text-[#ffffff] p-2'>
                <div className='bg-[#6f68d1] p-4 rounded-md'>

                    <div className='h-[70px] flex justify-center items-center'>
                        <div className='w-[180px] h-[50px]'>
                            <img className='w-full h-full' src="http://localhost:5173/images/logo.png" alt="image" />
                        </div>
                    </div>

                    <form onSubmit={submit}>

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="email">Email</label>
                            <input onChange={inputHandle} value={state.email} className=' px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' type="email" name='email' id='email' placeholder='Email' required />
                        </div>

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="name">Password</label>
                            <input onChange={inputHandle} value={state.password} className=' px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' type="password" name='password' id='password' placeholder='Password' required />
                        </div>


                        <button disabled={loader ? true : false} className='bg-slate-800 w-full hover:shadow-blue-300/hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                            {
                                loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Login'
                            }
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default AdminLogin;