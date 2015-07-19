
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

          var data = [];
          
          history.items.forEach(function(el){
            data.push({name: el.domain,
                      y: Number(el.counter)}
            );
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