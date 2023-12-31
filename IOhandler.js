/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */
const AdmZip = require('adm-zip')
const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const zip = new AdmZip(pathIn)
    zip.extractAllTo(pathOut,true)
    console.log("Extraction operation complete!")
    resolve("Extraction operation complete!")
  })
}

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    var filename = []
    fs.readdir(dir, (err, files) => {
      if(err) {
        reject(err.message)
      } else {
        files.forEach((data) => {
          if (path.extname(data) === ".png"){filename.push(path.join(dir, data))}
          })
        resolve(filename)
      }
    })
  })
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.dirname(pathOut)
    fs.mkdir(outputPath, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err)
        reject(err);
      } else {
        fs.createReadStream(pathIn)
          .pipe(
            new PNG({
              filterType: 4,
            })
          )
          .on("parsed", function () {
            for (var y = 0; y < this.height; y++) {
              for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2
                this.data[idx] = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3
                this.data[idx + 1] = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3
                this.data[idx + 2] = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3
              }
            }
            this.pack().pipe(fs.createWriteStream(pathOut))
            resolve("grayscale is completed")
          })
      }
    })
  })
}


module.exports = {
  unzip,
  readDir,
  grayScale,
};
