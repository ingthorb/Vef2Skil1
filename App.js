function App(canvasSelector) {
	var self = this;

	self.getEventPoint = function(e) {
		return new Point(e.pageX - self.canvasOffset.x,e.pageY - self.canvasOffset.y);
	}

	self.drawingStart = function(e) {	
		var startPos = self.getEventPoint(e);
		var shape = new self.shapeConstructor(startPos,self.color);
		shape.pos = startPos;
		shape.color = self.color;
		shape.startDrawing(startPos,self.canvasContext);
		startPos.log('drawing start');
	
		var drawing = function(e) {
			var pos = self.getEventPoint(e);
			
			shape.drawing(pos,self.canvasContext);

			self.redraw();
			shape.draw(self.canvasContext);
		}

		var drawingStop = function(e) {
			var pos = self.getEventPoint(e);

			shape.stopDrawing(pos,self.canvasContext);

			pos.log('drawing stop')

			self.shapes.push(shape);
			shape.added(self.canvasContext);

			// Remove drawing and drawingStop functions from the mouse events
			self.canvas.off({
				mousemove:drawing,
				mouseup:drawingStop
			});

			self.redraw();
		}

		// Add drawing and drawingStop functions to the mousemove and mouseup events
		self.canvas.on({
			mousemove:drawing,
			mouseup:drawingStop
		});	
	}

	self.mousedown = function(e) {
		if(self.shapeConstructor != null) {

			self.drawingStart(e);
		} else {
		}

		self.redraw();
	}

	self.redraw = function() {
		self.canvasContext.clearRect(0, 0, self.canvasContext.canvas.width, self.canvasContext.canvas.height);
		for(var i = 0; i < self.shapes.length; i++) {
			self.shapes[i].draw(self.canvasContext);
		}
	}
	
	self.clear = function() {
		self.shapes = [];
		self.redoArr = [];
		self.redraw();
		self.undoCount = 0;
		//Default size of the canvas
		canvas.width = 1000;
		canvas.height = 700;
		document.getElementById('canvaswidth').value = '1000';
		document.getElementById('canvasheight').value = '700';

	}
	
	self.undo = function() {
		if(self.shapes.length > 0) {
		var lastMove = self.shapes.pop()
		self.redoArr.push(lastMove);
		self.redraw();
		self.undoCount += 1;
		}
	}

	self.redrawRedo = function() {
		var redoItem = self.redoArr.pop();
		self.shapes.push(redoItem);
		redoItem.draw(self.canvasContext);
	}

	self.redo = function() {
		if(self.undoCount > 0) {
			self.redrawRedo();
			self.undoCount -= 1;			
		}
	}
	
	self.saveImage = function(){
        var link = document.createElement('a');
        link.download = "MyImage.png";
        link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
        link.click();
	}

	self.setColor = function(color) {
		self.color = color;
	}	

	self.changeCanvasResolution = function() {

		var newHeight = document.getElementById("canvasheight").value;
		var newWidth = document.getElementById("canvaswidth").value;
		if(newHeight > 1080 || newHeight < 0){
			alert("Height must be between 0 and 1080");
		}
		else if(newWidth > 1920 || newWidth < 0){
			alert("Width must be between 0 and 1920");
		}
		else {
			canvas.width = newWidth;
			canvas.height = newHeight;
			self.redraw();
		}
	}

	self.save = function() {
		var stringifiedArray = JSON.stringify(self.shapes);
		var param = { "user": "logi14", 
			"name": "janlogthor",
			"content": stringifiedArray,
			"template": true
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/Save",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				console.log("saved");				
			},
			error: function (xhr, err) {
				console.log("did not save");				

			}
		});
	}

	self.load = function() {
		var param = { "user": "logi14",
			"name": "janlogthor",
			"template": true
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/GetList",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				var savedID = "";
				for(var i in data) {
					savedID += "<option value=" + data[i].ID + ">" + data[i].ID + "</option>";
				}
				document.getElementById("loadDrawing").innerHTML = savedID;	
			},
			error: function (xhr, err) {
				console.log("something wrong stuff");				
			}
		});
	}

	self.loadLoad = function(id) {
		var param = { ID : id,
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/GetWhiteboard",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				console.log("damn you undefined");
				var Contents = JSON.parse(data.WhiteboardContents);
				for(var i = 0; i < Contents.length; i++) {

					if(Contents[i].name === "Rectangle") {
						var currShape = new Rectangle();
					}
					else if(Contents[i].name === "Square") {
						var currShape = new Square();
					}
					else if(Contents[i].name === "Circle") {
						var currShape = new Circle();
					}					
					else if(Contents[i].name === "Text") {
						var currShape = new Text();
					}					
					else if(Contents[i].name === "Line") {
						var currShape = new Line();
					}
					else if(Contents[i].name === "Pen") {
						var currShape = new Pen();
					}
					else if(Contents[i].name === "Spray") {
						var currShape = new Spray();
					}
					else if(Contents[i].name === "Eraser") {
						var currShape = new Eraser();
					}
					currShape.color = Contents[i].color;
					currShape.lineWidth = Contents[i].lineWidth;
					currShape.name = Contents[i].name;
					currShape.pos = Contents[i].pos;
					currShape.size = Contents[i].size;
					currShape.tFont = Contents[i].tFont;
					currShape.pText = Contents[i].pText;
					currShape.fSize = Contents[i].fSize;
					self.shapes.push(temp);
				}
				self.redraw();		

			},
			error: function (xhr, err) {
				console.log("what the actual f");
			}
		});
	}

	self.init = function() {
		// Initialize App	
		self.canvas = $(canvasSelector);
		self.canvasOffset = new Point(self.canvas.offset().left,self.canvas.offset().top);
		self.canvas.on({
			mousedown:self.mousedown
		});
		self.shapeConstructor = null;
		//Get element
		self.canvasContext = canvas.getContext("2d");
		self.shapes = new Array();
		self.redoArr = new Array();
		self.undoCount = 0;
		// Set defaults
		self.color = '#ff0000';	
		// TODO: Set sensible defaults ...
 		self.load();

	}
 
	self.init();
}

