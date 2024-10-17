const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
const path = require('path');
const { error } = require('console');
const sellerModel = require('../../models/sellerModel'); // Import the seller model

class sellerControllers {

  // get_seller_request handler
  get_seller_request = async (req, res) => {
    try {
      const { itemsPerPage = 5, currentPage = 1, searchValue = '' } = req.query;

      // Create the query object to search for sellers by name or email
      const query = searchValue
        ? {
            $or: [
              { name: { $regex: searchValue, $options: 'i' } }, // Case-insensitive search
              { email: { $regex: searchValue, $options: 'i' } }
            ]
          }
        : {};

      // Calculate skip value for pagination
      const skip = (currentPage - 1) * parseInt(itemsPerPage);

      // Fetch sellers based on the query, pagination, and limit
      const sellers = await sellerModel
        .find(query)
        .skip(skip)
        .limit(parseInt(itemsPerPage))
        .sort({ createdAt: -1 }); // Sort by creation date

      // Get total number of sellers matching the query
      const totalSeller = await sellerModel.countDocuments(query);

      // Return the response
      return res.status(200).json({ sellers, totalSeller });
    } catch (error) {
      console.error('Unexpected server error:', error);
      return res.status(500).json({ error: 'Unexpected server error occurred.' });
    }
  };

}

const sellerControllersInstance = new sellerControllers();
module.exports = sellerControllersInstance;
