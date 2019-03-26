const rp = require('request-promise');
const $ = require('cheerio');

const mlsParse = function(url) {
  return rp(url)
    .then(function(html) {
      return {
        officialname: $('a', html).has($('.infobox vcard').attr('title')).text(),
        nickname: $('.nickname', html).first().text(),
        stadium: $('.label a', html).text(),
      };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = mlsParse;
