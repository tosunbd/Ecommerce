import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from "./../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Search from "../components/Search";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { get_products, messageClear } from '../../store/Reducers/productReducers';

const Products = () => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, products, totalProduct } = useSelector(state => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  useEffect(() => {
    const fetchData = {
      itemsPerPage: parseInt(itemsPerPage),
      currentPage: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(fetchData));
  }, [itemsPerPage, currentPage, searchValue, dispatch]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[25px] font-bold mb-3 text-left'>All Products</h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search setItemsPerPage={setItemsPerPage} setSearchValue={setSearchValue} searchValue={searchValue} />

        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='px-4 py-3 align-middle text-left'>No</th>
                <th scope='col' className='px-4 py-3 align-middle text-left'>Image</th>
                <th scope='col' className='px-4 py-3 align-middle text-left'>Name</th>
                <th scope='col' className='px-4 py-3 align-middle text-left'>Category</th>
                <th scope='col' className='px-4 py-3 align-middle text-left'>Brand</th>
                <th scope='col' className='px-4 py-3 align-middle text-left'>Price</th>
                <th scope='col' className='px-4 py-3 align-middle text-left'>Discount</th>
                <th scope='col' className='px-4 py-3 align-middle text-left'>Stock</th>
                <th scope='col' className='px-4 py-3 align-middle text-left'>Action</th>
              </tr>
            </thead>

            <tbody className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                      <img className="w-[45px] h-[45px]" src={product?.images?.[0]} alt={product.name} />
                    </td>
                    <td className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                      {product?.name?.slice(0, 15)}...
                    </td>
                    <td className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                      {product.category}
                    </td>
                    <td className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                      {product.brand}
                    </td>
                    <td className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                      {product.price}
                    </td>
                    <td className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                      {product.discount === 0 ? <span>No Discount</span> : <span>{product.discount}%</span>}
                    </td>
                    <td className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                      {product.stock}
                    </td>
                    <td className="px-6 py-1 align-middle text-left font-medium whitespace-nowrap">
                      <div className="flex justify-start items-center gap-4">
                        <Link to={`/seller/dashboard/edit-product/${product.id}`} className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                          <FaEdit />
                        </Link>
                        <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50" to={`/products/view/${product.id}`}>
                          <FaEye />
                        </Link>
                        <Link className="p-[6px] bg-red-500 hover:shadow-lg hover:shadow-red-500/50" to={`/products/delete/${product.id}`}>
                          <FaTrash />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalProduct <= itemsPerPage && (
          <div className="w-full flex justify-end mt-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalProduct}
              perPage={itemsPerPage}
              showItems={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
