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
  console.debug({ orcResult });
  // @ts-ignore
  const captchaWords = orc.parserWordsResult(orcResult);

  return captchaWords;
};

const run = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const { username, password } = config.profile;

  await page.goto(URLS.signin);
  const captchaWords = getCaptchaWords(page);
  console.debug({ captchaWords });

  //   .wait(ELES.usernameInput)
  //   .type(ELES.usernameInput, username)
  //   .type(ELES.passwordInput, password)
  //   .click(ELES.loginButton)
  //   .wait(ELES.gotoDailySignin)
  //   .click(ELES.gotoDailySignin)
  //   .wait(ELES.dailySigninButton)
  //   .click(ELES.dailySigninButton)
  //   .wait(ELES.dailySigninResult)
  //   .evaluate(selector => document.querySelector(selector).innerText, ELES.dailySigninResult)
  //   .end();

  await page.screenshot({ path: './dev-images/v2ex-test.png' });
  await browser.close();
};

module.exports = {
  run,
};
