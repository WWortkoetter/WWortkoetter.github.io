'use strict';

const rp = require('request-promise');
const $ = require('cheerio');

const stadParse = function(url) {
  console.log("ENTER stadParse");
  return rp(url)
    // .then(function(html) {
    //   // JQueries
    //   var jqCOORD = $(".geo", html).first().text();
    //   lat = String(jqCOORD).split('; ')[0];
    //   lng = String(jqCOORD).split('; ')[1];
    //   console.log("LORD HELP ME");
    //   return {
    //     latlng: [lat, lng],
    //   };
    // })
    .then(function(html) {
      console.log("ENTER STADPARSE.THEN FUNCTION");
      // JQueries
      var jqCOORD = $(".geo", html).first().text();
      console.log(jqCOORD);
      lat = String(jqCOORD).split('; ')[0];
      lng = String(jqCOORD).split('; ')[1];
      console.log("LORD HELP ME");
      return {
        latlng: [lat, lng],
      };
    })
    .catch(function(err) {
      // handle error
    });
};

module.exports = stadParse;
