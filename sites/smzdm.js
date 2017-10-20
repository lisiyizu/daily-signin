const puppeteer = require('puppeteer');

const config = require('../config');

const { urls: URLS, elements: ELES } = config.sites.smzdm;

const getLoginFrame = (page) => {
  const childFrames = page.mainFrame().childFrames();
  console.log('getLoginFrame.childFrames.length', childFrames.length);
  const loginFrame = childFrames.find(frame => frame.name() === ELES.loginIframeName);
  return loginFrame;
};

const loginProcess = async (page) => {
  // const { username, password } = config.profile;
  await page.goto(URLS.home);
  await page.screenshot({ path: './dev-images/smzdm-home.png' });

  await page.waitForSelector(ELES.login);
  await page.click(ELES.login);
  await page.waitForSelector(ELES.loginIframeID);
  await page.screenshot({ path: './dev-images/smzdm-login-iframe.png' });
  await page.waitFor(100);

  const loginFrame = getLoginFrame(page);
  console.log('loginProcess.loginFrame.name', loginFrame.name());
};

const run = async () => {
  const browser = await puppeteer.launch(config.puppeteer);
  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);

  // login with retry
  await loginProcess(page);

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
