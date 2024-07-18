const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  subject: String,
  pdfUrl: String,
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number
  }]
});

module.exports = mongoose.model('Session', sessionSchema);