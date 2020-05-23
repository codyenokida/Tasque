const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');

const User = require('../models/User');
const Todo = require('../models/Todo');

const signToken = (userID) => {
    return JWT.sign({
        iss: "cooodes",
        sub: userID
    }, "cooodes", { expiresIn : "1h"});
}

userRouter.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    User.findOne({username}, (err, user) => {
        if (err)
            res.status(500).json({message: {msgBody: "An Error Has Occurred", msgError: true}});
        if (user)
            res.status(500).json({message: {msgBody: "Username is already taken", msgError: true}});
        else {
            const newUser = new User({
                username, password, role
            });
            newUser.save(err => {
                if (err)
                    res.status(500).json({message: {msgBody: "An Error Has Occurred", msgError: true}});
                else
                    res.status(201).json({message: {msgBody: "User has been successfully created", msgError: false}});
            });
        }
    });
});

userRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    if (req.isAuthenticated()) {
        //const { _id, username, role } = req.user;
        const _id = req.user._id;
        const username = req.user.username;
        const role = req.user.role;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {username, role}});
    }
});

userRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: '', role: ''}, success: true })
});

userRouter.post('/todo', passport.authenticate('jwt', {session: false}), (req, res) => {
    const todo = new Todo(req.body);
    todo.save(err => {
        if (err)
            res.status(200).json({message: {msgBody: "An Error Has Occurred", msgError: true}});
        else {
            req.user.todos.push(todo);
            req.user.save(err => {
                if (err)
                    res.status(200).json({message: {msgBody: "An Error Has Occurred", msgError: true}});
                else 
                    res.status(500).json({message: {msgBody: "Successfully created todo", msgError: false}});
            });
        }
    });
});

userRouter.get('/todos', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findById({_id : req.user._id}).populate('todos').exec((err, document) => {
        if (err)
            res.status(500).json({message: {msgBody: "An Error has Occurred", msgError: true}});
        else {
             res.status(200).json({todos: document.todos, authenticate : true});
        }
    });
});

userRouter.get('/admin', passport.authenticate('jwt', {session : false}), (req, res) => {
    if (req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});

userRouter.get('/authenticated', passport.authenticate('jwt', {session : false}), (req,res) => {
    const { username, role } = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});
});


module.exports = userRouter;