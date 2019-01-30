window.onload = function() {

//const relAppPath = path.join(appPath, remote.app.getName(), 'data');
//console.log(relAppPath);
var data = [];
var chart;
var ohlcdata = [];
var ohlcChart;
var streamdata = [];
var streamLineChart;
//Data exracted from JSON and plots in Ghaph
//Parsing JSON to datapoints in canvas js
dayChart(lineGraphJsonData);
ohlcChart(ohlcGraphJsonData);
//streamLineChart(streamGraphJsonData);

//Data plot for Daily Data
function dayChart(result){
    var intv = 1;
    chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Stock Price"
        },
        axisX: {
            labelFormatter: function(e){
                return e.label;
            },
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            },
            labelMaxWidth: 80,
            labelWrap: true,
            labelFontSize: 14
        },
        toolTip:{
            enabled: true,
            shared:true,
            content: "{z}: {y} <br/> Distance: {dist} %"
        },
        axisY: {
            title: "Price",
            includeZero: false,
            prefix: "Rs.",
            gridColor: "#ddd",
            labelFontSize: 14,
        },
        data: data
    });

    
    //console.log(result.length);
    var last_value = 0;
    for(var i = 0; i < result.length; i++){
        var dataSeriesLINE;
        if(i%2==0){
            dataSeriesLINE = { type: "line",
            name: "",
            color: "#c91f37",
            yValueFormatString: "Rs #####.00",
            xValueFormatString: "DD MMM",
            indexLabelFontSize: 0,
            indexLabelBackgroundColor: "#f1f2f6",
            toolTipContent: ""
            };
        }else{
            dataSeriesLINE = { type: "line",
            name: "",
            color: "#000",
            yValueFormatString: "Rs #####.00",
            xValueFormatString: "DD MMM",
            indexLabelFontSize: 0,
            lineThickness: 4.5,
            indexLabelBackgroundColor: "#f1f2f6",
            toolTipContent: ""
            };
        }

        var dt = new Date(result[i].timeStamp);
        var dateString = dt.toLocaleString();
        var dataPointsLINE = [];
        
        if(result[i].GV >= 1){
            var dataPoints = {
                x: intv,
                label: dateString,
                y: result[i].a_value,
                z: result[i].a_type,
                v1: result[i].EnF1,
                v2: result[i].EnF2,
                v3: result[i].EnF3,
                v4: result[i].EnF4,
                v5: result[i].EnF5,
                v6: result[i].EnF6,
                v7: result[i].EnF7,
                p3: result[i].p3,
                p5: result[i].p5,
                p15: result[i].p15,
                p20: result[i].p20,
                indexLabel: result[i].a_type + " : " + result[i].a_value,
                comment: (result[i].comment != null) ? result[i].comment : "No comments",
                //toolTipContent: "{z}: {y} <br/> Distance: {dist} %",
                click: onClick
            };
            if(i!=0){
                dataPoints.dist = (((result[i].a_value - last_value)/last_value)*100).toFixed(3);
            }else{
                dataPoints.dist = 0;
            }
            dataPointsLINE.push(dataPoints);
            last_value = result[i].a_value;        
        }

        if(result[i].GV >= 2){
            intv++;
            dataPointsLINE.push({
                x: intv,
                label: " ",
                y: result[i].b_value,
                z: result[i].b_type,
                v1: result[i].EnF1,
                v2: result[i].EnF2,
                v3: result[i].EnF3,
                v4: result[i].EnF4,
                v5: result[i].EnF5,
                v6: result[i].EnF6,
                v7: result[i].EnF7,
                p3: result[i].p3,
                p5: result[i].p5,
                p15: result[i].p15,
                p20: result[i].p20,
                dist: (((result[i].b_value - result[i].a_value)/result[i].a_value)*100).toFixed(3),
                indexLabel: result[i].b_type + " : " + result[i].b_value,
                comment: (result[i].comment != null) ? result[i].comment : "No comments",
                //toolTipContent: "{z}: {y} <br/> Distance: {dist} %",
                click: onClick
            }); 
            last_value = result[i].b_value;        
        }

        if(result[i].GV >= 3){
            intv++;
            dataPointsLINE.push({
                x: intv,
                label: " ",
                y: result[i].c_value,
                z: result[i].c_type,
                v1: result[i].EnF1,
                v2: result[i].EnF2,
                v3: result[i].EnF3,
                v4: result[i].EnF4,
                v5: result[i].EnF5,
                v6: result[i].EnF6,
                v7: result[i].EnF7,
                p3: result[i].p3,
                p5: result[i].p5,
                p15: result[i].p15,
                p20: result[i].p20,
                dist: (((result[i].c_value - result[i].b_value)/result[i].b_value)*100).toFixed(3),
                indexLabel: result[i].c_type + " : " + result[i].c_value,
                comment: (result[i].comment != null) ? result[i].comment : "No comments",
                //toolTipContent: "{z}: {y} <br/> Distance: {dist} %",
                click: onClick
            }); 
            last_value = result[i].c_value;        
        }

        if(result[i].GV >= 4){
            intv++;
            dataPointsLINE.push({
                x: intv,
                label: " ",
                y: result[i].d_value,
                z: result[i].d_type,
                v1: result[i].EnF1,
                v2: result[i].EnF2,
                v3: result[i].EnF3,
                v4: result[i].EnF4,
                v5: result[i].EnF5,
                v6: result[i].EnF6,
                v7: result[i].EnF7,
                p3: result[i].p3,
                p5: result[i].p5,
                p15: result[i].p15,
                p20: result[i].p20,
                dist: (((result[i].d_value - result[i].c_value)/result[i].c_value)*100).toFixed(3),
                indexLabel: result[i].d_type + " : " + result[i].d_value,
                comment: (result[i].comment != null) ? result[i].comment : "No comments",
                //toolTipContent: "{z}: {y} <br/> Distance: {dist} %",
                click: onClick
            }); 
            last_value = result[i].d_value;     
        }

        dataSeriesLINE.dataPoints = dataPointsLINE;
        data.push(dataSeriesLINE);  
        
        if(i<result.length-1){
            var  dataSeriesDOT = {
                type: "line",
                lineDashType: "dot",
                color: "#e57373",
            };
            
            var dataPointsDOT = [];
            dataPointsDOT.push({
                x: intv,
                y: last_value,
                z: "",
                toolTipContent: " ",
                click: onClick
            });

            intv++;
            dt = new Date(result[i+1].timeStamp);
            dateString = dt.toLocaleString();
            dataPointsDOT.push({
                x: intv,
                y: result[i+1].a_value,
                z: "",
                toolTipContent: " ",
                click: onClick
            });
        
            dataSeriesDOT.dataPoints = dataPointsDOT;
            data.push(dataSeriesDOT);
        }
        console.log(data);
    }
    chart.render();
}

