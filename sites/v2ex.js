const puppeteer = require('puppeteer');

const config = require('../config');
const { orc } = require('../remote/baidu_ai');

const { urls: URLS, elements: ELES } = config.sites.v2ex;

const getCaptchaWords = async (page) => {
  await page.waitForSelector(ELES.captchaImage);

  const captchaElement = await page.$(ELES.captchaImage);
  const captchaBuffer = await captchaElement.screenshot();
  const captchaBase64 = captchaBuffer.toString('base64');

  const orcResult = await orc.webImage(captchaBase64, { language_type: 'ENG' });
  console.log('orcResult', JSON.stringify(orcResult));
  // @ts-ignore
  const captchaWords = orc.parseWordsResult(orcResult);

  return captchaWords;
};

const run = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const { username, password } = config.profile;

  await page.goto(URLS.signin);
  const captchaWords = await getCaptchaWords(page);
  console.log('captchaWords', { captchaWords });

  await page.type(ELES.usernameInput, username);
  await page.type(ELES.passwordInput, password);
  await page.type(ELES.captchaInput, captchaWords);

  await page.screenshot({ path: './dev-images/v2ex-before-login.png' });
  await page.click(ELES.loginButton);
  await page.waitForSelector(ELES.gotoDailySignin);
  await page.screenshot({ path: './dev-images/v2ex-after-login.png' });

  //   .click(ELES.gotoDailySignin)
  //   .wait(ELES.dailySigninButton)
  //   .click(ELES.dailySigninButton)
  //   .wait(ELES.dailySigninResult)
  //   .evaluate(selector => document.querySelector(selector).innerText, ELES.dailySigninResult)
  //   .end();

  await browser.close();
};

module.exports = {
  run,
};
