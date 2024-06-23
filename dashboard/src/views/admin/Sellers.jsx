import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./../seller/Pagination";
import { FaEye } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";


const Sellers = () => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [show, setShow] = useState(false);
    
    
    return (

        <div className='px-2 lg:px-7 pt-5'>
            
            <h1 className='text-[25px] font-bold mb-3 text-left'>Sellers</h1>

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
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Image </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Name </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Shop Name </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Payment Status </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Email </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Division </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> District </th>
                                        <th scope='col' className='px-4 py-3 align-middle text-left'> Action </th>
                                    </tr>
                                </thead>
                               <tbody className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                   {[1, 2, 3, 4, 5].map((d, i) => (
                                       <tr key={i}>
                                           <td scope="row" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">{d}</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                                               <img className="w-[45px] h-[45px]" src={`http://localhost:5173/images/category/${encodeURIComponent(d)}.jpg`} alt="" />
                                           </td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Shoes</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Shoes Store</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Paid</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">tosunbd@gmail.com</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Dhaka</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Rampura</td>
                                           <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                                               <div className="flex justify-start items-center gap-4">
                                                   <Link className="p-[6px] bg-green-500 rounded hover:bg-green-500/50" to="/">
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

export default Sellers;