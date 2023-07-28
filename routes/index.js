var express = require('express');
var router = express.Router();
const item_controller = require("../controllers/itemController");
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');
const User = require('../models/user');


/* GET home page. */
router.get("/", connectEnsureLogin.ensureLoggedIn(), item_controller.index);

router.post('/', connectEnsureLogin.ensureLoggedIn(), item_controller.index_post);

router.get('/login', (req, res, next) => {
    res.render('login');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function(req, res) {
	res.redirect('/');
});

router.get("/log-out", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

router.get("/create", connectEnsureLogin.ensureLoggedIn(), item_controller.item_create_get);

router.post("/create", connectEnsureLogin.ensureLoggedIn(), item_controller.item_create_post);

router.get("/:id/update", connectEnsureLogin.ensureLoggedIn(), item_controller.item_update_get);

router.post("/:id/update", connectEnsureLogin.ensureLoggedIn(), item_controller.item_update_post);

router.get("/:id/delete", connectEnsureLogin.ensureLoggedIn(), item_controller.item_delete_get);

router.post("/:id/delete", connectEnsureLogin.ensureLoggedIn(), item_controller.item_delete_post);

module.exports = router;
