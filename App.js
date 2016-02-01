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

	$('#toolopt').change(function(){
	var option = ($(this).val());
	switch(option){
		case 'Rectangle':
			app.shapeConstructor = Rectangle;
			break;
		case 'Square':
			app.shapeConstructor = Square;
			break;
		case 'Circle':
			app.shapeConstructor = Circle;
			break;
		case 'Text':
			app.shapeConstructor = Textt;
			break;
		case 'Line':
			app.shapeConstructor = Line;
			break;
		case 'Pen':
			app.shapeConstructor = Pen;
			break;		
		case 'Eraser':
			app.shapeConstructor = Eraser;
			break;
		case 'Spray':
			app.shapeConstructor = Spray;
		}
	});
	$('#clearbutton').click(function(){app.clear()});
	$('#undobutton').click(function(){app.undo()});
	$('#redobutton').click(function(){app.redo()});
	$('#color').change(function(){app.setColor($(this).val())});
	$('#saveButton').click(function(){app.saveImage()});
	$('#canvasResolution').click(function(){app.changeCanvasResolution()});

});