function ohlcChart(result){
    var intv = 0;
    //PLOTTING OF OHCL GRAPH
    ohlcChart = new CanvasJS.Chart("chartContainerOhlc", {
        title: {
            text: "OHLC Graph of Stock"
        },
        animationEnabled: true,
        exportEnabled: true,
        zoomEnabled: true,
        axisX: {
            labelFormatter: function(e){
                return e.label;
            },
            //interval: 1,
            // intervalType: "second",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            },
            labelMaxWidth: 80,
            labelWrap: true,
            labelFontSize: 14
        },
        toolTip:{
            enabled: true,
            shared:true,
            content: "Date: {z} </br> <strong>Prices: </strong> </br> Open: {y[0]}, Close: {y[3]} </br>  High: {y[1]}, Low: {y[2]} "
        },
        axisY: {
            title: "Price",
            includeZero: false,
            prefix: "Rs.",
            gridColor: "#ddd"
        },
        data: ohlcdata
    });

    var dataSeries = { type: "ohlc",
        indexLabelFontSize: 12
        };
    var dataPoints = [];
        
    //OHLC graph individual nodes
    for (var i = 0; i < result.length; i++) {
        intv++;
        var dt = new Date(result[i].timeStamp);
        var dateString = dt.toLocaleString();
        dataPoints.push({
            x: intv,
            label: dateString,
            z: dateString,
            y: [result[i].O,result[i].H,result[i].L,result[i].C],
            //indexLabel: "O:"+ result[i].O + "\nH:" + result[i].H + "\nL:" + result[i].L + "\nC:" + result[i].C,
            comment: (result[i].comment != null) ? result[i].comment : "No comments",
            click: onOHLCClick,
        });
    }
    dataSeries.dataPoints = dataPoints;
    ohlcdata.push(dataSeries);  

    var dataSeries = { type: "scatter",
        lineThickness: 1,
        color: "transparent",
        indexLabelFontSize: 12
        };
    var dataPoints = [];
    intv = 0;   
    //Label to OHLC graph individual nodes
    for (var i = 0; i < result.length; i++) {
        intv++;
        dataPoints.push({
            x: intv,
            label: dateString,
            z: dateString,
            y: result[i].O,
            indexLabel: "O:"+ result[i].O,
            toolTipContent: " "
        });
        dataPoints.push({
            x: intv,
            z: new Date(result[i].timeStamp),
            y: result[i].H,
            indexLabel: "H:" + result[i].H,
            toolTipContent: " "
        });
        dataPoints.push({
            x: intv,
            z: new Date(result[i].timeStamp),
            y: result[i].L,
            indexLabel: "L:" + result[i].L,
            toolTipContent: " "
        });
        dataPoints.push({
            x: intv,
            z: new Date(result[i].timeStamp),
            y: result[i].C,
            indexLabel: "C:" + result[i].C,
            toolTipContent: " "
        });
    }
    dataSeries.dataPoints = dataPoints;
    ohlcdata.push(dataSeries);  

    //console.log(ohlcdata);
    ohlcChart.render();
}

