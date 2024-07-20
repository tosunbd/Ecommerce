import React from 'react';
import { FixedSizeList as List } from 'react-window';
import Pagination from "./../Pagination";
import { MdCurrencyExchange, MdProductionQuantityLimits } from 'react-icons/md';



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
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>$3434</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-sm'>
                        Pending
                    </span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>21-Jun-2024</div>
                {/* <div className='w-[20%] p-2 whitespace-nowrap'>
                    <button className='bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px 
                        cursor-pointer text-white rounded-sm text-sm]'>Confirm
                    </button>
                </div> */}
            </div>
        );
    };

    return (
        <List
            style={{ minWidth: '340px' }}
            height={350}
            itemCount={50}
            itemSize={35}
            outerElementType={outerElementType}
            width={'100%'}
        >
            {Row}
        </List>
    );
};



const Payments = () => {

    // const [currentPage, setCurrentPage] = useState(1);
    // const [searchValue, setSearchValue] = useState('');
    // const [itemsPerPage, setItemsPerPage] = useState(5);
    // const [show, setShow] = useState(false);
    
    return (
        <div className="px-2 md:px-7 py-5">

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
                <div className="flex justify-between items-center p-5 bg-[#fac8c8] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                        <h2 className='text-3xl font-bold'>$3434</h2>
                        <span className='text-md font-medium'>Total Sales</span>
                    </div>
                    <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl'>
                        <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
                <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                        <h2 className='text-3xl font-bold'>50</h2>
                        <span className='text-md font-medium'>Available Amount</span>
                    </div>
                    <div className='w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl'>
                        <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
                <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                        <h2 className='text-3xl font-bold'>10</h2>
                        <span className='text-md font-medium'>Withdrawal Amount</span>
                    </div>
                    <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
                        <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
                <div className="flex justify-between items-center p-5 bg-[#ebebff] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                        <h2 className='text-3xl font-bold'>1</h2>
                        <span className='text-md font-medium'>Pending Amount</span>
                    </div>
                    <div className='w-[40px] h-[47px] rounded-full bg-[#0f8eed] flex justify-center items-center text-xl'>
                        <MdCurrencyExchange className='text-[#ece8fa] shadow-lg' />
                    </div>
                </div>
            </div>

            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4'>

                <div className='bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5'>
                    <h2 className='text-lg text-left'>Send Request</h2>
                    <div className='pt-5 mb-5'>
                        <form action="">
                            <div className='flex gap-3 flex-wrap'>
                                <input type="number" min='0' className="px-3 py-2 md:w-[75%] focus:border-indigo-200
                                    outline-none bg-[#6a5fdf] border border-slate-700
                                    rounded-md text-[#d0d2d6]" id='amount' name='amount' />
                                <button
                                    type="submit"
                                    className='bg-red-500 hover:shadow-green-500/50
                                    hover:shadow-lg text-white rounded-sm px-7 py-2 self-start'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className=''>
                        <h2 className='text-lg text-left'>Pending Request</h2>

                        <div className='w-full'>
                            <div className='w-full overflow-x-auto'>
                                <div className='flex bg-[#a7a3d3] uppercase text-xs font-bold min-w-[340px] rounded-md'>
                                    <div className='w-[25%] p-2'> No </div>
                                    <div className='w-[25%] p-2'> Amount </div>
                                    <div className='w-[25%] p-2'> Status </div>
                                    <div className='w-[25%] p-2'> Date </div>
                                </div>
                                <PaymentRequests />
                            </div>

                        </div>
                    </div>

                </div>

                <div className='bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5'>
                    <div className=''>
                        <h2 className='text-lg text-left mb-2'>Successful Withdraw</h2>

                        <div className='w-full'>
                            <div className='w-full overflow-x-auto'>
                                <div className='flex bg-[#a7a3d3] uppercase text-xs font-bold min-w-[340px] rounded-md'>
                                    <div className='w-[25%] p-2'> No </div>
                                    <div className='w-[25%] p-2'> Amount </div>
                                    <div className='w-[25%] p-2'> Status </div>
                                    <div className='w-[25%] p-2'> Date </div>
                                </div>
                                <PaymentRequests />
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Payments;
