const productControllers = require('../../controllers/dashboard/productControllers');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/add_product', authMiddleware, productControllers.add_product);
router.get('/get_products', authMiddleware, productControllers.get_products);
router.get('/get_product/:productId', authMiddleware, productControllers.get_product);
router.post('/update_product', authMiddleware, productControllers.update_product);
router.post('/product-image-update', authMiddleware, productControllers.product_image_update);


module.exports = router;
