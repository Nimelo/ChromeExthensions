var actual_time = 100;

function GO()
{
	setInterval(function(){myTimer()}, 100);
	function myTimer(){
		Count();
	}
}

function Count()
{
	if(chrome.extension.getBackgroundPage().actual_time > 0)
	{
		actual_time = actual_time - 1;
	}
	else if(chrome.extension.getBackgroundPage().actual_time <= 0)
	{
		actual_time = 100;
	}
}

GO();