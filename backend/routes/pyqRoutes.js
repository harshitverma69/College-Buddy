const express = require('express');
const router = express.Router();
const Pyq = require('../models/pyqModel');

router.get('/api/pyqs', async (req, res) => {
  const subject = req.query.subject?.toLowerCase();
  if (!subject) {
    return res.status(400).json({ error: 'Subject query parameter is required' });
  }

  try {
    const result = await Pyq.findOne({
      subject: { $regex: new RegExp(subject, 'i') } // case-insensitive match
    });

    if (!result) {
      return res.status(404).json({ error: 'No PYQ found for the specified subject' });
    }

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
