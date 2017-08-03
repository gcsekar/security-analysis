var express = require('express');
var router = express.Router();

var profile = {};
var passport = require('passport'),
StockTwitsStrategy = require('passport-stocktwits').Strategy;
//    private url: String = "https://api.stocktwits.com/api/2/oauth/token";
//    private client_id: String = "a184352698f4e255";
//    private client_secret: String = "929922ad8f0519a11c4ea18b1f362dbf3d83327d";
//    private grant_type: String = "authorization_code"
//    private response_type: String = "token";
//    private redirect_uri: String = 'http://gcsolution.net';
//    private scope: String = 'read'
passport.use(new StockTwitsStrategy({
    clientID: 'a184352698f4e255',
    clientSecret: '929922ad8f0519a11c4ea18b1f362dbf3d83327d',
    callbackURL: 'http://gcsolution.net:3000/stocktwits/connect/callback',
    passReqToCallback: true
}, function (req, token, secret, profile, done) {
	req.session.token = token;
//	req.session.profile = profile;
	req.session.save();
    console.log(req.session.token);
    console.log(req.session.token);
    done();
}
));

router.get('/connect', passport.authorize('stocktwits',
{scope: ['read','watch_lists','publish_messages','publish_watch_lists',
'follow_users','follow_stocks'], failureRedirect:'/', successRedirect:'/'}));


router.get('/', function(req,res){
	  res.send(req);
});

router.get('/connect/success', function(req,res){
	  res.send(JSON.stringify(req.query));
});

router.get('/connect/failure', function(req,res){
	  res.send(req.body);
});
router.get('/connect/callback', passport.authorize('stocktwits',
		{failureRedirect:'/stocktwits/connect/failure', successRedirect:'/'}));

router.get('/token', function(req,res){
		console.log("token: " + req.session["token"]);
		res.send(req.session)
});

module.exports = router;
