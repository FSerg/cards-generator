const fs = require('fs');
const getDirName = require('path').dirname;
const mkdirp = require('mkdirp');

const getCheckDigit = code => {
  let evenNumber = 0;
  let oddNumber = 0;

  const iterations = 6;
  for (var i = 1; i <= iterations; i++) {
    evenNumber = evenNumber + parseInt(code.charAt(2 * i));
    oddNumber = oddNumber + parseInt(code.charAt(2 * i - 1));
  }
  evenNumber = evenNumber * 3;

  const checkDigit = 10 - (evenNumber + oddNumber) % 10;
  return checkDigit === 10 ? '0' : checkDigit.toString();
};

const getLastEan13Digit = ean => {
  if (!ean || ean.length !== 12)
    throw new Error('Invalid EAN 13, should have 12 digits');

  const multiply = [1, 3];
  let total = 0;

  ean.split('').forEach((letter, index) => {
    total += parseInt(letter, 10) * multiply[index % 2];
  });

  const base10Superior = Math.ceil(total / 10) * 10;

  return base10Superior - total;
};

const leftPad = (str, len, ch) => {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
};

const writeFile = (path, contents, cb) => {
  mkdirp(getDirName(path), function(err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
};

const makeFile = card => {
  return new Promise((resolve, reject) => {
    // file generation:
    const start = Number(card.start_number);
    const end = Number(card.final_number);
    const prefix = card.prefix;
    const internal_prefix = card.internal_prefix;

    const mainLength = 12 - prefix.length;
    const internalLength = 10 - internal_prefix.length;

    let text = `##@@&&\r\n#\r\n\r\n$$$ADDCCARDDISCS\r\n`;
    for (var i = start; i <= end; i++) {
      let code1 = leftPad(String(i), mainLength, '0');
      let code2 = prefix + code1;
      let fullCode = code2 + String(getLastEan13Digit(code2));
      let internalCode =
        internal_prefix + leftPad(String(i), internalLength, '0');

      text += `${internalCode};1;${fullCode};;;1;;;;1;;;;;;;;;;\r\n`;
      //text += internalCode + ';Card ' + code1 + ';' + fullCode + '\n';
    }

    const fileName = './files/' + card.id + '.txt';
    // console.log('fileName: ' + fileName);
    writeFile(fileName, text, err => {
      // throws an error, you could also catch it here
      if (err) {
        console.log('Error write file: ', err);
        reject();
      }

      // success case, the file was saved
      resolve();
    });
  });
};
module.exports = makeFile;
