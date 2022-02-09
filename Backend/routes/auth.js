const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'thisisgreat'
const fetchuser = require('../middleware/fetchuser')
// Create a user using post "/api/auth"

// router.post()

// to validate our email and password and name we use express-validator which uses a array to check the lenght , email etc and is passed via a array in between of a routerpost

// Route1:Creating a user
router.post('/createUser', [
    body('name', 'Enter a valid name of minlen 3').isLength({ min: 3 }),
    body('email', "Enter a valid email address").isEmail(),
    body('password', 'Enter a valid password of at least 5 length').isLength({ min: 5 })],
    async (req, res) => {
        // const user = User(req.body);
        // user.save()
        //if their are errors we will return it here as a array
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // res.send(req.body);

        // whether a user with same email exists
        try {
            let user = await User.findOne({ email: req.body.email })
            // if exists then:
            if (user) {
                return res.status(400).json({ error: "User already exists" })
            }
            // else:
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                id: user.id

            }
            const jwtdata = jwt.sign(data, JWT_TOKEN);
            console.log(jwtdata);
            // res.json(user);
            res.json({
                authToken: jwtdata
            })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    })


// Autehnticate a user /login no login required
// Route2 : Login a user
router.post('/login', [
    body('email', "Enter a valid email address").isEmail(),
    body('password', "cannot be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to enter correct credential as user is not their" })
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(400).json({ error: "Please try to enter correct credential as this password is incorrect" })
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_TOKEN);
        res.json({authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route3: Get user details once login
router.post('/getuser', fetchuser, async (req, res) => {
    try{
        const userId = req.user.id;
        const userfind = await User.findById(userId).select("-password")
        res.send(userfind)
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router


// {
//     "name":"Manu",
//     "email":"mohit2002@jk.com",
//     "password":"ramanjanu"
// }

// json web token verifies user
// Web token

