const baiduAipSdk = require('baidu-aip-sdk');

const { baidu_ai: config } = require('../config');

const orc = new baiduAipSdk.ocr(
  config.api_id,
  config.api_key,
  config.secret_key,
);

// { log_id: 593049095,
//   words_result_num: 1,
//   words_result: [ { words: ' GKPGAOSL' } ] }
// @ts-ignore
orc.parseWordsResult = (data) => {
  if (data.words_result_num < 1) {
    throw new Error('no words are detected');
  }

  const { words_result: [{ words }] } = data;

  const parsedWords = words.replace(/[^A-Za-z0-9]/g, '');
  return parsedWords;
};

module.exports = { orc };
