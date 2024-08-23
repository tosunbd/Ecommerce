const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const fs = require('fs-extra');
const path = require('path');

class ProductControllers {

    // Product Add
    add_product = async (req, res) => {
        const uploadDir = path.join(__dirname, '..', '..', 'uploads');
        await fs.ensureDir(uploadDir);

        const form = formidable({ multiples: false, uploadDir: uploadDir, keepExtensions: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return responseReturn(res, 400, { error: 'Something went wrong while parsing the form.' });
            }

            let { name, category, description, stock, price, discount, shopname, brand } = fields;
            let { image } = files;

            if (!name || !image) {
                console.error('Missing required fields:', { name, image });
                return responseReturn(res, 400, { error: 'Name and image are required fields.' });
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
                for (let i = 0; i < image.length; i++) {
                    const result = await cloudinary.uploader.upload(image[i].filepath || image[i].path, { folder: 'products' });
                    allImageUrl.push(result.url);
                }
                console.log('Uploaded image URLs:', allImageUrl);

                const filePath = image.filepath || image.path;
                console.log('File being uploaded:', filePath);
                const result = await cloudinary.uploader.upload(filePath, { folder: 'products' });
                console.log('Upload result:', result);

                const product = new productModel({
                    sellerId: id,
                    name,
                    slug,
                    shopname,
                    category: category.trim(),
                    description: description.trim(),
                    stock: parseInt(stock),
                    price: parseInt(price),
                    discount: parseInt(discount),                    
                    brand: brand.trim(),
                    image: allImageUrl,                    
                });

                await product.save();
                return responseReturn(res, 201, { product, message: 'Product Added Successfully' });
            } catch (uploadError) {
                console.error('Upload or save error:', uploadError);
                return responseReturn(res, 500, { error: 'Failed to upload image or save product.', details: uploadError.message });
            } finally {
                const filePath = image.filepath || image.path;
                await fs.remove(filePath);
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