import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdCloseCircle, IoMdImage } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../../store/Reducers/categoryReducers';
import { add_product } from '../../store/Reducers/productReducers';

const AddProduct = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(get_category({
            itemsPerPage: '',
            currentPage: '',
            searchValue: ''
        }));
    }, [dispatch]);

    // const [state, setState] = useState({
    //     name: '',
    //     description: '',
    //     discount: '',
    //     price: '',
    //     brand: '',
    //     stock: '',
    //     category: '',
    //     shopName: 'shadheen'  // Setting default shopName
    // });

    const [state, setState] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        shopName: 'shadheen',
        category: '',
        brand: '',  // Initialize brand in state
        discount: 0,
        images: []
    });
    
    

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [allCategory, setAllCategory] = useState([]);

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
            const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
            setAllCategory(filteredCategories);
        } else {
            setAllCategory(categories);
        }
    };

    const [images, setImages] = useState([]);
    const [imageShow, setImageShow] = useState([]);

    const imageHandle = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setImages([...images, ...files]);
            let imageURL = [];
            for (let i = 0; i < files.length; i++) {
                imageURL.push(URL.createObjectURL(files[i]));
            }
            setImageShow([...imageShow, ...imageURL]);
        }
    };

    const changeImage = (img, index) => {
        if (img) {
            let tempImages = [...images];
            let tempUrl = [...imageShow];
            tempImages[index] = img;
            tempUrl[index] = URL.createObjectURL(img);
            setImages(tempImages);
            setImageShow(tempUrl);
        }
    };

    const removeImage = (i) => {
        const filteredImages = images.filter((img, index) => index !== i);
        const filteredImageUrls = imageShow.filter((img, index) => index !== i);
        setImages(filteredImages);
        setImageShow(filteredImageUrls);
    };

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            shopName: 'shadheen'
        }));
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const addProduct = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
    
        setIsSubmitting(true);
    
        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('category', category);  // Ensure category is correctly appended
        formData.append('description', state.description);
        formData.append('price', state.price);
        formData.append('stock', state.stock);
        formData.append('shopName', state.shopName);
        formData.append('brand', state.brand);
        formData.append('discount', state.discount = state.discount ? parseInt(state.discount, 10) : 0)
       
        // Append images
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }
    
        //console.log([...formData]); // Log the formData for debugging
    
        try {
            await dispatch(add_product(formData)).unwrap();
            console.log('Product added successfully');
        } catch (error) {
            console.error('Failed to add product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    useEffect(() => {
        setAllCategory(categories);
    }, [categories]);


    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#d0d2d6] text-xl font-semibold'>Add Product</h1>
                    <Link to="/seller/dashboard/products" className='bg-blue-500 hover:shadow-blue-500/50 
                    hover:shadow-lg text-white rounded-sm px-7 py-2 my-2'>All Products</Link>
                </div>
                <div>
                    <form onSubmit={addProduct}>
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
                                    onChange={(e) => setState({ ...state, brand: e.target.value })}
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
                                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    onChange={categorySearch}
                                    value={category}  // Category is directly updated
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
                                            className='px-3 py-1 w-full focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                            placeholder='Search'
                                        />
                                    </div>
                                    <div className='flex flex-col justify-start items-start h-[200px] overflow-y-scroll mt-2 text-left'>
                                        {allCategory.map((c, i) => (
                                            <span
                                                key={i}
                                                onClick={() => {
                                                    setCateShow(false);
                                                    setCategory(c.name);  // Ensure category is correctly set
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

                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
                            {imageShow.map((img, i) => (
                                <div key={i} className='h-[180px] relative'>
                                    <label htmlFor={`image-${i}`}>
                                        <img className='w-full h-full rounded-sm' src={img} alt={`Uploaded ${i}`} />
                                    </label>
                                    <input
                                        onChange={(e) => changeImage(e.target.files[0], i)}
                                        type="file"
                                        id={`image-${i}`}
                                        className='hidden'
                                    />
                                    <span onClick={() => removeImage(i)} className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full'>
                                        <IoMdCloseCircle />
                                    </span>
                                </div>
                            ))}
                            <label
                                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]"
                                htmlFor="image"
                            >
                                <span><IoMdImage /></span>
                                <span>Select Image</span>
                            </label>
                            <input
                                className="hidden"
                                onChange={imageHandle}
                                multiple
                                type="file"
                                name="image"
                                id="image"
                            />
                        </div>

                        <div className=''>
                            <button
                                type="submit"
                                className='bg-red-500 hover:shadow-green-500/50
                                hover:shadow-lg text-white rounded-sm px-7 py-2'>
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
