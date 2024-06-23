import React from 'react';

const SellerDetails = () => {
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[25px] font-bold mb-3 text-left'>Seller Details</h1>
            <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                <div className='w-full flex flex-wrap text-[#d0d2d6]'>
                    <div className='w-3/12 flex justify-center items-center py-3'>
                        <div>
                            <img className='w-full h-[230px]' src="http://localhost:5173/images/demo.jpg" alt="" />
                        </div>

                    </div>
                    <div className='w-4/12'>
                        <div className='px-0 md-px-5 py-2'>
                            <div className='py-2 text-lg'>
                                <h2>Basic Info</h2>
                            </div>
                        </div>
                    </div>
                    <div className='w-4/12'>

                    </div>

                </div>
            </div>            
        </div>
    );
};

export default SellerDetails;