var app = null;
$(function() {
	// Wire up events
	app = new App('#canvas');
	window.onload = function()
	{
		app.shapeConstructor = Rectangle;
	}

	$('#loadImg').change(function(e){
		var reader = new FileReader();
		    reader.onload = function(event){
		        var img = new Image();
		        img.onload = function(){ 
		            canvas.width = img.width;
		            canvas.height = img.height;
		            app.canvasContext.drawImage(img,0,0);
		        }
		        img.src = event.target.result;
		    }
		    reader.readAsDataURL(e.target.files[0]);
	}),

	$('#toolopt li').click(function(){
	var option = ($(this).index());
	switch(option){
		case 0:
			app.shapeConstructor = Rectangle;
			break;
		case 1:
			app.shapeConstructor = Square;
			break;
		case 2:
			app.shapeConstructor = Circle;
			break;
		case 3:
			app.shapeConstructor = Textt;
			break;
		case 4:
			app.shapeConstructor = Line;
			break;
		case 5:
			app.shapeConstructor = Pen;
			break;		
		case 6:
			app.shapeConstructor = Spray;
			break;
		case 7:
			app.shapeConstructor = Eraser;
			break;
		}
	});
	$('#clearbutton').click(function(){app.clear()});
	$('#undobutton').click(function(){app.undo()});
	$('#redobutton').click(function(){app.redo()});
	$('#color').change(function(){app.setColor($(this).val())});
	$('#saveButton').click(function(){app.saveImage()});
	$('#canvasResolution').click(function(){app.changeCanvasResolution()});
	$('#saveAjax').click(function(){app.save()});
	$('#loadBtn').click(function(){app.loadLoad($(this).val())});
	$('#loadDrawing').change(function(){app.loadLoad($(this).val())});

});
