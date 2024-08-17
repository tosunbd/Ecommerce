const productControllers = require('../../controllers/dashboard/productControllers');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/add_product', authMiddleware, productControllers.add_product);
router.get('/get_product', authMiddleware, productControllers.get_product);


module.exports = router;