//Hide Labels
document.getElementById("hideData").addEventListener("click", function(){
    for(var i=0; i< chart.data.length; i++){
        chart.data[i].set("indexLabelFontSize", "0");
    }
    for(var i=0; i< ohlcChart.data.length; i++){
        ohlcChart.data[i].set("indexLabelFontSize", "0");
    }
    this.disabled = false;
})
//Show Labels
document.getElementById("showData").addEventListener("click", function(){
    for(var i=0; i< chart.data.length; i++){
        chart.data[i].set("indexLabelFontSize", "12");
    }
    for(var i=0; i< ohlcChart.data.length; i++){
        ohlcChart.data[i].set("indexLabelFontSize", "12");
    }
    this.disabled = false;
})

//show line graph
document.getElementById("line").addEventListener("click", function(){
    document.getElementById("chartContainer").style.display = "block";
    document.getElementById("chartContainerOhlc").style.display = "none";
    this.disabled = false;
})

//show ohlc graph
document.getElementById("ohlc").addEventListener("click", function(){
    document.getElementById("chartContainerOhlc").style.display = "block";
    document.getElementById("chartContainer").style.display = "none";
    this.disabled = false;
})

//Percentage Difference in value calculator
function onClick(e){
    if(document.getElementById("gvaly1").value!=0){
      document.getElementById("gvaly2").value = e.dataPoint.y;
    }else{
      document.getElementById("gvaly1").value = e.dataPoint.y;
    }
    document.getElementById("comment").innerHTML = e.dataPoint.comment;
}

document.getElementById("distanceFinder").addEventListener("submit", function(){
    var p1 = document.getElementById("gvaly1").value;
    var p2 = document.getElementById("gvaly2").value;
    var dist = Math.round(((p2 - p1)/p2 ) * 10000)/100;
    $("#distance").html(dist);
});


var radios = document.forms["tooltipSetForm"].elements["tooltipSelector"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].addEventListener("click", function(){
        showTooltip(this.value);
    });
}

function showTooltip(type){
    if(type == 'point'){
        chart.toolTip.set("content", "{z}: {y} <br/> Distance: {dist} %");
    }
    if(type == 'enf'){
        chart.toolTip.set("content", "EnF Values <br/> {v1} <br/> {v2} <br/> {v3} <br/> {v4} <br/> {v5} <br/> {v6} <br/> {v7}");
    }
    if(type == 'percentage'){
        chart.toolTip.set("content", "Percentage: <br/> 3% : {p3} <br/>  5% : {p5} <br/> 15% : {p15} <br/> 20% : {p20}");
    }
    this.disabled = true;
}

function onOHLCClick(e){
    console.log(e);
    document.getElementById("comment").innerHTML = e.dataPoint.comment;
}


}