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
ChartsDataPreparing.prepareForMonthly = function(callback){
 
      
       MonthlyChartSeries.namesOfCurrentMonth.forEach(function(el){
         
       
       Messaging.sendMessageWaitRespond({
                type: "Read",
                message: "Day",
                day: el
              }, function(response){
                
        var histEntry = HistoryEntry.fromString(response.message);
        
        var currentDay = Number(response.day.replace("!","").replace(".dat","").split("-")[2]);
        console.log(response.day);
        
        histEntry.items.sort(function(a,b){
          return Number(b.counter) - Number(a.counter);  
        });
        
        var el1 = histEntry.elementAt(0);
        if(typeof(el1) != 'undefined'){
          //console.log("new el1" + i)
          MonthlyChartSeries.series1[currentDay - 1] = {name: el1.domain, y: Math.floor(el1.counter / 60)};
        }  
        
        var el2 = histEntry.elementAt(1);
        if(typeof(el2) != 'undefined'){
           //console.log("new el2" + i)
          MonthlyChartSeries.series2[currentDay - 1] = {name: el2.domain, y: Math.floor(el2.counter / 60)};
        }  
        
        var el3 = histEntry.elementAt(2);
        if(typeof(el3) != 'undefined'){
          // console.log("new el3" + i)
          MonthlyChartSeries.series3[currentDay - 1] = {name: el3.domain, y: Math.floor(el3.counter / 60)};
        }
        
        callback(MonthlyChartSeries.series);
              
      });
       });
};

function MonthlyChartSeries(){
    
}
MonthlyChartSeries.isNext = true;
MonthlyChartSeries.series1 = [];
MonthlyChartSeries.series2 = [];
MonthlyChartSeries.series3 = [];
MonthlyChartSeries.series = [];
MonthlyChartSeries.namesOfCurrentMonth = [];
MonthlyChartSeries.amountOfDays = 0;
MonthlyChartSeries.index = 0;
MonthlyChartSeries.getNextIndex = function(){
  /*if(MonthlyChartSeries.amountOfDays > MonthlyChartSeries.index){
    return MonthlyChartSeries.index++;
  }else{
    MonthlyChartSeries.index = 0;
    return MonthlyChartSeries.index++;
  }*/
  MonthlyChartSeries.index += 1;
  MonthlyChartSeries.isNext = true;
}

function Init(){
    MonthlyChartSeries.namesOfCurrentMonth = DateHelper.prepareNamesMonth(new Date().getFullYear(), new Date().getMonth() + 1);
    MonthlyChartSeries.amountOfDays = MonthlyChartSeries.namesOfCurrentMonth.length;
    
    
    for(i = 0; i < MonthlyChartSeries.amountOfDays; i++){
        MonthlyChartSeries.series1.push({name: "Undefined", y: 0});
        MonthlyChartSeries.series2.push({name: "Undefined", y: 0});
        MonthlyChartSeries.series3.push({name: "Undefined", y: 0});
    }
    
    MonthlyChartSeries.series.push({name: "Top 1",
                data: MonthlyChartSeries.series1,
                color: '#f45b5b'
    });
    
    MonthlyChartSeries.series.push({name: "Top 2",
                data: MonthlyChartSeries.series2,
                color:  '#90ed7d'
    });
    
    MonthlyChartSeries.series.push({name: "Top 3",
                data: MonthlyChartSeries.series3,
                color:  '#7cb5ec'
    });
    
}

Init();