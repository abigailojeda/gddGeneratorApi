
const {response} = require('express');
const User = require('../models/User.model')
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


//create user
const createUser = async (req, res)=>{

    const {username,email, password} = req.body;

    try {
    //Verify email (
    const user = await User.findOne({email:email})

    if(user){
        return res.status(400).json({
            ok:false,
            msg:'user exists yet'
        });
    }

    //User model
    const dbUser = new User(req.body);

    //Encrypt password
    const salt =bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);
    
    //Generate JWT
    const token = await generateJWT(dbUser.id, dbUser.username);

    //Create user on database
    dbUser.save();

    //Response
    return res.status(201).json({
        ok:true,
        msg:'user created',
        username,
        token
    });
        
    } catch (error) {
        //console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'error creating user'
        })
    }
  
}

//login
const loginUser = async (req, res)=>{

    const {username,email, password} = req.body;

    try {

        const dbUser = await User.findOne({email:email});

        if(!dbUser){
            return res.status(400).json({
                ok:false,
                msg:'Wrong email'
            });
        }

        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Wrong password'
            });
        }

        //Generate JWT
        const token = await generateJWT(dbUser.id, dbUser.username);

        //response
        return res.json({
            ok:true,
            id: dbUser.id,
            username : dbUser.username,
            token
        });

        
    } catch (error) {
        //console.log(error);
        return res.json({
            ok:false,
            msg:'login error'
        });
        
    }
   
}

//token
const validateToken = async (req, res)=>{

    const {id, username} = req;

    //Generate JWT
    const token = await generateJWT(id, username);

    return res.json({
        ok:true,
        id,
        username,
        token
    })
}

//get all users
function getAllUsers(req, res) {
    return User.find({}) //find all users, puedes poner parametro o no.
      .then((users) => {
        return res.send(users);
      })
      .catch((error) => {
        return res.send(error);
      });
}

module.exports = {
    createUser,
    loginUser,
    validateToken,
    getAllUsers
}