var Pen  = Shape.extend({

	constructor: function(){
		var clickX = new Array();
		var clickY = new Array();
		var clickDrag = new Array();
		this.base("Pen");
	},
	AddClick: function(x,y,drag)
	{
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(drag);	
	},

	draw: function(canvas)
	{
		canvas.beginPath();
		canvas.closePath();
		canvas.stroke();
	},
	drawing: function(point)
	{
		for(var i = 0; i < clickY.length(); i++)
		{
			//canvas.beginPath();
			if(clickDrag[i] && i) {
				canvas.moveTo(clickX[i-1],click[i-1]);
			}
			else
			{
				canvas.moveTo(clickX[i]-1,clickY[i]);
			}
			canvas.lineTo(clickX[i],clickY[i]);
			//canvas.closePath();
			//canvas.stroke();
		}

	},
});