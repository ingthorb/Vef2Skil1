var Textt = Shape.extend({

	constructor: function() {
		this.base("Textt");
		//var bla = "ello world!":
	},

	draw: function(canvas) {
		//console.log(this.tFont);
		//console.log(this.pText);
		//Taka inn font size
		//svo fontið sjálft

		canvas.lineWidth = this.lineWidth;
		var fontoption = String(this.tFont);
		var fsize = String(this.fSize);
		if(fsize == "")
		{
			fsize = "20";
			console.log("Testing success");
		}
		var sz = fsize + "px " + fontoption;
			/*var fontoption = String(this.tFont);
		console.log(fontoption);
		var fsize = String(this.fSize);
		console.log(fsize);
		var sz = String(fsize + " " +fontoption);*/
		//sz.concat(fontoption);
		canvas.font = sz;
		console.log(sz);
		/*switch(fontoption){
			case 'Arial':
				canvas.font = "20px Arial";
				break;
			case 'Comic Sans':
				canvas.font = "20px Comic Sans";
				break;
			case 'Georgia':
				canvas.font = "20px Georgia";
				break;
			case 'Tahoma':
				canvas.font = "20px Tahoma";
				break;
			case 'Impact':
				canvas.font = "20px Impact";
				break;
			case 'Courier New':
				canvas.font = "20px Courier New";
			default:
				canvas.font = "20px Arial";

		}*/
		//canvas.font = "20px Arial"
		//console.log(this.tFont);
		canvas.strokeStyle = this.color;
		canvas.strokeText(this.pText,this.pos.x,this.pos.y);

	},

});