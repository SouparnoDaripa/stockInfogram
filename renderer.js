const app = require('electron').remote;
var dialog = app.dialog;
const path = require('path');
let appPath = app.app.getPath('appData');
var relAppPath = path.join(appPath, app.app.getName(), 'data');
var fs = require('fs');
var XLSX = require('xlsx');
var dateFormat = require('dateformat');
var rABS = true; 
var do_file = (function() {
    return function do_file(files) {
        var f = files[0];
        var result = {};
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          if(!rABS) data = new Uint8Array(data);
          var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
          workbook.SheetNames.forEach(function(sheetName) {
          var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName],{raw:true});
            if(roa.length) result[sheetName] = roa;
          });
          makejson4linegraph(result.DayChart);
          makejson4OHLCgraph(result.DayChart);
          makejson4streamgraph(result.DayChart);
          document.getElementById("fileUpload").value = "";
        };
        if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
    };
})();

(function() {
    var xlf = document.getElementById('upload');
    var fileUpload = document.getElementById('fileUpload');
    if(!xlf.addEventListener) return;
    function handleFile(e) { do_file(fileUpload.files); }
    xlf.addEventListener('click', handleFile, false);
})();

function makejson4linegraph(data){
    // console.log(data);e
    var noofelements = data.length;
    var file = []
    for (var i=0; i< noofelements; i++){
        var datapoint = {
            timeStamp   : new Date(((data[i].Date+data[i].Time) - (25567 + 2))*86400*1000),
            EnF1        : parseInt(data[i].ENFValue1),
            EnF2        : parseInt(data[i].ENFValue2),
            EnF3        : parseInt(data[i].ENFValue3),
            EnF4        : parseInt(data[i].ENFValue4),
            EnF5        : parseInt(data[i].ENFValue5),
            EnF6        : parseInt(data[i].ENFValue6),
            EnF7        : parseInt(data[i].ENFValue7),
            p3          : parseInt(data[i].Three),
            p5          : parseInt(data[i].Five),
            p15         : parseInt(data[i].Fifteen),
            p20         : parseInt(data[i].Twenty),
            comment     : data[i].Comment
        }
        
        var count = 0;

        if(data[i].Data1 != null){
            var a = parseInt(data[i].Data1);
            count++;
            switch(count){
                case 1 : datapoint.a_type = data[i].Legend1; datapoint.a_value = a; break;
                case 2 : datapoint.b_type = data[i].Legend1; datapoint.b_value = a; break;
                case 3 : datapoint.c_type = data[i].Legend1; datapoint.c_value = a; break;
                case 4 : datapoint.d_type = data[i].Legend1; datapoint.d_value = a; break;
            }
        }

        if(data[i].Data2 != null){
            var b = parseInt(data[i].Data2);
            count++;
            switch(count){
                case 1 : datapoint.a_type = data[i].Legend2; datapoint.a_value = b; break;
                case 2 : datapoint.b_type = data[i].Legend2; datapoint.b_value = b; break;
                case 3 : datapoint.c_type = data[i].Legend2; datapoint.c_value = b; break;
                case 4 : datapoint.d_type = data[i].Legend2; datapoint.d_value = b; break;
            }
        }

        if(data[i].Data3 != null){
            var c = parseInt(data[i].Data3);
            count++;
            switch(count){
                case 1 : datapoint.a_type = data[i].Legend3; datapoint.a_value = c; break;
                case 2 : datapoint.b_type = data[i].Legend3; datapoint.b_value = c; break;
                case 3 : datapoint.c_type = data[i].Legend3; datapoint.c_value = c; break;
                case 4 : datapoint.d_type = data[i].Legend3; datapoint.d_value = c; break;
            }
        }

        if(data[i].Data4 != null){
            var d = parseInt(data[i].Data4);
            count++;
            switch(count){
                case 1 : datapoint.a_type = data[i].Legend4; datapoint.a_value = d; break;
                case 2 : datapoint.b_type = data[i].Legend4; datapoint.b_value = d; break;
                case 3 : datapoint.c_type = data[i].Legend4; datapoint.c_value = d; break;
                case 4 : datapoint.d_type = data[i].Legend4; datapoint.d_value = d; break;
            }
        }
        datapoint.GV = count;
        
        file.push(datapoint);
    }
    fs.writeFile(relAppPath+"/lineGraph.json", JSON.stringify(file,2,2), function(err) {
        if(err){
            alert("An error occured while processing the file");
            console.log(err);
            return;
        }
        alert("The file has been uploaded succesfully");
    });     
}

function makejson4OHLCgraph(data){
    // console.log(data);
    var noofelements = data.length;
    var file = []
    for (var i=0; i< noofelements; i++){
        var O_value, H_value, L_value, C_value;
        var L1 = data[i].Legend1, V1 = parseInt(data[i].Data1);
        var L2 = data[i].Legend2, V2 = parseInt(data[i].Data2);
        var L3 = data[i].Legend3, V3 = parseInt(data[i].Data3);
        var L4 = data[i].Legend4, V4 = parseInt(data[i].Data4);
        var OHLC = {[L1]:V1, [L2]:V2, [L3]:V3, [L4]:V4};
        // console.log(OHLC);
        var datapoint = {
            timeStamp   : new Date(((data[i].Date+data[i].Time) - (25567 + 2))*86400*1000),
            O           : isNaN(OHLC.O)?OHLC.L:OHLC.O,
            H           : OHLC.H,
            L           : OHLC.L,
            C           : isNaN(OHLC.C)?OHLC.L:OHLC.C,
            comment     : data[i].Comment
        }
        file.push(datapoint);
    }
    fs.writeFile(relAppPath+"/ohlcGraph.json", JSON.stringify(file,2,2), function(err) {
        if(err){
            alert("An error occured while processing the file");
            console.log(err);
            return;
        }
        alert("The file has been uploaded succesfully");
    });
}

function makejson4streamgraph(data){
    //console.log(data);
    var noofelements = data.length;
    var file = {x:[],y:[],l:[]}
    for (var i=0; i< noofelements; i++){
        if(!isNaN(parseInt(data[i].Data1))){
            // console.log(isNaN(parseInt(data[i].Data1)));
            file.x.push(new Date(((data[i].Date+data[i].Time) - (25567 + 2))*86400*1000));
            file.y.push(parseInt(data[i].Data1));
            file.l.push(data[i].Legend1)
        }

        if(!isNaN(parseInt(data[i].Data2))){
            // console.log(isNaN(parseInt(data[i].Data2)));
            file.x.push(new Date(((data[i].Date+data[i].Time) - (25567 + 2))*86400*1000));
            file.y.push(parseInt(data[i].Data2));
            file.l.push(data[i].Legend2)
        }

        if(!isNaN(parseInt(data[i].Data3))){
            // console.log(isNaN(parseInt(data[i].Data3)));
            file.x.push(new Date(((data[i].Date+data[i].Time) - (25567 + 2))*86400*1000));
            file.y.push(parseInt(data[i].Data3));
            file.l.push(data[i].Legend3)
        }
        
        if(!isNaN(parseInt(data[i].Data4))){
            // console.log(isNaN(parseInt(data[i].Data4)));
            file.x.push(new Date(((data[i].Date+data[i].Time) - (25567 + 2))*86400*1000));
            file.y.push(parseInt(data[i].Data4));
            file.l.push(data[i].Legend4)
        }
        
    }
    fs.writeFile(relAppPath+"/streamGraph.json", JSON.stringify(file,2,2), function(err) {
        if(err){
            alert("An error occured while processing the file");
            console.log(err);
            return;
        }
        alert("The file has been uploaded succesfully");
    });
}