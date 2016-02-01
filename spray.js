var Spray = Shape.extend({

	constructor: function()
	{
		this.sprayArrX = new Array();
		this.sprayArrY = new Array();
		this.base("Spray");
	},

	draw: function(canvas)
	{
		canvas.fillStyle = this.color;
		canvas.lineWidth = this.lineWidth;
		canvas.beginPath();
		canvas.moveTo(this.pos.x, this.pos.y);
		for(var i = 0; i < this.sprayArrX.length; i++){
			canvas.fillRect(this.sprayArrX[i], this.sprayArrY[i],2,2);
		}
		canvas.stroke();
		this.base(canvas);
	},

	drawing:function(point)
	{
		var particles = 40;
	 	for (var i = 0; i < particles; i++){
			var angle = this.offset(0,2*Math.PI);
			var radius = this.offset(0,15);
			var x_new = radius * Math.cos(angle);
			var y_new = radius * Math.sin(angle);
			this.sprayArrX.push(point.x + x_new);
			this.sprayArrY.push(point.y + y_new);
		}
	},

	offset: function(min,max)
	{
		return Math.random() * (max-min) + min;
	}
});