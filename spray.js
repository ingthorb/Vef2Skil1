var Spray = Shape.extend({

	constructor: function()
	{
		this.base("Spray");
	},

	draw: function(canvas)
	{
		var particles = 40;
		canvas.fillStyle = this.color;
		canvas.lineWidth = this.lineWidth;
		canvas.beginPath();
		 for (var i = particles; i--; ) 
		 {
			var angle = this.offset(0,2*Math.PI);
			var radius = this.offset(0,15);
			var x_new = this.pos.x + radius * Math.cos(angle);
			var y_new = this.pos.y + radius * Math.sin(angle);
			canvas.fillRect(x_new,y_new,2,2);
			canvas.stroke();
		}
		this.base(canvas);
	},
	drawing:function(point)
	{

	},
	offset: function(min,max)
	{
		var ret = Math.random() * (max-min) + min;
		return ret;
	}

});