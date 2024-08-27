const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const fs = require('fs-extra');


class ProductControllers {
    // Product Add
    add_product = async (req, res) => {
        console.log(req);
        const { id } = req;
        const form = formidable({ multiples: true });
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return responseReturn(res, 400, { error: 'Something went wrong while parsing the form.' });
            }
    
            let { name, category, description, stock, price, discount, shopname, brand } = fields;
            let { image } = files;
    
            // Log fields and files to verify they are received correctly
            console.log('Fields:', fields);
            console.log('Files:', files);
    
            if (!image) {
                return responseReturn(res, 400, { error: 'No image provided' });
            }
    
            name = name.trim();
            const slug = name.split(' ').join('-');
    
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET,
                secure: true
            });
    
            try {
                let allImageUrl = [];
                image = Array.isArray(image) ? image : [image]; // Handle single image case
    
                for (let i = 0; i < image.length; i++) {
                    const result = await cloudinary.uploader.upload(image[i].filepath, { folder: 'products' });
                    allImageUrl.push(result.url);
                }
    
                // Ensure product creation works correctly
                const product = await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    description,
                    discount,
                    price,
                    brand,
                    stock,
                    category,
                    images: allImageUrl
                });
    
                console.log('Product created:', product);
    
                return responseReturn(res, 201, { product, message: 'Product Added Successfully' });
            } catch (uploadError) {
                console.error('Upload or save error:', uploadError);
                return responseReturn(res, 500, { error: 'Failed to upload image or save product.', details: uploadError.message });
            } finally {
                // Delete files after upload
                const filePaths = Array.isArray(image) ? image.map(img => img.filepath || img.path) : [image.filepath || image.path];
                for (const filePath of filePaths) {
                    await fs.remove(filePath);
                }
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
