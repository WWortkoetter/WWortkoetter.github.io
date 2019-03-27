const rp = require('request-promise');
const $ = require('cheerio');
const mlsParse = require('./MLSParse');
const fs = require('fs');
const url = 'https://en.wikipedia.org/wiki/Major_League_Soccer';
const NUMBER_OF_TEAMS = 24;

const wikiUrls = [];

var datab = {};
datab.type = "FeatureCollection";
datab.features = [];
console.log(datab);

rp(url)
    .then(function (html) {
        //success!
        console.log("Gathering teams...");
        for (let i = 0; i < NUMBER_OF_TEAMS; i++) {
            // wikiUrls.push($('b > a', html)[i].attribs.href);
            tmp = $('b > a', html)[i].attribs.title;
            wikiUrls.push($('b > a', html)[i].attribs.href);
            link = $('b > a', html)[i].attribs.href;
            //datab.features.push({"name":tmp, "link":link});
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
      for (let i = 0; i < details.length; i++){
        var arr = {};
        arr.type = "Feature";

        arr.geometry = {};
        arr.geometry.type = "Point";
        arr.geometry.coordinates = [0,0];

        arr.properties = {};
        arr.properties.teamName = details[i].officialname;
        arr.properties.stadiumName = details[i].stadium;
        arr.properties.location = details[i].location;

        datab.features.push(arr);
      }
      // console.log("DETAILS:");
      // console.log(details);
    })
    .then(function() {
      console.log("*****WRITING FILE*****")
      fs.writeFile('../data/MLS_JSON.js', "var MLS_DATA = " + JSON.stringify(datab), (err) => {
          // in case of a error throw error
          if (err) throw (err);
      });
      console.log("*****WRITING COMPLETE*****")
    })
    .catch(function (err) {
        //handle error
        console.log(err);
    });

// console.log("*****WRITING FILE*****")
// fs.writeFile('../data/output1.js', "var MLS_DATA = " + JSON.stringify(datab), (err) => {
//     // in case of a error throw error
//     if (err) throw (err);
// });
// console.log("*****WRITING COMPLETE*****")
