var Pen  = Shape.extend({

	constructor: function(){
		//Nota array
		this.base("Pen");
	},

	draw: function(canvas)
	{
		canvas.beginPath();
		canvas.closePath();
		canvas.stroke();
	},
	drawing: function(point)
	{
		for(var i = 0; i < this.pos.x.length(); i++)
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