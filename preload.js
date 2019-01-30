const app = require('electron').remote;
const path = require('path');
var fs = require('fs');
const jsonfile = require('jsonfile');
let appPath = app.app.getPath('appData');
var relAppPath = path.join(appPath, app.app.getName(), 'data');

if(!fs.existsSync(relAppPath)){
    fs.mkdir(relAppPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
}

//fs.copyFileSync(path.join(__dirname,'/lineGraph.json'), relAppPath+'/lineGraph.json');
//fs.copyFileSync(path.join(__dirname,'/ohlcGraph.json'), relAppPath+'/ohlcGraph.json');
//fs.copyFileSync(path.join(__dirname,'/streamGraph.json'), relAppPath+'/streamGraph.json');

//Fetches the line graph JSON Data
var _lineGraphJsonData = jsonfile.readFileSync(relAppPath+"/lineGraph.json", function (err, obj) {
    if (err) console.error(err)
    //console.log(obj)
    return obj;
})

//Fetches the OHLC graph JSON Data
var _ohlcGraphJsonData = jsonfile.readFileSync(relAppPath+"/ohlcGraph.json", function (err, obj) {
    if (err) console.error(err)
    return obj;
})

//Fetches the OHLC graph JSON Data
var _streamGraphJsonData = jsonfile.readFileSync(relAppPath+"/streamGraph.json", function (err, obj) {
    if (err) console.error(err)
    return obj;
})

process.once('loaded', () => {
  global.lineGraphJsonData = _lineGraphJsonData
  global.ohlcGraphJsonData = _ohlcGraphJsonData
  global.streamGraphJsonData = _streamGraphJsonData
})