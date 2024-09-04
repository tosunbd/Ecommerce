const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const fs = require('fs-extra');

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
  

const productControllers = new ProductControllers();

module.exports = {
  add_product: productControllers.add_product,
  get_product: productControllers.get_product
};
