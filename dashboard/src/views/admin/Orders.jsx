import { useState } from "react";
import { LuArrowDownSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import Pagination from "./../Pagination";



const Orders = () => {
    // const state;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [show, setShow] = useState(false);
    // const indexOfLastItem = currentPage * itemsPerPage;


    return (
        <div className="px-2 lg:px-7 pt-5">
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

                <div className="relative mt-5 overflow-x-auto">
                    <div className="w-full text-sm text-left text-[#d0d2d6]">
                        <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                            <div className="flex justify-between items-center">
                                <div className="py-3 w-[25%] font-bold">Order id</div>
                                <div className="py-3 w-[13%] font-bold">Price</div>
                                <div className="py-3 w-[18%] font-bold">Payment status</div>
                                <div className="py-3 w-[18%] font-bold">Order status</div>
                                <div className="py-3 w-[18%] font-bold">Action</div>
                                <div className="py-3 w-[8%] font-bold"><LuArrowDownSquare /></div>
                            </div>
                        </div>
                        
                        <div className="text-[#d0d2d6]">

                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-3 w-[25%] font-medium whitespace-nowrap">#34343</div>
                                <div className="py-3 w-[13%] font-medium">$654</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <Link className="py-3 w-[18%] font-medium" to="/admin/dashboard/order/details/3">View</Link>
                                <div onClick={(e) => setShow(!show)} className="py-3 w-[8%] font-medium"><LuArrowDownSquare /></div>
                            </div>

                            <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                    <div className="py-3 w-[13%] font-medium">$56</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                </div>
                            </div>

                            <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                    <div className="py-3 w-[13%] font-medium">$56</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                </div>
                            </div>

                        </div>

                          <div className="text-[#d0d2d6]">

                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-3 w-[25%] font-medium whitespace-nowrap">#34343</div>
                                <div className="py-3 w-[13%] font-medium">$654</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <Link className="py-3 w-[18%] font-medium" to="/admin/orders/34343">View</Link>
                                <div onClick={(e) => setShow(!show)} className="py-3 w-[8%] font-medium"><LuArrowDownSquare /></div>
                            </div>

                            <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                    <div className="py-3 w-[13%] font-medium">$56</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                </div>
                            </div>

                            <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                    <div className="py-3 w-[13%] font-medium">$56</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                </div>
                            </div>

                        </div>


                        <div className="text-[#d0d2d6]">

                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-3 w-[25%] font-medium whitespace-nowrap">#34343</div>
                                <div className="py-3 w-[13%] font-medium">$654</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <Link className="py-3 w-[18%] font-medium" to="/admin/orders/34343">View</Link>
                                <div onClick={(e) => setShow(!show)} className="py-3 w-[8%] font-medium"><LuArrowDownSquare /></div>
                            </div>

                            <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                    <div className="py-3 w-[13%] font-medium">$56</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                </div>
                            </div>

                            <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                    <div className="py-3 w-[13%] font-medium">$56</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                    <div className="py-3 w-[18%] font-medium">Pending</div>
                                </div>
                            </div>

                        </div>

                        <div className="text-[#d0d2d6]">

                        <div className="flex justify-between items-start border-b border-slate-700">
                            <div className="py-3 w-[25%] font-medium whitespace-nowrap">#34343</div>
                            <div className="py-3 w-[13%] font-medium">$654</div>
                            <div className="py-3 w-[18%] font-medium">Pending</div>
                            <div className="py-3 w-[18%] font-medium">Pending</div>
                            <Link className="py-3 w-[18%] font-medium" to="/admin/orders/34343">View</Link>
                            <div onClick={(e) => setShow(!show)} className="py-3 w-[8%] font-medium"><LuArrowDownSquare /></div>
                        </div>

                        <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                            <div className="flex justify-start items-start border-b border-slate-700">
                                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                <div className="py-3 w-[13%] font-medium">$56</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                            </div>
                        </div>

                        <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                            <div className="flex justify-start items-start border-b border-slate-700">
                                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                <div className="py-3 w-[13%] font-medium">$56</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                            </div>
                        </div>

                        </div>



                        <div className="text-[#d0d2d6]">

                        <div className="flex justify-between items-start border-b border-slate-700">
                            <div className="py-3 w-[25%] font-medium whitespace-nowrap">#34343</div>
                            <div className="py-3 w-[13%] font-medium">$654</div>
                            <div className="py-3 w-[18%] font-medium">Pending</div>
                            <div className="py-3 w-[18%] font-medium">Pending</div>
                            <Link className="py-3 w-[18%] font-medium" to="/admin/orders/34343">View</Link>
                            <div onClick={(e) => setShow(!show)} className="py-3 w-[8%] font-medium"><LuArrowDownSquare /></div>
                        </div>

                        <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                            <div className="flex justify-start items-start border-b border-slate-700">
                                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                <div className="py-3 w-[13%] font-medium">$56</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                            </div>
                        </div>

                        <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                            <div className="flex justify-start items-start border-b border-slate-700">
                                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                <div className="py-3 w-[13%] font-medium">$56</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                            </div>
                        </div>

                        </div>

                        <div className="text-[#d0d2d6]">

                        <div className="flex justify-between items-start border-b border-slate-700">
                            <div className="py-3 w-[25%] font-medium whitespace-nowrap">#34343</div>
                            <div className="py-3 w-[13%] font-medium">$654</div>
                            <div className="py-3 w-[18%] font-medium">Pending</div>
                            <div className="py-3 w-[18%] font-medium">Pending</div>
                            <Link className="py-3 w-[18%] font-medium" to="/admin/orders/34343">View</Link>
                            <div onClick={(e) => setShow(!show)} className="py-3 w-[8%] font-medium"><LuArrowDownSquare /></div>
                        </div>

                        <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                            <div className="flex justify-start items-start border-b border-slate-700">
                                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                <div className="py-3 w-[13%] font-medium">$56</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                            </div>
                        </div>

                        <div className={ show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden' }>
                            <div className="flex justify-start items-start border-b border-slate-700">
                                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#3434</div>
                                <div className="py-3 w-[13%] font-medium">$56</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                                <div className="py-3 w-[18%] font-medium">Pending</div>
                            </div>
                        </div>

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
        </div>
    );
};

export default Orders;