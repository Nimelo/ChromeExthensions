$(document).ready(function(){
				var ctx = $("#mycanvas").get(0).getContext("2d");
				
				//pie chart data
				//sum of values = 360
				var data = [
					{
						value: 270,
						color: "cornflowerblue",
						highlight: "lightskyblue",
						label: "Corn Flower Blue"
					},
					{
						value: 50,
						color: "lightgreen",
						highlight: "yellowgreen",
						label: "Lightgreen"
					},
					{
						value: 40,
						color: "orange",
						highlight: "darkorange",
						label: "Orange"
					}
				];

				//draw
				var piechart = new Chart(ctx).Pie(data);
				
				var buyerData = {
					labels : ["January","February","March","April","May","June"],
					datasets : [
								{
									fillColor : "rgba(172,194,132,0.4)",
									strokeColor : "#ACC26D",
									pointColor : "#fff",
									pointStrokeColor : "#9DB86D",
									data : [203,156,99,251,305,247]
								}
								]
								}
				var ctx2 = $("#line").get(0).getContext("2d");
				new Chart(ctx2).Line(buyerData);
			});

