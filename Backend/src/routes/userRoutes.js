const express = require('express');
const { getMe, updateMe } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/me', getMe);
router.put('/me', updateMe);

module.exports = router;
