import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaList } from 'react-icons/fa6';

const ChatSeller = () => {
    const [show, setShow] = useState(false);
    const sellerId = 65;

    return (
        <div className='px-2 lg:px-7 py-5'>
            <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-160px)] mt-[-20px] ml-[-20px]'>
                <div className='w-full h-full relative flex'>
                    <div className='w-[280px] h-full bg-[#9e97e9] overflow-y-auto'>
                        <div className='flex flex-col h-full'>
                            <div className='flex text-xl justify-between items-center p-4 text-white'>
                                <h2>Sellers</h2>

                                {sellerId && (
                                    <div className='relative'>
                                        <img className='w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full' src="http://localhost:5173/images/demo.jpg" alt="" />
                                        <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0' />
                                    </div>
                                )}
                                <span onClick={() => setShow(true)} className='block cursor-pointer md:hidden'><IoMdClose /></span>
                            </div>

                            <div className='mt-4'>
                                {['Taufiqul Islam', 'Tanzil Akter Eva', 'Tahmid Mubashshir Efaz'].map((name, index) => (
                                    <div key={index} className={`h-[60px] flex justify-start gap-2 
                                        items-center text-white px-2 py-2 ${index === 0 ? 'bg-[#8288ed]' : 'bg-[#6a5fdf]'}
                                        rounded-md cursor-pointer`}>
                                        <div className='relative'>
                                            <img className='w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full' src="http://localhost:5173/images/admin.jpg" alt="" />
                                            <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0' />
                                        </div>
                                        <div className='flex justify-center items-start flex-col w-full'>
                                            <div className='flex justify-between items-center w-full'>
                                                <h2 className='text-base font-semibold'>{name}</h2>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col gap-2 p-4 flex-grow'>
                            <div className='flex justify-start'>
                                <div className='flex items-center gap-2'>
                                    <div className='relative'>
                                        <img className='w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full' src="http://localhost:5173/images/admin.jpg" alt="" />
                                        <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0' />
                                    </div>
                                    <div className='bg-blue-500 text-white p-2 rounded-md'>
                                        How are you?
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <div className='flex items-center gap-2'>
                                    <div className='bg-red-500 text-white p-2 rounded-md'>
                                        How are you?
                                    </div>
                                    <div className='relative'>
                                        <img className='w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full' src="http://localhost:5173/images/admin.jpg" alt="" />
                                        <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form action="">
                            <div className='flex justify-between items-center p-4 bg-white'>
                                <input type='text' className='flex-grow p-2 border rounded-md' placeholder='Input Your Message' />
                                <button className='ml-2 p-2 bg-blue-500 text-white rounded-md'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSeller;
