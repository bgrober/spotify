var Cookies = require('cookies');

var cookieController = {};
cookieController.setSSIDCookie = setSSIDCookie;

function setSSIDCookie(req, res, next) {
  // write code here
  var cookies = new Cookies (req, res);
  cookies.set('ssid', "reallySecureCookie", {httpOnly: false});
  next();
}

module.exports = cookieController;
