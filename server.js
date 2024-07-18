const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/sessions', require('./routes/sessions'));

// Serve login.html as the home page
app.get('/', (req, res) => {
<<<<<<< HEAD
    res.sendFile(path.join(__dirname,  'login.html'));
=======
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
>>>>>>> refs/remotes/origin/main
});

// Catch-all route to serve index.html for any unmatched routes
app.get('*', (req, res) => {
<<<<<<< HEAD
    res.sendFile(path.join(__dirname,  'index.html'));
=======
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
>>>>>>> refs/remotes/origin/main
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));