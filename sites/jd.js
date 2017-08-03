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
    .wait(500)
    .wait(ELES.usernameInput)
    .type(username, ELES.usernameInput)
    .type(password, ELES.passwordInput)
    .click(ELES.loginButton)
    .wait(ELES.checkinBtn)
    .click(ELES.checkinBtn)
    .wait(ELES.checkinSuccess)
    // "签到成功" if success
    .evaluate(selector => document.querySelector(selector).innerText, ELES.checkinSuccess)
    .end();
  // .then((text) => {
  //   console.log({ text });
  //   return chromeless.end();
  // });
  // .screenshot()
  // .then((screenshot) => {
  //   console.log({ screenshot });
  //   return chromeless.end();
  // });
};

module.exports = {
  run,
};

