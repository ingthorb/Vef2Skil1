var Shape = Base.extend({

	constructor:function(x,y,col,type,tFont,lineWidth,pText,name) {
        this.name = name;
        this.pos = null;
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
    //Býr til nýjan kassa utan um hvert element
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
    isInShape:function(x,y)
    {
        var x,y,size;
        size = canvas.getBoundingClientRect();
        x = (point.x - size.left) * (canvas.width / size.width);
        y = (point.y - size.top) * (canvas.height / size.height);
        console.log(x);
        return canvas.isPointInPath(x,y);
        //ispointinpath skilar true ef að músin er inní þessum ákveðna path s.s. x og y
        //Þyrftum að reikna út x og y

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