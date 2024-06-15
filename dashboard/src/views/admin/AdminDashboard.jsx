import { MdCurrencyExchange, MdProductionQuantityLimits } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import Chart from 'react-apexcharts';
import { Link } from  'react-router-dom';

const AdminDashboard = () => {

    const state = {
        series: [
            {
                name: "Orders",
                data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78]
            },
            {
                name: "Revenues",
                data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78]
            },
            {
                name: "Sellers",
                data: [67, 39, 40, 76, 46, 74, 43, 26, 78, 87]
            }
        ],
        options: {
            colors: ["#181ee8", "#ff4560", "#00e396"],
            plotOptions: {
                bar: {
                    borderRadius: 10,
                }
            },
            chart: {
                background: 'transparent',
                foreColor: '#d0d2d6'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                colors: ['#f0f0f0'],
                width: 2,
                dashArray: 0
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
            },
            legend: {
                position: 'top'
            }
            // ,
            // responsive: [
            //     {
            //         breakpoint: 565,
            //         options: {
            //             yaxis: {
            //                 categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
            //             },
            //             plotOptions: {
            //                 bar: {
            //                     horizontal: true,
            //                 }
            //             }, 
            //             chart: {
            //                 height: 550,
            //                 type: 'bar',
            //             },
            //         }
            //     }
            // ]
        }
    };
    

    return (
        <div className="px-2 md:px-7 py-5">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
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
                        <h2 className='text-3xl font-bold'>$3434</h2>
                        <span className='text-md font-medium'>Total Sales</span>
                    </div>
                    <div className='w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl'>
                        <MdProductionQuantityLimits className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
                <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                        <h2 className='text-3xl font-bold'>10</h2>
                        <span className='text-md font-medium'>Sellers</span>
                    </div>
                    <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
                        <FaUsers className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
                <div className="flex justify-between items-center p-5 bg-[#ebebff] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                        <h2 className='text-3xl font-bold'>54</h2>
                        <span className='text-md font-medium'>Orders</span>
                    </div>
                    <div className='w-[40px] h-[47px] rounded-full bg-[#0200f8eed] flex justify-center items-center text-xl'>
                        <FaCartShopping className='text-[#ece8fa] shadow-lg' />
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-wrap mt-7">
                <div className="w-full lg:w-7/12 lg:pr-3">
                    <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
                        <Chart options={state.options} series={state.series} type="bar" height={350} />
                    </div>
                </div>

                <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
                    
                    <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
                        
                        <div className="flex justify-between items-center">
                            <h2 className='font-samibold text-lg text-[#d0d2d6] pb-3'>Recent Seller Message</h2>
                            <Link className='font-samibold text-[#d0d2d6] text-sm' to='/'>View All</Link>
                        </div>
                   
                        <div className='flex flex-col gap-2 pt-6 text-[#d0d2d6]'>
                            <ol className='relative boarder-1 border-slate-600 ml-4'>

                                <li className='mb-3 ml-6 relative'>
                                    <div className='flex absolute -left-11 shadow-lg justify-center items-center w-10 h-10 p-[2px] bg-[#4c7fe2] rounded-full z-10'>
                                        <img className='w-full h-full rounded-full' src="http://localhost:5173/images/admin.jpg" alt="Admin" />
                                    </div>
                                    <div className='p-3 bg-slate-800 rounded-lg border-slate-600 shadow-sm'>
                                        <div className='flex justify-between items-center mb-2'>
                                            <Link className='text-md font-normal'>Admin</Link>
                                            <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>2 day ago</time>
                                        </div>
                                        <div className='p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800 text-left'>
                                            How are you
                                        </div>
                                    </div>
                                </li>

                                <li className='mb-3 ml-6 relative'>
                                    <div className='flex absolute -left-11 shadow-lg justify-center items-center w-10 h-10 p-[2px] bg-[#4c7fe2] rounded-full z-10'>
                                        <img className='w-full h-full rounded-full' src="http://localhost:5173/images/admin.jpg" alt="Admin" />
                                    </div>
                                    <div className='p-3 bg-slate-800 rounded-lg border-slate-600 shadow-sm'>
                                        <div className='flex justify-between items-center mb-2'>
                                            <Link className='text-md font-normal'>Admin</Link>
                                            <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>2 day ago</time>
                                        </div>
                                        <div className='p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800 text-left'>
                                            How are you
                                        </div>
                                    </div>
                                </li>
                               
                                <li className='mb-2 ml-6 relative'>
                                    <div className='flex absolute -left-11 shadow-lg justify-center items-center w-10 h-10 p-[2px] bg-[#4c7fe2] rounded-full z-10'>
                                        <img className='w-full h-full rounded-full' src="http://localhost:5173/images/admin.jpg" alt="Admin" />
                                    </div>
                                    <div className='p-3 bg-slate-800 rounded-lg border-slate-600 shadow-sm'>
                                        <div className='flex justify-between items-center mb-2'>
                                            <Link className='text-md font-normal'>Admin</Link>
                                            <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>2 day ago</time>
                                        </div>
                                        <div className='p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800 text-left'>
                                            How are you
                                        </div>
                                    </div>
                                </li>

                            </ol>

                        </div>
                    </div>
                </div>

            </div>


            <div className='w-full p-4 bg-[#6a5fdf] rounded-md mt-6'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-samibold text-lg text-[#d0d2d6] pb-3'>Recent Orders</h2>
                    <Link className='font-samibold text-[#d0d2d6] text-sm' to='/'>View All</Link>
                </div>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-[#d0d2d6]'>
                        <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='px-6 py-3'> Order Id </th>
                                <th scope='col' className='px-6 py-3'> Price </th>
                                <th scope='col' className='px-6 py-3'> Payment Status </th>
                                <th scope='col' className='px-6 py-3'> Order Status </th>
                                <th scope='col' className='px-6 py-3'> Active </th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            { [1, 2, 3, 4, 5].map((d, i) => (
                                <tr key={i}>
                                <td scope="row" className="px-4 py-3 font-medium whitespace-nowrap">#34344</td>
                                <td scope="col" className="px-4 py-3 font-medium whitespace-nowrap">$454</td>
                                <td scope="col" className="px-4 py-3 font-medium whitespace-nowrap">Pending</td>
                                <td scope="col" className="px-4 py-3 font-medium whitespace-nowrap">Pending</td>
                                <td scope="col" className="px-4 py-3 font-medium whitespace-nowrap">
                                    <Link className="text-md font-normal" to="/">View</Link>
                                </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
