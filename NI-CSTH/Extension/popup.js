
$(function () {
    
        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });
    
    $(document).ready(function () {
        
        Messaging.sendMessageWaitRespond("Read", "Today", function(response){
          var text = response;
          //console.log(text);
          var history = HistoryEntry.fromString(text);
          console.log(history);
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
                          enabled: false,
                          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
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
      });
        
    });
});