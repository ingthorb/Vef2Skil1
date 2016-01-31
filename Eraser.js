var Eraser = Shape.extend({

    constructor: function() {
        this.base("Eraser");
    },

    draw: function(canvas) {
        canvas.fillStyle = "#ffffff";
        canvas.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        this.base(canvas);
    },
    
    drawing: function(point) {
        this.size.x = point.x - this.pos.x;
        this.size.y = point.y - this.pos.y;
    }

});