const config = require('../config');

const { Chromeless } = require('chromeless');

const { urls: URLS, elements: ELES } = config.sites.jd;

const run = () => {
  const { username, password } = config.profile;
  const chromeless = new Chromeless(config.chromeless);

  return chromeless
    .goto(URLS.home)
    .wait(ELES.gotoLogin)
    .screenshot()
    .click(ELES.gotoLogin)
    .wait(ELES.usernameLoginButton)
    .click(ELES.usernameLoginButton)
    .wait(ELES.usernameInput)
    .type(ELES.usernameInput, username)
    .type(ELES.passwordInput, password)
    .then((screenshot) => {
      console.log({ screenshot });
      return chromeless.end();
    });
  //   .click(ELES.loginButton)
  //   .wait(ELES.checkinBtn)
  //   .click(ELES.checkinBtn)
  //   .wait(ELES.checkinSuccess)
  //   // "签到成功" if success
  //   .evaluate(selector => document.querySelector(selector).innerText, ELES.checkinSuccess)
  //   .end();
};

module.exports = {
  run,
};

