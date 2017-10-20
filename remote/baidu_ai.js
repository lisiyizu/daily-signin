const baiduAipSdk = require('baidu-aip-sdk');

const { baidu_ai: config } = require('../config');

const orc = new baiduAipSdk.ocr(
  config.api_id,
  config.api_key,
  config.secret_key,
);

module.exports = { orc };
