const path = require("path");
const { unzip, readDir } = require('./IOhandler')
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */


// Step 1: Read the zip file
// Step 2: Unzip the zip file .then() 前两个完成了才做第三个,用promise
// Step 3: Read all png images from unzipped folder
// Step 4: Sedn them to the grayscale filter function
// Step 5: After All IMAGES have SUCCESSFULLY been
            // grayscaled, show a success message
// ALL ERRORS MUST SHOW IN .catch in PROMISE CHAIN

// Promise ALL一起运行
const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const unzipper = require("unzipper")
const fs = require("fs")



unzip(zipFilePath, pathUnzipped)
    .then(() => readDir(pathUnzipped))
    .then(data => console.log(data))
    .catch(err => console.log(err.message))