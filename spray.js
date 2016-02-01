var Spray = Shape.extend({

	constructor: function()
	{
		this.base("Spray");
	},

	draw: function(canvas)
	{
		var particles = 50;
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.lineWidth;
		canvas.beginPath();

		for(var i = 0; i < particles; i++)	
		{
			var off = this.offset(10);
			var x_new = this.pos.x + off[0];
			var y_new = this.pos.y + off[1];
			canvas.fillRect(x_new,y_new,2,2);
			canvas.stroke();
		}
		this.base(canvas);
	},
	offset: function(radius)
	{
		var arr = new Array();
		var randomangle = Math.random() * (2*Math.PI);
		var randomradius = Math.random() * radius;
		//x
		arr.push(Math.cos(randomangle) * randomradius);
		//y
		 arr.push(Math.sin(randomangle) * randomradius);
		return arr;
	}

});