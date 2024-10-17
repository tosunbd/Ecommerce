const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
const path = require('path');
const { error } = require('console');
const sellerModel = require('../../models/sellerModel'); // Make sure this exists

class sellerControllers {

  // get_seller_request handler
  get_seller_request = async (req, res) => {
    try {
      const { itemsPerPage, currentPage, searchValue } = req.query;

      const query = searchValue
        ? { name: new RegExp(searchValue, 'i') }
        : {};

      // Pagination logic
      const sellers = await sellerModel
        .find(query)
        .skip((currentPage - 1) * itemsPerPage)
        .limit(parseInt(itemsPerPage));

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
