const authControllers = require('../controllers/authControllers');
// const categoryControllers = require('../controllers/categoryControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/admin-login', authControllers.admin_login);
router.get('/get-user', authMiddleware, authControllers.getUser);
router.post('/seller-login', authControllers.seller_login);
router.post('/seller-register', authControllers.seller_register);
// router.post('/category-add', categoryControllers.categoryAdd);

module.exports = router;

