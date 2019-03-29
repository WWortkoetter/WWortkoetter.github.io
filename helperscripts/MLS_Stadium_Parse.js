'use strict';

const rp = require('request-promise');
const $ = require('cheerio');

const stadParse = function(url) {
  console.log("STADPARSE");
  return rp(url)
    .then(function(html) {
      // JQueries
      var jqCOORD = $(".geo", html).first().text();
      var lat = jqCOORD.split('; ')[0];
      var lng = jqCOORD.split('; ')[1];

      return {
        latlng: [lat, lng]
      }
    })
    .catch(function(err) {
      // handle error
    });
};

module.exports = stadParse;
