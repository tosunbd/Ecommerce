const productControllers = require('../../controllers/dashboard/productControllers');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/add_product', authMiddleware, productControllers.add_product);
router.get('/get_products', authMiddleware, productControllers.get_products);


module.exports = router;
