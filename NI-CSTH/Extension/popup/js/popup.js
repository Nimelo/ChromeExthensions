
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
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href"); // activated tab
      switch(target){
        case "#dailyTab":
          Messaging.sendMessageWaitRespond("Read", "Today", function(response){
            ChartsDataPreparing.prepareForDaily(response,  ChartsRendering.renderDaily);
          });
          break;
        case "#monthlyTab":
          Messaging.sendMessageWaitRespond("Read", "Month", function(response){
            ChartsDataPreparing.prepareForMonthly(response, ChartsRendering.renderMonthly);
          });
          break;
        default:
          alert(target);
          break;
      }
    });
    
    $(document).ready(function () {
        
        Messaging.sendMessageWaitRespond("Read", "Today", function(response){
          //console.log(response);
          ChartsDataPreparing.prepareForDaily(response,  ChartsRendering.renderDaily);
      });
        
    });
    
    
});



















