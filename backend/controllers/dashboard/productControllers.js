const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const fs = require('fs-extra');



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Ensure this is set in your environment variables
    api_key: process.env.API_KEY, // Ensure this is set in your environment variables
    api_secret: process.env.API_SECRET, // Ensure this is set in your environment variables
    secure: true
});


class ProductControllers {
    // Product Add
    add_product = async (req, res) => {
        console.log('Received request:', req); // Log the incoming request
        const { id } = req;
        const form = formidable({ multiples: true });
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return responseReturn(res, 400, { error: 'Something went wrong while parsing the form.' });
            }
        
            console.log('Fields received:', fields);
            console.log('Files received:', files);
        
            let { name, category, description, stock, price, discount, shopName, brand } = fields;
            let { images } = files;
        
            // Handle single or multiple image files
            images = Array.isArray(images) ? images : [images];
        
            if (!images || images.length === 0) {
                return responseReturn(res, 400, { error: 'No image provided' });
            }
        
            try {
                let allImageUrl = [];
        
                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.uploader.upload(images[i].filepath, { folder: 'products' });
                    allImageUrl.push(result.url);
                }
        
                const product = await productModel.create({
                    sellerId: req.id,
                    name,
                    slug: name.split(' ').join('-'),
                    description,
                    discount,
                    price,
                    brand,
                    stock,
                    category,
                    shopName,
                    images: allImageUrl
                });
        
                return responseReturn(res, 201, { product, message: 'Product Added Successfully' });
            } catch (uploadError) {
                console.error('Image upload or save error:', uploadError);
                return responseReturn(res, 500, { error: 'Failed to upload image or save product.' });
            }
        });
                
    };

    // End of Product Add

    // Product Get

    get_product = async (req, res) => {
        const { itemsPerPage, currentPage, searchValue } = req.query;

        try {

            // let skipPage = '';
            // if(itemsPerPage && currentPage) {
            //     const skipPage = parseInt(itemsPerPage) * (parseInt(currentPage) - 1);
            // }

            const itemsPerPageNum = parseInt(itemsPerPage, 10) || 0;
            const currentPageNum = parseInt(currentPage, 10) || 1;
            const query = searchValue ? { name: { $regex: new RegExp(searchValue, 'i') } } : {};

            const products = await productModel.find(query)
                .skip((currentPageNum - 1) * itemsPerPageNum)
                .limit(itemsPerPageNum > 0 ? itemsPerPageNum : 0)
                .sort({ createdAt: -1 });

            const totalProduct = await productModel.countDocuments(query);

            return responseReturn(res, 200, { products, totalProduct });
        } catch (error) {
            console.error(error.message);
            return responseReturn(res, 500, { error: 'Something went wrong while fetching products.', details: error.message });
        }
    };

    // End of Product Get
}

const productControllers = new ProductControllers();

module.exports = {
    add_product: productControllers.add_product,
    get_product: productControllers.get_product
};
