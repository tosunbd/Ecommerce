const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const fs = require('fs-extra');
const path = require('path');

class ProductControllers {

  // Product Add
  add_product = async (req, res) => { 
    console.log('Received request:', req); // Log the incoming request

    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    await fs.ensureDir(uploadDir);

    const form = formidable({ multiples: true, uploadDir: uploadDir, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Form parse error:', err);
            return responseReturn(res, 400, { error: 'Something went wrong while parsing the form.' });
        }
    
        // Log parsed fields and files for debugging
        console.log('Fields:', fields);
        console.log('Files:', files);
    
        let { name, category, description, stock, price, shopName, brand, discount } = fields;  // Add discount here
        let { images } = files;
    
        if (!brand || !images) {
            console.error('Missing required fields:', { name, category, description, stock, price, shopName, brand, discount, images });
            return responseReturn(res, 400, { error: 'All fields including brand, discount, and images are required.' });
        }

        name = name.trim();
        const slug = name.split(' ').join('-');

        // Ensure images is an array
        images = Array.isArray(images) ? images : [images];

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true
        });

        try {
            let allImageUrl = [];

            // Upload images to Cloudinary
            for (let i = 0; i < images.length; i++) {
                const filePath = images[i].filepath || images[i].path;
                console.log('File being uploaded:', filePath);
                const result = await cloudinary.uploader.upload(filePath, { folder: 'products' });
                allImageUrl.push(result.url);
            }

            // Create a new product document
            const product = new productModel({
                sellerId: req.id,
                name,
                slug: name.split(' ').join('-'),
                description,
                discount: discount ? parseInt(discount, 10) : 0,  // Set default discount if not provided
                price: parseInt(price, 10),
                brand,
                stock: parseInt(stock, 10),
                category,
                shopName,
                images: allImageUrl
            });            

            await product.save();

            return responseReturn(res, 201, { product, message: 'Product Added Successfully' });
        } catch (uploadError) {
            console.error('Image upload or save error:', uploadError);
            return responseReturn(res, 500, { error: 'Failed to upload images or save product.', details: uploadError.message });
        } finally {
            // Clean up uploaded temporary files
            for (let i = 0; i < images.length; i++) {
                const filePath = images[i].filepath || images[i].path;
                await fs.remove(filePath);
            }
        }
    });
  };

  // Product Get
  get_products = async (req, res) => {
    const { itemsPerPage, currentPage, searchValue } = req.query;
    const { id } = req;

    const skipPage = (currentPage - 1) * itemsPerPage;
    const limitPage = parseInt(itemsPerPage);

    try {     
      if (searchValue) {
        const products = await productModel.find({
          $text: { $search: searchValue },
          sellerId: id
        })
        .skip(skipPage)
        .limit(limitPage)
        .sort({ createdAt: -1 });
        
        const totalProduct = await productModel.find({
          $text: { $search: searchValue },
          sellerId: id
        }).countDocuments();

        return res.status(200).json({ products, totalProduct });
      } else {
        const products = await productModel.find({ sellerId: id })
          .skip(skipPage)
          .limit(limitPage)
          .sort({ createdAt: -1 });
        
        const totalProduct = await productModel.find({ sellerId: id }).countDocuments();
        return res.status(200).json({ products, totalProduct });
      }
    } catch (error) {
      console.error('Unexpected server error:', error);
      return res.status(500).json({ error: 'Unexpected server error occurred.' });
    }
  };
}

// Corrected the instantiation with the correct class name
const productControllers = new ProductControllers();
  
module.exports = {
  add_product: productControllers.add_product,
  get_products: productControllers.get_products
};
