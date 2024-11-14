const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
const path = require('path');
const { error } = require('console');
const sellerModel = require('../../models/sellerModel'); // Import the seller model

class sellerControllers {

  // get_sellers_request handler
  get_seller_request = async (req, res) => {
    const { itemsPerPage, currentPage, searchValue } = req.query;
    const { id } = req;

    const skipPage = (currentPage - 1) * itemsPerPage;
    const limitPage = parseInt(itemsPerPage);

    try {
      const sellers = await sellerModel.find({
        status: 'pending' 
      })
      .skip(skipPage)
      .limit(limitPage)
      .sort({ createdAt: -1 });
      
      const totalSeller = await sellerModel.find({
        status: 'pending'
      }).countDocuments();        
      responseReturn(res, 200, { sellers, totalSeller });      
      
    } catch (error) {
      responseReturn(res, 500, { message: error.message });      
    }
  };

// get_sellers_request handler

// get_seller
get_seller = async (req, res) => {    
  const { sellerId } = req.params;  // Use req.params to retrieve sellerId from the URL
  try {
      // Find the seller by ID
      const seller = await sellerModel.findById(sellerId);

      // Check if seller exists
      if (!seller) {
          return responseReturn(res, 404, { message: "Seller not found" });
      }

      // Send the seller data as response
      responseReturn(res, 200, { seller });
      
  } catch (error) {
      console.error('Unexpected server error:', error);
      responseReturn(res, 500, { message: 'Unexpected server error occurred.' });
  }
};
  // End of get_seller
  

// seller_status_update
seller_status_update = async (req, res) => {    
  const { sellerId, status } = req.body;  
  try {
      // Update the seller status by ID
      const updatedSeller = await sellerModel.findByIdAndUpdate(
          sellerId, 
          { status },
          { new: true } // This option returns the updated document
      );

      if (!updatedSeller) {
          return responseReturn(res, 404, { message: "Seller not found" });
      }

      return responseReturn(res, 200, { seller: updatedSeller, message: "Seller status updated successfully" });      
      
  } catch (error) {
      console.error('Unexpected server error:', error);
      responseReturn(res, 500, { message: 'Unexpected server error occurred.' });
  }
};
// End of seller_status_update

  

}

const sellerControllersInstance = new sellerControllers();
module.exports = sellerControllersInstance;
