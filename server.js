const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Init DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`));