const fs = require('fs');

fs.readFile("D:\\sample.txt", {encoding:"UTF-8"}, (err,data)=>{
    console.log(data);
});