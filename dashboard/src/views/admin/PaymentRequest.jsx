import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./../Pagination";

function handleOnWheel({ deltaY }) {
    if (deltaY > 0) {
        console.log('scrolling up');
    } else {
        console.log('scrolling down');
    }
}

const outerElementType = React.forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequests = () => {
    // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const Row = ({ index, style }) => {
        return (
            <div style={style} className='flex text-sm text-white fond-medium'>
                <div className='w-[20%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[20%] p-2 whitespace-nowrap'>$3434</div>
                <div className='w-[20%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-sm'>
                        Pending
                    </span>
                </div>
                <div className='w-[20%] p-2 whitespace-nowrap'>21-Jun-2024</div>
                <div className='w-[20%] p-2 whitespace-nowrap'>
                    <button className='bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px 
                        cursor-pointer text-white rounded-sm text-sm]'>Confirm
                    </button>
                </div>
            </div>
        );
    };

    return (
        <List
            style={{ minWidth: '340px' }}
            height={350}
            itemCount={10}
            itemSize={35}
            outerElementType={outerElementType}
            width={'100%'}
        >
            {Row}
        </List>
    );
};

const PaymentRequest = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [show, setShow] = useState(false);

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <h2 className='text-xl font-medium pb-5 text-[#d0d2d6] text-left'>Withdrawal Request</h2>
                <div className='w-full'>
                    <div className='w-full overflow-x-auto'>
                        <div className='flex bg-[#a7a3d3] uppercase text-xs font-bold min-w-[340px] rounded-md'>
                            <div className='w-[20%] p-2'> No </div>
                            <div className='w-[20%] p-2'> Amount </div>
                            <div className='w-[20%] p-2'> Status </div>
                            <div className='w-[20%] p-2'> Date </div>
                            <div className='w-[20%] p-2'> Action </div>
                        </div>
                        <PaymentRequests />
                    </div>

                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                            <Pagination
                                pageNumber={currentPage}
                                setPageNumber={setCurrentPage}
                                totalItem={50}
                                perPage={itemsPerPage}
                                showItems={3}
                            />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentRequest;
