//ES6 modules jsonfileservice
import fs from 'fs';

export default class jsonfileservice  {
 constructor(){
    //private method
    let getJsonFromFile = (file) => {
        var json = getConfig(file);
        return json;

    }
    //private method
    let readJsonFileSync =(filepath, encoding) => {

        if (typeof (encoding) === 'undefined') {
            encoding = 'utf8';
        }
        var file = fs.readFileSync(filepath, encoding);
        return JSON.parse(file);
    }
  //private method
   let getConfig = (file) => {
        var filepath = __dirname + file;
        return readJsonFileSync(filepath);
    }
  //expose public functions
  let service = {
      getFile: getJsonFromFile
  };
  //return service
  return service;
}
}
