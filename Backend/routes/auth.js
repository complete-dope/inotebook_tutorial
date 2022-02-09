const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const {body , validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

// Create a user using post "/api/auth"

// router.post()

// to validate our email and password and name we use express-validator which uses a array to check the lenght , email etc and is passed via a array in between of a routerpost

router.post('/createUser',[
    body('name' , 'Enter a valid name of minlen 3').isLength({min:3}) ,
     body('email'  , "Enter a valid email address").isEmail() , 
     body('password' , 'Enter a valid password of at least 5 length').isLength({min:5})],
    async (req, res) => {
    // const user = User(req.body);
    // user.save()
    //if their are errors we will return it here as a array
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // res.send(req.body);

    // whether a user with same email exists
    let user =await User.findOne({email:req.body.email})
    // if exists then:
    if(user){
        return res.status(400).json({error:"User already exists"})
    }
    // else:
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password ,salt )
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      }).catch((err)=>{
          console.log(err.message);
          res.status(500).send("Some error occured")
      })
    res.json(user);
})

module.exports = router


// {
//     "name":"Manu",
//     "email":"mohit2002@jk.com",
//     "password":"ramanjanu"
// }

// json web token verifies user 
// Web token