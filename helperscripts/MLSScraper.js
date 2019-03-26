const rp = require('request-promise');
const $ = require('cheerio');
const mlsParse = require('./MLSParse');
const fs = require('fs');
const url = 'https://en.wikipedia.org/wiki/Major_League_Soccer';

const wikiUrls = [];

var datab = {};
datab.type = "FeatureCollection";
datab.features = [];
console.log(datab);

rp(url)
    .then(function (html) {
        //success!
        console.log("Gathering teams...");
        for (let i = 0; i < 24; i++) {
            // wikiUrls.push($('b > a', html)[i].attribs.href);
            tmp = $('b > a', html)[i].attribs.title;
            wikiUrls.push($('b > a', html)[i].attribs.href);
            link = $('b > a', html)[i].attribs.href;
            datab.features.push({"name":tmp, "link":link});
            console.log("[" + (i+1 < 10 ? '0': '') + String(i+1) + "/24]");
        }
        console.log("...Done.");
        return Promise.all(
          wikiUrls.map(function(url) {
            console.log('https://en.wikipedia.org'+url);
            return mlsParse('https://en.wikipedia.org'+url);
          })
        );
    })
    .then(function(details) {
      for (let i = 0; i < datab.features.length; i++){
        //datab.features[i].arena =
      }
      console.log("DETAILS:");
      console.log(details);
    })
    .catch(function (err) {
        //handle error
        console.log(err);
    });

    fs.writeFile('../data/output1.js', "var MLSDATA = " + JSON.stringify(datab), (err) => {
        // in case of a error throw error
        if (err) throw (err);
    })
