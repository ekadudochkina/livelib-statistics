const express = require('express');
const router = express.Router();
const LiveLibController = require('../controllers/liveLibController');

// Define routes
router.get('/live-lib', LiveLibController.getLiveLibData);


module.exports = router;