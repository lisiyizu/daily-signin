const puppeteer = require('puppeteer');

const config = require('../config');

const { urls: URLS, elements: ELES } = config.sites.smzdm;

const loginProcess = async (page) => {
  // const { username, password } = config.profile;
  await page.goto(URLS.home);
  await page.screenshot({ path: './dev-images/smzdm-home.png' });
};

const run = async () => {
  const browser = await puppeteer.launch(config.puppeteer);
  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);

  // login with retry
  await loginProcess(page);

  // return nightmare
  //   .goto(URLS.home)
  //   .wait(ELES.login)
  //   .click(ELES.login)
  //   .wait(ELES.loginIframe)
  //   .enterIFrame(ELES.loginIframe)
  //   .wait(ELES.usernameInput)
  //   .type(ELES.usernameInput, username)
  //   .type(ELES.passwordInput, password)
  //   .click(ELES.loginButton)
  //   .resetFrame()
  //   .wait(ELES.userInfo)
  //   .wait(5000)
  //   .click(ELES.dailySigninButton)
  //   // wait to done
  //   .wait(1000)
  //   // "已签到2天" if success
  //   .evaluate(selector => document.querySelector(selector).innerText, ELES.dailySigninButton)
  //   .end();

  await browser.close();
};

module.exports = {
  run,
};
