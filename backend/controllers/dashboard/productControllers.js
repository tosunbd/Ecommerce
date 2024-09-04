const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const fs = require('fs-extra');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class ProductControllers {

  // Product Add
  add_product = async (req, res) => {
    try {
      console.log('Starting product add process...');

      const form = formidable({ multiples: true, uploadDir: './uploads', keepExtensions: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Form parsing error.' });
        }
    
        // Fields from the form
        const { name, category, description, stock, price, shopName } = fields;
        const { images } = files;
    
        if (!name || !category || !images) {
            return res.status(400).json({ error: 'Name, category, and images are required fields.' });
        }


        let allImageUrl = [];

        try {
          console.log('Uploading images...');

          // Handle multiple images
          if (Array.isArray(images)) {
            for (let image of images) {
              const filePath = image.filepath || image.path;
              console.log('Uploading image:', filePath);
              const result = await cloudinary.uploader.upload(filePath, { folder: 'products' });
              allImageUrl.push(result.url);
            }
          } else {
            // Handle single image
            const filePath = images.filepath || images.path;
            console.log('Uploading single image:', filePath);
            const result = await cloudinary.uploader.upload(filePath, { folder: 'products' });
            allImageUrl.push(result.url);
          }

          console.log('Uploaded image URLs:', allImageUrl);

          const product = new productModel({
            sellerId: req.user._id, // Assuming the user is authenticated
            name: name.trim(),
            description: description.trim(),
            discount: parseInt(discount),
            price: parseInt(price),
            brand: brand.trim(),
            stock: parseInt(stock),
            category: category.trim(),
            shopName: shopName.trim(),
            images: allImageUrl,
          });

          await product.save();
          console.log('Product saved successfully');
          return res.status(201).json({ product, message: 'Product added successfully' });

        } catch (uploadError) {
          console.error('Upload or save error:', uploadError);
          return res.status(500).json({ error: 'Failed to upload image or save product.' });
        } finally {
          // Clean up temp files
          const filePaths = Array.isArray(images) ? images.map(img => img.filepath || img.path) : [images.filepath || images.path];
          for (const filePath of filePaths) {
            await fs.remove(filePath);
          }
        }
      });
    } catch (error) {
      console.error('Unexpected server error:', error);
      return res.status(500).json({ error: 'Unexpected server error occurred.' });
    }
  };

  // Product Get
  get_product = async (req, res) => {
    const { itemsPerPage, currentPage, searchValue } = req.query;

    try {
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
      console.error('Error while fetching products:', error.message);
      return responseReturn(res, 500, { error: 'Something went wrong while fetching products.', details: error.message });
    }
  };
}

const productControllers = new ProductControllers();

module.exports = {
  add_product: productControllers.add_product,
  get_product: productControllers.get_product
};
