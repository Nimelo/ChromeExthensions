
$(function () {
    
    $(document).ready(function () {
        
        Messaging.sendMessageWaitRespond("Read", "", function(response){
          var text = response;
          console.log(text);
          var history = new List();
          history.fromString(text);
          console.log(history);
          var data = [];
          
          var diffs = history.getDiffs();
          
          diffs.forEach(function(el){
            data.push({name: el["url"],
                      y: el["diff"]
            });
          });
          
          console.log(data);
          // Build the chart
          $('#container').highcharts({
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
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: false
                      },
                      showInLegend: true
                  }
              },
              series: [{
                  name: "Websides",
                  colorByPoint: true,
                  data: data
              }]
          });
      });
        
    });
});