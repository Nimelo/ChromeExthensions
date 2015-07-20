/**/
function ChartsDataPreparing(){
  
}

/**/
ChartsDataPreparing.prepareForDaily = function(text, callback){
  //console.log("ChartsDataPreparing.prepareForDaily");
  var history = HistoryEntry.fromString(text);
  var data = [];
  
  history.items.forEach(function(el){
    data.push({name: el.domain,
              y: Number(el.counter)}
    );
  });
  
  data.sort(function(a,b){
    return b.y - a.y;
  });
  
  if(data.length > 10){
    var data2 = data.slice(0,9);
    data2.push({name: "Others", y: Number(0)});
    
    data.slice(9).forEach(function(el){
      data2[9].y += el.y;
    });
    data = data2;
  }
  //console.log(data);
  callback(data);
};

/**/
ChartsDataPreparing.prepareForMonthly = function(text, callback){
  var regexForFile = /!.*\.dat\n/;
  var regexForFileGI = /!.*\.dat/gi;
  var splittedStrings = text.split(regexForFile);
  var filesNames = text.match(regexForFileGI);
  splittedStrings = splittedStrings.slice(1);
  var associationArray = [];
  if(filesNames.length == splittedStrings.length){
    
    for(i = 1; i <= numberOfDays(filesNames[0].replace("!","").replace(".dat","").split("-")[0], filesNames[0].replace("!","").replace(".dat","").split("-")[1]); i++){
      associationArray.push("");
    }
    
    for(i = 0; i < splittedStrings.length; i++){
      var day = Number(filesNames[i].replace("!","").replace(".dat","").split("-")[2]);
      associationArray[day - 1] = splittedStrings[i];
    }
    
    var series1 = [];
    var series2 = [];
    var series3 = [];
    
    for(i = 0; i < associationArray.length; i++){
      var histEntry = HistoryEntry.fromString("\n" + associationArray[i]);
      
      histEntry.items.sort(function(a,b){
        return Number(b.counter) - Number(a.counter);  
      });
      
      series1.push({name: "Undefined", y: 0});
      series2.push({name: "Undefined", y: 0});
      series3.push({name: "Undefined", y: 0});
      
      var el1 = histEntry.elementAt(0);
      if(typeof(el1) != 'undefined'){
        //console.log("new el1" + i)
        series1[i] = {name: el1.domain, y: Math.floor(el1.counter / 60)};
      }  
      
      var el2 = histEntry.elementAt(1);
      if(typeof(el2) != 'undefined'){
         //console.log("new el2" + i)
        series2[i] = {name: el2.domain, y: Math.floor(el2.counter / 60)};
      }  
      
      var el3 = histEntry.elementAt(2);
      if(typeof(el3) != 'undefined'){
        // console.log("new el3" + i)
        series3[i] = {name: el3.domain, y: Math.floor(el3.counter / 60)};
      }
      
    }
    var series = [];
    series.push({name: "Top 1",
                data: series1,
                color: '#f45b5b'
    });
    
    series.push({name: "Top 2",
                data: series2,
                color:  '#90ed7d'
    });
    
    series.push({name: "Top 3",
                data: series3,
                color:  '#7cb5ec'
    });
    
    callback(series);
  }
  else
    console.log("error");
  
  
};

/**/
function numberOfDays(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
};