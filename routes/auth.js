const express = require('express');
const router = express.Router();
//Initialize middleware
const auth = require('../middleware/auth');
//User mongoose model 
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');


//Route GET /auth
//Desc Login Authentication

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (err) {
        res.status(500).send('Server/DB Error')
    }
});

// POST /Auth
// Login Verification 

router.post('/',
    [
        check('email', 'Email is Required')
            .isEmail(),
        check('password', 'Password is Required')
            .exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        const { email, password } = req.body

        try {
            // See if users exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(200).send({ errors: 'Invalid Username' });
            }

            // Check if password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(200).send({ errors: 'Invalid Password' });
            }


            // Return JsonWebToken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })


module.exports = router;