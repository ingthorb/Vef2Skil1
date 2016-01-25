var Textt = Shape.extend({

	constructor: function() {
		this.base("Textt");
	},

	draw: function(canvas) {
		canvas.lineWidth = this.lineWidth;
		var fontoption = String(this.tFont);
		if(fontoption == "")
		{
			fontoption = "Arial";
		}
		var fsize = String(this.fSize);
		if(fsize == "")
		{
			fsize = "20";
		}
		var sz = fsize + "px " + fontoption;
		canvas.font = sz;
		canvas.strokeStyle = this.color;
		canvas.strokeText(this.pText,this.pos.x,this.pos.y);

	},
	drawing: function(point)
	{

	},

});