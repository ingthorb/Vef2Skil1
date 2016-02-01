var Shape = Base.extend({

	constructor:function(x,y,col,type,tFont,lineWidth,pText,name,pos) {
        this.name = name;
        this.pos = pos;
        this.size = new Point(0,0);
        this.color = color;
        this.selected = false;
        this.x = x;
        this.y = y;
        this.endX = x;
        this.endY = y;
        this.type = type;
        var widthID = document.getElementById("lwidth");
        this.lineWidth = widthID.options[widthID.selectedIndex].value;
        var textID = document.getElementById("tfont");
        this.tFont = textID.options[textID.selectedIndex].value;
        this.pText = document.getElementById("pictureText").value;
        this.fSize = document.getElementById("fontSize").value;
    },
 
    findSizeOfSelected: function() {
        var minX = Math.min(this.x, this.endX);
        var minY = Math.min(this.y, this.endY);
        var width = Math.abs(this.endX - this.x);
        var height = Math.abs(this.endY - this.y);
        return new Rect(minX, minY, width, height);
    },
    
	draw:function(canvas) {		
		if ( this.selected === true ) {
			// show selection
		}
	},

	startDrawing:function(point) {

	},

	drawing:function(point) {

	},

	stopDrawing:function(point) {

	},

	added: function(canvas) {

	},
});