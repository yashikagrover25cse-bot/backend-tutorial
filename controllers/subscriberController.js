const Subscriber = require('../models/subscriber');

// Shared helper: load one subscriber by id, or send 404/400 and stop.
// Routes use this before any handler that needs a single subscriber.
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' });
    }
  } catch (err) {
    // e.g. an invalid ObjectId format
    return res.status(400).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
}

// GET /subscribers — Read all
async function getAllSubscribers(req, res) {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /subscribers/:id — Read one
function getOneSubscriber(req, res) {
  res.json(res.subscriber);
}

// POST /subscribers — Create
async function createSubscriber(req, res) {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    // Missing required field, etc.
    res.status(400).json({ message: err.message });
  }
}

// PATCH /subscribers/:id — Update (only the fields sent in the body)
async function updateSubscriber(req, res) {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE /subscribers/:id — Delete
async function deleteSubscriber(req, res) {
  try {
    await res.subscriber.deleteOne();
    res.json({ message: 'Deleted Subscriber' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getSubscriber,
  getAllSubscribers,
  getOneSubscriber,
  createSubscriber,
  updateSubscriber,
  deleteSubscriber,
};
