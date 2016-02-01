var Pen = Shape.extend({

	constructor: function() {
		this.pointArr = [];		
		this.base("Pen");
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.lineWidth;
		canvas.beginPath();
		canvas.moveTo(this.pointArr[0].x, this.pointArr[0].y);
		for (var i = 1; i < this.pointArr.length; i++) {
			canvas.lineTo(this.pointArr[i].x, this.pointArr[i].y);
		}
		canvas.stroke();
		this.base(canvas);
	},

	drawing:function(point) {
		this.pointArr.push(point);
	},
	
	stopDrawing:function(point) {
		this.size.x = point.x;
		this.size.y = point.y
	},
});