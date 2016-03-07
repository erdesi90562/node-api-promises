'use strict';

const fs = require('fs');

let inFile = process.argv[2];

let eachLine = function (content) {
  let lines = content.split('\n');
  lines.pop();
  lines.forEach((line) => {
    console.log('Hello, ' + line + '!');
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
.then(eachLine)
.catch(console.error);
