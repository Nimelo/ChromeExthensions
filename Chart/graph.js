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
			});