var Textt = Shape.extend({

	constructor: function() {
		this.base("Textt");
	},

	draw: function(canvas) {
		canvas.lineWidth = this.lineWidth;
		var fontoption = String(this.tFont);
		var fsize = String(this.fSize);
		if(fsize == "")
		{
			fsize = "20";
			console.log("Testing success");
		}
		var sz = fsize + "px " + fontoption;

		canvas.font = sz;
		console.log(sz);
		canvas.strokeStyle = this.color;
		canvas.strokeText(this.pText,this.pos.x,this.pos.y);

	},

});