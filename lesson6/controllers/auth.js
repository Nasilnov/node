const models = require('../models');
const config = require('../config');
const CryptoJS = require("crypto-js");

exports.getLogin = (req, res, next) => {
    if (req.cookies && req.cookies.username){
        let bytes  = CryptoJS.AES.decrypt(req.cookies.password, 'secret key 123');
        let password = bytes.toString(CryptoJS.enc.Utf8);
        res.render('login', { user: req.cookies.username, password: password })
    } else {
    res.render('login', {});
    }
}



exports.postLogin = (req, res, next) => {
    const user = models.User.findUserByName(req.body.username).then (([user, fieldData]) => {
        if (user.length>0) {
            user = user[0];
            console.log(user);
            if (models.User.checkPassword(user, req.body.password)) {
                req.session.username = req.body.username;
                if (req.body.mem == 'on') {
                    res.cookie('username', req.body.username);
                    let password =  CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString();
                    res.cookie('password', password)
                }
                res.redirect('/');
            } else {
                res.redirect('/auth/login/')
            }
        } else {
            res.redirect('/auth/login/');
        }
    })
}

exports.getLoginVk = (req, res, next ) => {
    console.log(req.body);
    // req.session.username = req.body.displayName;
    // res.cookie('username', req.body.displayName);
    res.redirect('/');
    // console.log(req.body);
    // req.session.username = req.body.username;
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

exports.getSignup = (req, res, next) => {
    res.render('signup', {});
}

exports.postSignup = (req, res, next) => {
    models.User.createUser(req.body);
    res.redirect('/auth/login/');
}