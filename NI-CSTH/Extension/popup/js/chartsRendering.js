function ChartsRendering(){
  
}

ChartsRendering.renderDaily = function(data){
  // Build the chart
  $('#dailyChart').highcharts({
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
              },
              title: {
                  text: 'Daily websides!'
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                  formatter: function(){
                            return "Time spent on <b>" + this.point.name + "</b>: " + "<b>" + ChartsRendering.secondsToTime(this.y) + "</b>";
                          }
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: false,
                          //format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                          formatter: function(){
                            return "Time spent on " + this.series.name +": " + ChartsRendering.secondsToTime(this.y); 
                          }
                      },
                      showInLegend: true
                  }
              },
              series: [{
                  name: "Today's domains",
                  colorByPoint: true,
                  data: data
              }]
          });
};

ChartsRendering.renderMonthly = function(data){
  var categories = new Array(data[0].data.length);
  for(i = 0; i < categories.length; i++)
    categories[i] = i + 1;
    
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  // Build the chart
  $('#monthlyChart').highcharts({
              chart: {
                  type: 'column'
              },
              title: {
                  text: 'Websides for ' + monthNames[new Date().getMonth()]
              },
              xAxis:{
                categories: categories,
                 crosshair: true,
                 tickInterval: 1
              },
              yAxis: {
                min: 0,
                title: {
                  text: 'Time spent [min]'
                } 
             },
              tooltip: {
                  shared: true,
                  
                  formatter: function () {
                      var points = this.points;
                      var pointsLength = points.length;
                      var tooltipMarkup = pointsLength ? '<span style="font-size: 10px">' + monthNames[new Date().getMonth()] + " " + this.x + '</span><br/>' : '';
                      var index;
                      var value;
          
                      for(index = 0; index < pointsLength; index += 1) {
                        //value = ChartsRendering.secondsToTime(points[index].y);
          
                        tooltipMarkup += '<br/><span style="color:'  + this.points[index].series.color + '">\u25CF</span>' + this.points[index].key + ': <b>' + points[index].y  + ' min</b><br/>';
                      }
          
                      return tooltipMarkup;
                  }
              },
              plotOptions: {
                 column:{
                   pointPadding: 0.2,
                   borderWidth: 0
                 }
              },
              series: data
          });
}

/**/
ChartsRendering.secondsToTime = function(seconds){
  var hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  var result = "";
  
  if(hours != 0){
    result += hours + "h ";
  }
  
  if(minutes != 0){
    result += minutes + "min ";
  }
  
  if(seconds != 0){
    result += seconds + "s.";
  }
  
  return result;
}