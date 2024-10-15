import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { toast } from 'react-hot-toast';
import { get_category } from '../../store/Reducers/categoryReducers';
import { get_product, update_product, messageClear } from '../../store/Reducers/productReducers';

const EditProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    
    const { categories } = useSelector(state => state.category);
    const { loader, errorMessage, successMessage, product } = useSelector(state => state.product);

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [allCategory, setAllCategory] = useState(categories || []);
    const [images, setImages] = useState([]);
    const [imageShow, setImageShow] = useState([]);

    useEffect(() => {
        dispatch(get_category({
            itemsPerPage: '',
            currentPage: '',
            searchValue: ''
        }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(get_product(productId));
    }, [productId, dispatch]);

    const [state, setState] = useState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const categorySearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        
        if (value) {
            const srcValue = categories.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
            setAllCategory(srcValue);
        } else {
            setAllCategory(categories);
        }
    };

    const changeImage = (img, files) => {
        if (files.length > 0) {
            console.log(img);
            console.log(files[0]);
        }
    };

    useEffect(() => {
        if (product) {
            setState({
                name: product.name || '',
                description: product.description || '',
                discount: product.discount || '',
                price: product.price || '',
                brand: product.brand || '',
                stock: product.stock || ''
            });
            setCategory(product.category || '');
            setImageShow(product.images || []);
        }
    }, [product]);    

    const updateProduct = (e) => {
        e.preventDefault();
        const obj = {
            name: state.name,
            description: state.description,
            discount: state.discount,
            price: state.price,
            brand: state.brand,
            stock: state.stock,
            category,
            productId
        };
        dispatch(update_product(obj));
    };
    

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());            
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());            
        }
    }, [errorMessage, successMessage, dispatch]);

    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#d0d2d6] text-xl font-semibold'>Edit Product</h1>
                    <Link to="/seller/dashboard/products" className='bg-blue-500 hover:shadow-blue-500/50 
                    hover:shadow-lg text-white rounded-sm px-7 py-2 my-2'>All Products</Link>
                </div>
                <div>
                    <form onSubmit={updateProduct}>
                        <div className='grid grid-cols-2 gap-4 mb-3 text-[#d0d2d6]'>
                            <div className='flex flex-col gap-1'>
                                <label className='text-left' htmlFor="name">Product Name</label>
                                <input
                                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    onChange={inputHandle}
                                    value={state.name}
                                    type="text"
                                    name='name'
                                    id='name'
                                    placeholder='Product Name'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-left' htmlFor="brand">Brand Name</label>
                                <input
                                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    onChange={inputHandle}
                                    value={state.brand}
                                    type="text"
                                    name='brand'
                                    id='brand'
                                    placeholder='Brand Name'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4 mb-3 text-[#d0d2d6]'>
                            <div className='flex flex-col gap-1 relative'>
                                <label className='text-left' htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    onClick={() => setCateShow(!cateShow)}
                                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] 
                                    border border-slate-700 rounded-md text-[#d0d2d6]'
                                    onChange={categorySearch}
                                    value={category}
                                    name='category'
                                    id='category'
                                    placeholder='--Select Category--'
                                />
                                <div className={`absolute top-[101%] bg-[#475569] w-full transition-all ${cateShow ? 'scale-100' : 'scale-0'}`}>
                                    <div className='w-full px-4 py-2'>
                                        <input
                                            type="text"
                                            onChange={categorySearch}
                                            value={searchValue}
                                            className='px-3 py-1 w-full focus:border-indigo-500 
                                            outline-none bg-[#6a5fdf] border border-slate-700
                                            rounded-md text-[#d0d2d6]'
                                            placeholder='Search'
                                        />
                                    </div>
                                    <div className='flex flex-col justify-start items-start h-[200px] overflow-y-scroll mt-2 text-left'>
                                        {allCategory && allCategory.length > 0 ? (
                                            allCategory.map((c, i) => (
                                                <span
                                                    key={i}
                                                    onClick={() => {
                                                        setCateShow(false);
                                                        setCategory(c.name);
                                                        setSearchValue('');
                                                        setAllCategory(categories);
                                                    }}
                                                    className='cursor-pointer p-1 w-full hover:bg-indigo-500'>
                                                    {c.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span>No Categories Found</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-left' htmlFor="stock">Product Stock</label>
                                <input
                                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    onChange={inputHandle}
                                    value={state.stock}
                                    type="text"
                                    name='stock'
                                    id='stock'
                                    placeholder='Product Stock'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4 mb-3 text-[#d0d2d6]'>
                            <div className='flex flex-col gap-1'>
                                <label className='text-left' htmlFor="price">Price</label>
                                <input
                                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    onChange={inputHandle}
                                    value={state.price}
                                    type="number"
                                    name='price'
                                    id='price'
                                    placeholder='Price'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-left' htmlFor="discount">Discount</label>
                                <input
                                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    onChange={inputHandle}
                                    value={state.discount}
                                    type="number"
                                    name='discount'
                                    id='discount'
                                    placeholder='% Discount'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col mb-5 gap-4 text-[#d0d2d6]'>
                            <div className='flex flex-col gap-1'>
                                <label className='text-[#d0d2d6] text-left' htmlFor="description">Description</label>
                                <textarea
                                    className='px-4 py-2 focus:border-indigo-500 outline-none
                                    bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    onChange={inputHandle}
                                    value={state.description}
                                    name='description'
                                    id='description'
                                    placeholder='Description'
                                    rows={5}
                                    cols={10}
                                />
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-4 grid-col-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3
                            w-full text-[#d0d2d6] mb-4">
                            {imageShow && imageShow.length > 0 ? (
                                imageShow.map((img, i) => (
                                    <div key={i}>
                                        <label htmlFor={i}>
                                            <img src={img} alt="" />
                                        </label>
                                        <input onChange={(e) => changeImage(img, e.target.files)} type="file" id={i} className='hidden' />
                                    </div>
                                ))
                            ) : (
                                <p>No Images Available</p>
                            )}
                        </div>

                        <div className=''>
                            {/* <button
                                type="submit"
                                className='bg-red-500 hover:shadow-green-500/50
                                hover:shadow-lg text-white rounded-sm px-7 py-2'>
                                {
                                    loader ? <PropagateLoader color='#fff'
                                    cssOverride={overrideStyle} /> : 'Save Changes'
                                }                                
                            </button> */}
                             <button disabled={loader}
                                className='bg-red-500 hover:shadow-green-500/50
                                hover:shadow-lg text-white rounded-sm px-7 py-2'>
                                {
                                    loader ? <PropagateLoader color='#fff'
                                    cssOverride={overrideStyle} /> : 'Save Changes'
                                }
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
