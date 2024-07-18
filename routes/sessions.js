const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const auth = require('../middleware/auth');
const multer = require('multer');
const { generateQuestions } = require('../utils/ai');

const upload = multer({ dest: 'uploads/' });

router.post('/create', auth, upload.single('pdf'), async (req, res) => {
  try {
    const { name, subject } = req.body;
    const pdfUrl = req.file.path;
    const questions = await generateQuestions(pdfUrl);
    const session = new Session({ 
      userId: req.user.id, 
      name, 
      subject, 
      pdfUrl,
      questions 
    });
    await session.save();
    res.status(201).json({ message: 'Session created successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Error creating session' });
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions' });
  }
});

module.exports = router;