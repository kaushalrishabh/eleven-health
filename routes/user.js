const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const brcypt = require('bcryptjs');

//Route to Save users 
//POST Register User

router.post(
    '/',
    [
        check('name', 'Name is Required')
            .not()
            .isEmpty(),
        check('email', 'Email is Required')
            .not()
            .isEmpty(),
        check('password', 'Password must be longer than 8 characters')
            .isLength({ min: 8 })
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        const { name, email, password } = req.body

        try {
            //Check if User already exists
            let user = await User.findOne({ email });
            if (user)
                res.status(400).send("User already exists");

            user = new User({
                name,
                email,
                password
            });

            //encrypt password using brcypt
            const salt = await brcypt.genSalt(10);
            user.password = await brcypt.hash(password, salt);

            //Save user in DB
            await user.save();

            //Return Toke
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }

    });

router.put('/',
    [
        check('email', 'Email is required')
            .not()
            .isEmpty(),

        check('password', 'Password cannot be empty')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        const { email, password } = req.body;

        try {
            // See if users exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(200).send({ errors: 'Cannot find user' });
            }

            //encrypt password using brcypt
            const salt = await brcypt.genSalt(10);
            let pass = await brcypt.hash(password, salt);
            console.log(user);
            await User.findOneAndUpdate({ email }, { password: pass });

            //Save in DB
            await user.save();

            res.status(200).send({ msg: "Password Updated" });
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send("Server error")
        }

    });

module.exports = router;