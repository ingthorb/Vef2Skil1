var Line =  Shape.extend({
	constructor: function(){
		var startX = 0;
		var startY = 0;
		this.base("Line");
	},
	draw: function(canvas)
	{
		startX = this.pos.x;
		startY = this.pos.y;
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.lineWidth;
		canvas.beginPath();
		//Upphafspunktur
		canvas.moveTo(this.pos.x,this.pos.y);
		//fyrri er lengd, seinni er stefna
		//Endapunktur
		canvas.lineTo(this.size.x,this.size.y);
		canvas.stroke();
		this.base(canvas);
	},

	drawing: function(point)
	{
		//What to do
		this.size.x = point.x;
		this.size.y = point.y;
	}, 

});