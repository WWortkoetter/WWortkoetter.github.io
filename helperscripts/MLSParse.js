const rp = require('request-promise');
const $ = require('cheerio');

const mlsParse = function(url) {
  return rp(url)
    .then(function(html) {
      var jqFULLNAME = $("th:contains('Full') + td", html).text();
      var jqNICKNAME = $('.nickname', html).first().text();
      var jqSTADIUM = $('.label > a:first-child', html).text();
      var jqLOCATION = $('.label > a:last-child', html).text();
      console.log("URL: " + url);
      // console.log("******BEGIN DATA READOUT******")
      // console.log("officialname: " + jqFULLNAME);
      // console.log("nickname: " + jqNICKNAME);
      // console.log("stadium: " + jqSTADIUM);
      // console.log("location: " + jqLOCATION);
      // console.log("******END DATA READOUT******")
      return {
        //officialname: $('tbody:nth-child(2):first-child', html).text(),
        //nickname: $("tbody:has(tr:has(td:class(label)))", html).text(),
        //stadium: $()
        //location: $("td[class='label']:first-child", html).text()
        officialname: jqFULLNAME,
        nickname: jqNICKNAME,
        stadium: jqSTADIUM,
        location: jqLOCATION,
      };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = mlsParse;
