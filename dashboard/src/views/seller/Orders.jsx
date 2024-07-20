import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Search from "../components/Search";

const Orders = () => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [show, setShow] = useState(false);
    
    
    return (

        <div className='px-2 lg:px-7 pt-5'>
            
            <h1 className='text-[25px] font-bold mb-3 text-left'>Orders</h1>

            <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                
               <Search setItemsPerPage = {setItemsPerPage} setSearchValue = {setSearchValue} searchValue = {searchValue} />

                <div className='relative overflow-x-auto'>
                           
                           <table className='w-full text-sm text-[#d0d2d6]'>
                                <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                    <tr>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> No </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Order ID </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Price </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Payment Status </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Order Status </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Action </th>
                                    </tr>
                                </thead>
                               <tbody className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                   {[1, 2, 3, 4, 5].map((d, i) => (
                                       <tr key={i}>
                                           <td scope="row" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">{d}</td>
                                           
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">34343</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">$562</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Pending</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Pending</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                                               <div className="flex justify-start items-center gap-4">
                                                   <Link className="p-[6px] bg-green-500 rounded
                                                   hover:shadow-lg hover:shadow-green-500/50" to={`/seller/dashboard/orders/details/3`}>
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

export default Orders;