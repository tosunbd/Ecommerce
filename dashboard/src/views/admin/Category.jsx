import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./../seller/Pagination";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";


const Category = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [show, setShow] = useState(false);

    return (
        <div className='px-2 lg:px-7 pt-5'>

            <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md">
                <h1 className="text-[#d0d2d6] font-samibold text-lg">Category</h1>
                <button onClick={() => setShow(true)} className="bg-red-500 shadow-lg hover:shadow-red-500/40 py-2 px-4 cursor-pointer text-white rounded-sm text-sm">Add</button>
            </div>


            <div className='flex flex-wrap w-full'>

                <div className='w-full lg:w-7/12'>
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
                                        <th scope='col' className='px-6 py-3 align-middle text-left'> No </th>
                                        <th scope='col' className='px-6 py-3 align-middle text-left'> Image </th>
                                        <th scope='col' className='px-6 py-3 align-middle text-left'> Name </th>
                                        <th scope='col' className='px-6 py-3 align-middle text-left'> Action </th>
                                    </tr>
                                </thead>
                                <tbody className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                    {[1, 2, 3, 4].map((d, i) => (
                                        <tr key={i}>
                                            <td scope="row" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">{d}</td>
                                            <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                                                <img className="w-[45px] h-[45px]" src={`http://localhost:5173/images/category/${encodeURIComponent(d)}.jpg`} alt="" />
                                            </td>
                                            <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">T-Shirt</td>
                                            <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-4">
                                                    <Link className="p-[6px] bg-yellow-500 rounded hover:bg-yellow-500/50" to="/">
                                                        <FaEdit />
                                                    </Link>
                                                    <Link className="p-[6px] bg-red-500 rounded hover:bg-red-500/50" to="/">
                                                        <FaTrash />
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
                
                <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500`}>
                    <div className="w-full pl-5">
                        <div className='bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]'>
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center">Add Category</h1>
                                <div className="block lg:hidden">
                                    <IoMdCloseCircle onClick={() => setShow(false)} />
                                </div>
                            </div>
                            <form action="">

                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label className="text-left" htmlFor="name">Category Name</label>
                                    <input type="text" id="name" name="category_name" placeholder="Category Name" className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] 
                                border border-slate-700 rounded-md text-[#d0d2d6]" />
                                </div>
                                <div>
                                    <label className="flex justify-center items-center 
                                    flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]" htmlFor="image">
                                        <span><FaImage /></span>
                                        <span>Select Image</span>
                                    </label>
                                    <input className="hidden" type="file" id="image" name="image" />
                                    
                                    <div>
                                        <button className="bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">Add Category
                                        </button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Category;