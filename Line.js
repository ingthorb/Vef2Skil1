var Line =  Shape.extend({
	constructor: function(){
		var x0 = 0;
		var y0 = 0;
		this.base("Line");
	},

	draw: function(canvas)
	{
		this.x0 = this.pos.x;
		this.y0 = this.pos.y;
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.lineWidth;
		canvas.beginPath();
		canvas.moveTo(this.x0, this.y0);
		canvas.lineTo(this.size.x,this.size.y);
		canvas.stroke();
		this.base(canvas);
	},

	drawing: function(point)
	{
		this.size.x = point.x;
		this.size.y = point.y;
	}, 

	stopDrawing:function(point) {
		this.size.x = point.x;
		this.size.y = point.y;
	},
});