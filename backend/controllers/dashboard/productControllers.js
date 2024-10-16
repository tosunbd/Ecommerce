const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const fs = require('fs-extra');
const path = require('path');
const { error } = require('console');

class ProductControllers {

  // Product Add
  add_product = async (req, res) => { 
    // console.log('Received request:', req); // Log the incoming request

    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    await fs.ensureDir(uploadDir);

    const form = formidable({ multiples: true, uploadDir: uploadDir, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            // console.error('Form parse error:', err);
            return responseReturn(res, 400, { error: 'Something went wrong while parsing the form.' });
        }
    
        // Log parsed fields and files for debugging
        // console.log('Fields:', fields);
        // console.log('Files:', files);
    
        let { name, category, description, stock, price, shopName, brand, discount } = fields;  // Add discount here
        let { images } = files;
    
        if (!brand || !images) {
            // console.error('Missing required fields:', { name, category, description, stock, price, shopName, brand, discount, images });
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
                // console.log('File being uploaded:', filePath);
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
            // console.error('Image upload or save error:', uploadError);
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

  // get products
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
        // return res.status(200).json({ products, totalProduct });
        responseReturn(res, 200,{ products, totalProduct });
      } else {
        const products = await productModel.find({ sellerId: id })
          .skip(skipPage)
          .limit(limitPage)
          .sort({ createdAt: -1 });        
        const totalProduct = await productModel.find({ sellerId: id }).countDocuments();
        // return res.status(200).json({ products, totalProduct });
        responseReturn(res, 200,{ products, totalProduct });
      }
    } catch (error) {
      console.error('Unexpected server error:', error);
      // return res.status(500).json({ error: 'Unexpected server error occurred.' });
      // responseReturn(res, 500,{ "error": "Unexpected server error occurred." });
    }
  };
  //End of get products
  
  // get product
  get_product = async (req, res) => {
    const { productId } = req.params;
    // console.log("Received Product ID:", productId);
    try {    
      const product = await productModel.findById(productId);
      if (!product) {
        return responseReturn(res, 404, { error: "Product not found" });
      }
      return responseReturn(res, 200, { product });
    } catch (error) {
      console.error('Unexpected server error:', error);
      return responseReturn(res, 500, { error: 'Unexpected server error occurred.' });
    }
  };
  //End of get product

  // Start of update product
  update_product = async (req, res) => {
    try {
      const { productId, name, description, discount, price, brand, stock, category } = req.body;

      // Ensure required fields are provided
      if (!productId) {
        return responseReturn(res, 400, { error: "Product ID is required" });
      }

      if (!name || !description || !price || !stock || !category) {
        return responseReturn(res, 400, { error: "Name, description, price, stock, and category are required" });
      }

      // Update the product
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        { name, description, discount, price, brand, stock, category },
        { new: true }
      );

      if (!updatedProduct) {
        return responseReturn(res, 404, { error: "Product not found" });
      }

      return responseReturn(res, 200, { product: updatedProduct, message: "Product updated successfully" });
    } catch (error) {
      console.error('Unexpected server error:', error);
      return responseReturn(res, 500, { error: 'Unexpected server error occurred.' });
    }
  };
  //End of update product

  
// Start of product_image_update
product_image_update = async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    await fs.ensureDir(uploadDir);

    const form = formidable({ multiples: true, uploadDir: uploadDir, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      const { oldImage, productId } = fields;
      let { newImage } = files;

      console.log("Received Product ID:", productId);
      console.log("Received Old Image:", oldImage);
      console.log("Received New Image:", newImage);

      if (err) {
        return responseReturn(res, 400, { error: 'Something went wrong while parsing the form.' });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true
          });

          // Check if oldImage exists and use the correct path for Cloudinary upload
          const filePath = newImage.filepath || newImage.path;

          const result = await cloudinary.uploader.upload(filePath, { folder: 'products' });

          if (result) {
            let { images } = await productModel.findById(productId);

            // Find the index of the old image and update it with the new image URL
            const imageIndex = images.findIndex(img => img === oldImage);

            if (imageIndex !== -1) {
              images[imageIndex] = result.secure_url; // Use `secure_url` for HTTPS

              // Update the product with the new image URL
              await productModel.findByIdAndUpdate(productId, { images });

              const updatedProduct = await productModel.findById(productId);
              return responseReturn(res, 200, {
                product: updatedProduct,
                message: 'Image uploaded successfully'
              });
            } else {
              return responseReturn(res, 404, { error: 'Old image not found in product images.' });
            }
          } else {
            return responseReturn(res, 404, { error: 'Image upload failed' });
          }
        } catch (error) {
          return responseReturn(res, 500, { error: error.message });
        }
      }
    });
  } catch (error) {
    return responseReturn(res, 500, { error: 'Server error while updating product image.' });
  }
};
// End of product_image_update



}

// Corrected the instantiation with the correct class name
// const productControllers = new ProductControllers();
  
// module.exports = {
//   add_product: productControllers.add_product,
//   get_product: productControllers.get_product,
//   get_products: productControllers.get_products
// };

const productControllers = new ProductControllers();
module.exports = productControllers;