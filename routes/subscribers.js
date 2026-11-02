const express = require('express');
const router = express.Router();
const controller = require('../controllers/subscriberController');

// Step (d): Express routes wired to controllers — one route per CRUD operation.
router.get('/', controller.getAllSubscribers);
router.get('/:id', controller.getSubscriber, controller.getOneSubscriber);
router.post('/', controller.createSubscriber);
router.patch('/:id', controller.getSubscriber, controller.updateSubscriber);
router.delete('/:id', controller.getSubscriber, controller.deleteSubscriber);

module.exports = router;
