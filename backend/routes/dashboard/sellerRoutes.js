const productControllers = require('../../controllers/dashboard/sellerControllers');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = require('express').Router();

router.get('/get_seller_request', authMiddleware, sellerControllers.get_seller_request);


module.exports = router;
