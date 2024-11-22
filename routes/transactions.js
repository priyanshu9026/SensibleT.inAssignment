const express = require("express");
const Transaction = require("../models/transaction");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { amount, transaction_type, user } = req.body;
    const transaction = new Transaction({ amount, transaction_type, user });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { user_id } = req.query;
    const transactions = await Transaction.find({ user: user_id });
    res.status(200).json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:transaction_id", async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const transaction = await Transaction.findById(transaction_id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:transaction_id", async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const { status } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { status },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
