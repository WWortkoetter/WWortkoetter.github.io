'use strict';

const rp = require('./node_modules/request-promise');
const $ = require('cheerio');
const teamParse = require('./MLS_Team_Parse');
const stadParse = require('./MLS_Stadium_Parse');
const fs = require('fs');
const url = 'https://en.wikipedia.org/wiki/Major_League_Soccer';
const NUMBER_OF_TEAMS = 24;

// array to be filled with urls to each team's wiki page
const teamUrls = [];

var datab = {};
datab.type = "FeatureCollection";
datab.features = [];

rp(url)
    .then(function (html) {
        // ACCESS WIKIPEDIA
        console.log("Gathering teams...");
        for (let i = 0; i < NUMBER_OF_TEAMS; i++) {
            teamUrls.push($('b > a', html)[i].attribs.href);
            console.log("[" + (i+1 < 10 ? '0': '') + String(i+1) + "/" + String(NUMBER_OF_TEAMS) + "]");
        }
        console.log("...Done.");

        return Promise.all(
          teamUrls.map(function(url) {
            return teamParse('https://en.wikipedia.org'+url);
          })
        );
    })
    .then(function(details) {
      // CREATE JSON FILE
      for (let i = 0; i < details.length; i++){
        console.log("*****************DETAILS*****************")
        console.log(details);
        var arr = {};
        arr.type = "Feature";

        arr.geometry = {};
        arr.geometry.type = "Point";
        arr.geometry.coordinates = details[i].coord;

        arr.properties = {};
        arr.properties.teamName = details[i].officialname;
        arr.properties.stadiumName = details[i].stadium;
        arr.properties.links = details[i].links;
        arr.properties.location = details[i].location;

        datab.features.push(arr);
      }
    })
    .then(function(html) {
      return Promise.all(
        datab.features.map(function(each){
          return stadParse('https://en.wikipedia.org'+each.properties.links.stadiumlink);
        })
      );
    })
    .then(function(res) {
      console.log("*****************RESULT******************");
      console.log(res)
      for (let i = 0; i < res.length; i++){
        datab.features[i].geometry.coordinates = res[i].latlng;
      }
      console.log("DATAB: "+datab.features[0].geometry.coordinates[0]);
      console.log("DATAB: "+datab.features[0].geometry.coordinates[1]);
    })
    .catch(function (err) {
      console.log(err);
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
