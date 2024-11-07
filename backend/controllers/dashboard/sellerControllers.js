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
    const { itemsPerPage, currentPage, searchValue } = req.query;
    const { id } = req;

    const skipPage = (currentPage - 1) * itemsPerPage;
    const limitPage = parseInt(itemsPerPage);

    try {     
      if (searchValue) {
        const sellers = await sellerModel.find({
          $text: { $search: searchValue },
          sellerId: id
        })
        .skip(skipPage)
        .limit(limitPage)
        .sort({ createdAt: -1 });
        
        const totalSeller = await sellerModel.find({
          $text: { $search: searchValue },
          sellerId: id
        }).countDocuments();        
        responseReturn(res, 200,{ sellers, totalSeller });
      } else {
        const sellers = await sellerModel.find({ sellerId: id })
          .skip(skipPage)
          .limit(limitPage)
          .sort({ createdAt: -1 });        
        const totalSeller = await sellerModel.find({ sellerId: id }).countDocuments();        
        responseReturn(res, 200,{ sellers, totalSeller });
      }
      console.log(sellers);
      console.log(totalSeller);
    } catch (error) {
      console.error('Unexpected server error:', error);      
    }
  };

}

const sellerControllersInstance = new sellerControllers();
module.exports = sellerControllersInstance;
