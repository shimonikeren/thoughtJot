const express = require('express');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
// const cors = require('cors');
const router = express.Router();
const db = require('./../models');
const app = express();

// app.use(cors());
//GRAB POSTS
router.post('/grabposts', function(request, response){
    if(request.user){ //user is a passport object ...if our req gives response that has a user
        db.UserData.findAll({
            where: {userId: request.user.id}
        }).then(function(data){
            //
        })
    }
})



//checks if a user is logged in...if logged in, then show all enteries 


//showing all the data

// /logedIn