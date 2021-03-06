var Circle = Shape.extend({

	constructor: function() {
		this.base("Circle");
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.lineWidth;
		canvas.beginPath();
		canvas.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
		canvas.stroke();
		this.base(canvas);
	},

	drawing:function(point) {
		this.size.x = Math.abs(point.x - this.pos.x);
		this.size.y = Math.abs(point.y - this.pos.y);
		this.radius = Math.abs(this.size.x + this.size.y)/2;

	},

	added: function(canvas) {
		if(this.size.x < 0) {
			this.pos.x += this.size.x;
			this.size.x = Math.abs(this.size.x);
		}

		if(this.size.y < 0) {
			this.pos.y += this.size.y;
			this.size.y = Math.abs(this.size.y);
		}
	},	

})