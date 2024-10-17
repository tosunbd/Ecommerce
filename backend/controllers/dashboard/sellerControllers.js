const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const fs = require('fs-extra');
const path = require('path');
const { error } = require('console');

class sellerControllers {
  
  // start of get_seller_request
  get_seller_request = async (req, res) => {
    console.log(req.query);
    // const { id } = req;    
    // try {    
    //   const seller = await sellerModel.findById(id);
    //   if (!seller) {
    //     return responseReturn(res, 404, { error: "Seller Request not found" });
    //   }
    //   return responseReturn(res, 200, { seller });
    // } catch (error) {
    //   console.error('Unexpected server error:', error);
    //   return responseReturn(res, 500, { error: 'Unexpected server error occurred.' });
    // }
  };
  //End of get_seller_request

}

const sellerControllers = new sellerControllers();
module.exports = sellerControllers;