var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

var model = require('../database/model');

/* GET home page. */
//对访问进行拦截，若没有登陆，则不能进入项目管理页面
router.all('/', isLoggedIn);
router.all('/project', isLoggedIn);

router.get('/', function(req, res, next) {
  res.render('project', { title: '项目总览' });
});

router.get('/project', function(req, res, next) {
  res.render('project', { title: '项目总览' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '登陆'});
});

router.post('/login', function(req, res, next){
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }, function(err, user, info){
    console.log(err, user, info);
    if(err) {
      return res.render('login', {title: '登录', errorMessage: err.message});
    }
    if(!user) {
      return res.render('login', {title: '登陆', errorMessage: info.message});
    }
    return req.logIn(user, function(err){
      if(err) {
        return res.render('login', {title: '登陆', errorMessage: err.message});
      } else {
        return res.redirect('/project');
      }
    });
  })(req, res, next);
});

/*
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
*/

router.get('/register', function(req, res, next) {
  res.render('register', {title: '注册'});
});

router.post('/register', function(req, res, next) {
  var user = req.body;
  var userEmailPromise = null;
  userEmailPromise = new model.User({userEmail: user.userEmail}).fetch();

  return userEmailPromise.then(function(model_fetch) {
    if(model_fetch) {
      res.render('login', {title: '登录', errorMessage: '该邮箱已被注册！'});
    } else {
      var password = user.userPassword;
      var hash = bcrypt.hashSync(password);
      var name = user.userName;
      var tel = user.userTel;
      var address = user.userAddress;

      var registerUser = new model.User({
        userEmail: user.userEmail,
        userPassword: hash,
        userName: user.userName,
        userTel: user.userTel,
        userAddress: user.userAddress
      });

      registerUser.save().then(function(model_fetch){
        res.render('login', {title: '登录'});
      });
    }
  });
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
