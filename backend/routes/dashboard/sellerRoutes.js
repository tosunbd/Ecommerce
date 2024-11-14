const sellerControllers = require('../../controllers/dashboard/sellerControllers');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = require('express').Router();

router.get('/get_seller_request', authMiddleware, sellerControllers.get_seller_request);
router.get('/get_seller/:sellerId', authMiddleware, sellerControllers.get_seller);
router.post('/seller_status_update', authMiddleware, sellerControllers.seller_status_update);


module.exports = router;


