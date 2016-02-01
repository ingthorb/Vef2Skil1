var Eraser = Shape.extend({

    constructor: function() {
        this.pointArr = [];
        this.base("Eraser");
    },

    draw: function(canvas) {
        canvas.strokeStyle = "#ffffff";
        canvas.lineWidth = this.lineWidth;
        canvas.beginPath();
        canvas.moveTo(this.pointArr[0].x, this.pointArr[0].y);
        for (var i = 1; i < this.pointArr.length; i++) {
            canvas.lineTo(this.pointArr[i].x, this.pointArr[i].y);
        }
        canvas.stroke();
        this.base(canvas);
    },
    
    drawing: function(point) {
        this.pointArr.push(point);
    }

});