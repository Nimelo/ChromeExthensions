
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
          Messaging.sendMessageWaitRespond({
                type: "Read",
                message: "Today"
              }, function(response){
            ChartsDataPreparing.prepareForDaily(response,  ChartsRendering.renderDaily);
          });
          break;
        case "#monthlyTab":
          ChartsDataPreparing.prepareForMonthly(ChartsRendering.renderMonthly);

          break;
        default:
          //alert(target);
          break;
      }
    });
    
    $(document).ready(function () {

      Messaging.sendMessageWaitRespond({
                type: "Read",
                message: "Today"
              }, function(response){
      //console.log(response);
        ChartsDataPreparing.prepareForDaily(response.message,  ChartsRendering.renderDaily);
      });
        
      var refresh = document.getElementById('#refresh');
        // onClick's logic below:
        refresh.addEventListener('click', function() {
             Messaging.sendMessageWaitRespond({
                type: "Read",
                message: "Today"
              }, function(response){
        //console.log(response);
          ChartsDataPreparing.prepareForDaily(response.message,  ChartsRendering.renderDaily);
          
      });
      ChartsRendering.renderMonthly(MonthlyChartSeries.series);
        });
    });
    
    
});
















