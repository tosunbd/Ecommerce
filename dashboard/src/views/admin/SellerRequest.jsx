import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./../Pagination";
import { FaEye } from "react-icons/fa";


const SellerRequest = () => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [show, setShow] = useState(false);
    
    
    return (

        <div className='px-2 lg:px-7 pt-5'>
            
            <h1 className='text-[25px] font-bold mb-3 text-left'>Deactivate Sellers</h1>
            
            <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                
                <div className="flex justify-between items-center">
                    <select onChange={e => setItemsPerPage(parseInt(e.target.value))} className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] 
                        border border-slate-700 rounded-md text-[#d0d2d6]">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input type="text" placeholder="Search..." className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] 
                        border border-slate-700 rounded-md text-[#d0d2d6]" />
                </div>

                <div className='relative overflow-x-auto'>
                           
                           <table className='w-full text-sm text-[#d0d2d6]'>
                                <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                    <tr>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> No </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Name </th>           
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Email </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Payment Status </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Status </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Action </th>
                                    </tr>
                                </thead>
                               <tbody className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                   {[1, 2, 3, 4, 5].map((d, i) => (
                                       <tr className="border-b border-slate-700" key={i}>
                                           <td scope="row" className="px-6 py-2 align-middle text-left font-medium whitespace-nowrap">{d}</td>
                                           <td scope="col" className="px-6 py-2 align-middle text-left font-medium whitespace-nowrap">Taufiqul Islam</td>
                                           <td scope="col" className="px-6 py-2 align-middle text-left font-medium whitespace-nowrap">tosunbd@gmail.com</td>
                                           <td scope="col" className="px-6 py-2 align-middle text-left font-medium whitespace-nowrap">Active</td>
                                           <td scope="col" className="px-6 py-2 align-middle text-left font-medium whitespace-nowrap">Deactive</td>
                                           <td scope="col" className="px-6 py-2 align-middle text-left font-medium whitespace-nowrap">
                                           <div className="flex justify-start items-center gap-4">
                                                <Link to='/admin/dashboard/seller/details/2'
                                                    className="p-[6px] bg-green-500 rounded hover:bg-green-500/50">
                                                    <FaEye />
                                                </Link>
                                            </div>

                                           </td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>

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
    );
};

export default SellerRequest;