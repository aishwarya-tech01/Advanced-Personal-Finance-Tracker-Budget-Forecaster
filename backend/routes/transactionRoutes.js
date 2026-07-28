const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.get('/transactions/:userId', controller.getTransactions);
router.post('/transactions', controller.addTransaction);
router.get('/notifications/:userId', controller.getNotifications);

module.exports = router;