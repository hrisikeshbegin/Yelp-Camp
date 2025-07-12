const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

module.exports.renderRegister = (req,res) => {
    res.render('users/register');
}

module.exports.register = async(req,res, next) => {
    try{
    const { email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user,password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        req.flash('success',`Welcome to Yelp Camp! ${username}`);
        res.redirect('/campgrounds');
    })
    
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
    
}

module.exports.renderLogin = (req,res) => {
    res.render('users/login');
}

module.exports.login =  (req,res) => {
    req.flash('success', 'Welcome Back to Campgrounds!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    if(!req.user){
        req.flash('error', `You should be logged in first!`);
        return res.redirect('/campgrounds');
    }
    const { username } = req.user;
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        
        req.flash('success', `Goodbye! ${username}`);
        res.redirect('/campgrounds');
    });
}