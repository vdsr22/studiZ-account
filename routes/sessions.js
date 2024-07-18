const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const auth = require('../middleware/auth');
const { generateQuestions } = require('../utils/ai');

router.post('/create', auth, async (req, res) => {
    try {
        const { name, subject, pdfContent } = req.body;
        const questions = await generateQuestions(pdfContent);
        const session = new Session({
            userId: req.user.id,
            name,
            subject,
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