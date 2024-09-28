import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from "./../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Search from "../components/Search";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { get_products, messageClear } from '../../store/Reducers/productReducers';


const Products = () => {

    const dispatch = useDispatch();
    const { loader, errorMessage, successMessage, products, totalProduct } = useSelector(state => state.product);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [show, setShow] = useState(false);
    const [imageShow, setImage] = useState('');

    // useEffect(() => {
    //     if (successMessage) {
    //         toast.success(successMessage);
    //         dispatch(messageClear());
    //         setState({
    //             name: '',
    //             image: null
    //         });
    //         setImage('');
    //     }
    //     if (errorMessage) {
    //         toast.error(errorMessage);
    //         dispatch(messageClear());
    //         setState({
    //             name: '',
    //             image: null
    //         });
    //         setImage('');
    //     }
    // }, [errorMessage, successMessage, dispatch]);


    useEffect(() => {
        const obj = {
            itemsPerPage: parseInt(itemsPerPage),
            currentPage: parseInt(currentPage),
            searchValue
        };
        dispatch(get_products(obj));
    }, [itemsPerPage, currentPage, searchValue, dispatch]);



    return (

        <div className='px-2 lg:px-7 pt-5'>

            <h1 className='text-[25px] font-bold mb-3 text-left'>All Products</h1>

            <div className="w-full p-4 bg-[#6a5fdf] rounded-md">

                <Search setItemsPerPage = {setItemsPerPage} setSearchValue = {setSearchValue} searchValue = {searchValue} />

                    <div className='relative overflow-x-auto'>

                        <table className='w-full text-sm text-[#d0d2d6]'>
                            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                <tr>
                                    <th scope='col' className='px-4 py-3 align-middle text-left'> No </th>
                                    <th scope='col' className='px-4 py-3 align-middle text-left'> Image </th>
                                    <th scope='col' className='px-4 py-3 align-middle text-left'> Name </th>
                                    <th scope='col' className='px-4 py-3 align-middle text-left'> Category </th>
                                    <th scope='col' className='px-4 py-3 align-middle text-left'> Brand </th>
                                    <th scope='col' className='px-4 py-3 align-middle text-left'> Price </th>
                                    <th scope='col' className='px-4 py-3 align-middle text-left'> Discount </th>
                                    <th scope='col' className='px-4 py-3 align-middle text-left'> Stock </th>
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
                                        <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Man Full Sleeve</td>
                                        <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Veirdo</td>
                                        <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">Numero Uno</td>
                                        <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">$454</td>
                                        <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">10%</td>
                                        <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">20</td>
                                        <td scope="col" className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                                            <div className="flex justify-start items-center gap-4">
                                                <Link to={`/seller/dashboard/edit-product/3`} className="p-[6px] bg-yellow-500 rounded
                                                hover:shadow-lg hover:shadow-yellow-500/50">
                                                    <FaEdit />
                                                </Link>
                                                <Link className="p-[6px] bg-green-500 rounded
                                                hover:shadow-lg hover:shadow-green-500/50" to="/">
                                                    <FaEye />
                                                </Link>
                                                <Link className="p-[6px] bg-red-500 
                                                hover:shadow-lg hover:shadow-red-500/50" to="/">
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
    );
};

export default Products;