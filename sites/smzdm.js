const config = require('../config');

const Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);

const nightmare = Nightmare(config.nightmare);

const { urls: URLS, elements: ELES } = config.sites.smzdm;

const run = () => {
  const { username, password } = config.profile;

  return nightmare
    .goto(URLS.home)
    .wait(ELES.login)
    .click(ELES.login)
    .wait(ELES.loginIframe)
    .enterIFrame(ELES.loginIframe)
    .wait(ELES.usernameInput)
    .type(ELES.usernameInput, username)
    .type(ELES.passwordInput, password)
    .click(ELES.loginButton)
    .resetFrame()
    .wait(ELES.userInfo)
    .wait(5000)
    .click(ELES.dailySigninButton)
    // wait to done
    .wait(1000)
    // "已签到2天" if success
    .evaluate(selector => document.querySelector(selector).innerText, ELES.dailySigninButton)
    .end();
};

module.exports = {
  run,
};
