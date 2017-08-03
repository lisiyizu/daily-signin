const config = require('../config');

const { Chromeless } = require('chromeless');

const { urls: URLS, elements: ELES } = config.sites.jd;


const run = () => {
  const { username, password } = config.profile;
  const chromeless = new Chromeless(config.chromeless);

  return chromeless
    .goto(URLS.home)
    .wait(ELES.gotoLogin)
    .click(ELES.gotoLogin)
    .wait(ELES.usernameLoginButton)
    .click(ELES.usernameLoginButton)
    .wait(ELES.usernameInpu)
    .type(ELES.usernameInput, username)
    .type(ELES.passwordInput, password)
    .click(ELES.loginButton)
    .wait(ELES.checkinBtn)
    .click(ELES.checkinBtn)
    .wait(ELES.checkinSuccess)
    // "已签到" if success
    .evaluate(selector => document.querySelector(selector).innerText, ELES.checkinSuccess)
    .end();
};

module.exports = {
  run,
};

