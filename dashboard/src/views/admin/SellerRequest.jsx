import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from "./../Pagination";
import { FaEye } from "react-icons/fa";
import Search from "../components/Search";
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { toast } from 'react-hot-toast';
import { get_seller_request, messageClear } from '../../store/Reducers/sellerReducer';

const SellerRequest = () => {
    const dispatch = useDispatch();
    const { loader, sellers, totalSeller } = useSelector(state => state.seller);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const obj = {
            itemsPerPage: parseInt(itemsPerPage),
            currentPage: parseInt(currentPage),
            searchValue
        };
        dispatch(get_seller_request(obj));
    }, [itemsPerPage, currentPage, searchValue, dispatch]);


    return (
        <div className='px-2 pt-5 lg:px-7'>
            <h1 className='text-[25px] font-bold mb-3 text-left'>Seller Request</h1>

            <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                <Search setItemsPerPage={setItemsPerPage} setSearchValue={setSearchValue} searchValue={searchValue} />

                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-[#d0d2d6]'>
                        <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='px-4 py-3 text-left align-middle'> No </th>
                                <th scope='col' className='px-4 py-3 text-left align-middle'> Name </th>
                                <th scope='col' className='px-4 py-3 text-left align-middle'> Email </th>
                                <th scope='col' className='px-4 py-3 text-left align-middle'> Payment Status </th>
                                <th scope='col' className='px-4 py-3 text-left align-middle'> Status </th>
                                <th scope='col' className='px-4 py-3 text-left align-middle'> Action </th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            {sellers.map((d, i) => (
                                <tr className="border-b border-slate-700" key={i}>
                                    <td scope="row" className="px-6 py-2 font-medium text-left align-middle whitespace-nowrap">{i+1}</td>
                                    <td scope="col" className="px-6 py-2 font-medium text-left align-middle whitespace-nowrap">{ d.name }</td>
                                    <td scope="col" className="px-6 py-2 font-medium text-left align-middle whitespace-nowrap">{ d.email }</td>
                                    <td scope="col" className="px-6 py-2 font-medium text-left align-middle whitespace-nowrap">
                                        <span> {d.payment} </span>
                                    </td>
                                    <td scope="col" className="px-6 py-2 font-medium text-left align-middle whitespace-nowrap">
                                        <span> {d.status} </span>
                                    </td>
                                    <td scope="col" className="px-6 py-2 font-medium text-left align-middle whitespace-nowrap">
                                    <div className="flex items-center justify-start gap-4">
                                        <Link to={`/admin/dashboard/seller/details/${d._id}`}  // Use backticks here for string interpolation
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

                <h1>{totalSeller} sellers found</h1>

                {totalSeller > itemsPerPage && (
                    <div className="flex justify-end w-full mt-4">
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={totalSeller}
                            perPage={itemsPerPage}
                            showItems={3}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerRequest;
