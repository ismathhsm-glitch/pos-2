const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Create sale (checkout)
router.post('/', auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    // reduce stock
    for (const it of items) {
      await Product.findByIdAndUpdate(it.product, { $inc: { stock: -it.quantity } });
    }
    const sale = new Sale({ items, total });
    await sale.save();
    res.json(sale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sales
router.get('/', auth, async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
