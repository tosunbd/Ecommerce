import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import Category from './../admin/Category';

const AddProduct = () => {
    const categories = [
        { id: 1, name: 'Sports' },
        { id: 2, name: 'Tshirt' },
        { id: 3, name: 'Mobile' },
        { id: 4, name: 'Computer' },
        { id: 5, name: 'Watch' },
        { id: 6, name: 'Pant' }
    ];

    const [state, setState] = useState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: '',
        category: ''
    });

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [allCategory, setAllCategory] = useState(categories);

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

    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#d0d2d6] text-xl font-semibold'>Add Product</h1>
                    <Link to="/admin/dashboard/products" className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2'>All Products</Link>
                </div>
                <div>
                    <form action="">
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
                                        {allCategory.map((c, i) => (
                                            <span
                                                key={i}
                                                onClick={() => {
                                                    setCateShow(false);
                                                    setCategory(c.name);
                                                    setSearchValue('');
                                                    setAllCategory(categories);
                                                }}
                                                className='cursor-pointer p-1 w-full hover:bg-indigo-500'
                                            >{c.name}</span>
                                        ))}
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
                                    type="text"
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
                                    type="text"
                                    name='discount'
                                    id='discount'
                                    placeholder='% Discount'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col mb-3 gap-4 text-[#d0d2d6]'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    onChange={inputHandle}
                                    value={state.description}
                                    name='description'
                                    id='description'
                                    placeholder='Description'
                                />
                            </div>
                        </div>

                        <div className='flex gap-4 mb-3'>
                            <div className='relative w-1/2'>
                                <div className='border p-2 rounded-md'>
                                    <img src="http://localhost:5173/images/laravel_image.jpg" alt="product" className='max-w-full' />
                                    <button className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1'>
                                        <IoMdClose />
                                    </button>
                                </div>
                            </div>
                            <div className='w-1/2 border-dashed border-2 border-[#d0d2d6] rounded-md flex justify-center items-center'>
                                <label htmlFor="upload-image" className='cursor-pointer'>
                                    <span className='text-[#d0d2d6]'>select image</span>
                                    <input type="file" id="upload-image" className='hidden' />
                                </label>
                            </div>
                        </div>
                        <div className='flex justify-start'>
                            <button
                                type="submit"
                                className='bg-green-500 hover:shadow-green-500/50
                                hover:shadow-lg text-white rounded-sm px-7 py-2 self-start'>
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
