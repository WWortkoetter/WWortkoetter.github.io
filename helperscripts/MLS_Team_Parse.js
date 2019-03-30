'use strict';

const rp = require('request-promise');
const $ = require('cheerio');

const mlsParse = function(url) {
  return rp(url)
    .then(function(html) {
      // JQueries for Team Pages
      var jqFULLNAME = $("th:contains('Full') + td", html).text();
      var jqNICKNAME = $('.nickname', html).first().text();
      var jqSTADIUM = $('.label > a:first-child', html).text();
      var jqSTADIUMLINK = $(".label > a:first-child", html).attr("href");
      var jqLOCATION = $('.label > a:last-child', html).text();
      var jqLOCATIONLINK = $('.label > a:last-child', html).attr("href");

      return {
        officialname: jqFULLNAME,
        nickname: jqNICKNAME,
        stadium: jqSTADIUM,
        location: jqLOCATION,
        coord: [0,0],
        links: {
          stadiumlink: jqSTADIUMLINK,
          locationlink: jqLOCATIONLINK
        }
      };
    })
    .catch(function(err) {
      // handle error
    });
};

module.exports = mlsParse;
