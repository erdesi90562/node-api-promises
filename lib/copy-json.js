'use strict';

const fs = require('fs');

const stdin = '/dev/stdin';
const stdout = '/dev/stdout';

//
let inFile = process.argv[2] === '-' ? stdin : process.argv[2];
let outFile = process.argv[3] ? process.argv[3] : stdout;
let outFileFlag = outFile === stdout ? 'a' : 'w';

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

let pWriteFile = (filename, data, options) => {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filename, data, options, error => {
      if (error) {
        reject(error);
      }

      resolve(true);
    });
  });
};

pReadFile(inFile, { encoding: 'utf8' })
.then(JSON.parse)
.then(pojo => pojo) // make string out of the pojo
.then(pojo => JSON.stringify(pojo, null, 2))
.then(json => pWriteFile(outFile,json, { flag: outFileFlag}))
.then(() => console.log('\ncopied'))
.catch(console.error());
// .then(data => JSON.parse(data)); // NOT OK  1 to 1 not needed promis takes care of that.
