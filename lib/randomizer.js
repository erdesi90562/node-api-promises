'use strict';
const fs = require('fs');

let inFile = process.argv[2];

let item = function (content) {
  let lines = content.split('\n');
  lines.pop();
};

let random = function (lines) {
  let randomLines = lines.sort(function() {
    return 0.5 - Math.random();
  });

  randomLines.forEach((line) => {
    console.log(line);
  });
};

let pReadFile = (filename, options) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, options, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
};

pReadFile(inFile, { encoding: 'utf8' })
.then(item)
.then(console.log)
.catch(console.error);
