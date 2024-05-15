

var line = {
	width: 900,
	height: 120,
	color: "grey",
	posx: -50,
	posy: 100,
}

function drawLine(x, y, width, height, color, outline) {
	var rectangle = new Path.Rectangle({
		point: [x, y], // Position des oberen linken Ecks
		size: [width, height], // Breite und Höhe
		fillColor: color, // Füllfarbe
	});
	if (outline) {
		rectangle.strokeColor = 'orange';
		rectangle.strokeWidth = 5;
	}
	return rectangle;
}


// Create and store the boxes
var boxes = [];

for (var i = 0; i < 5; i++) {
	var newBox = {
		id: i,
		Box: null,
		Circle: null,
		Triangle: null,
		Rectangle: null,
		Shape: null,
		boxPos: 800,
		filledup: false,
		RectColor: "0",
		CircleColor: "0",
		TriColor: "0",
		ShapeColor: "0"
	};
	
	boxes.push(newBox);
}

var shapeBoxHeight = {
	rectangle: 320,
	circle: 385,
	triangle: 389,
	shape: 335,
}

// boxPos = 800;
dist = 150;

// box
function drawBox() {
	for (var i = 0; i < 5; i++) {
	
		var rectangle = new Path.Rectangle({
			point: [(boxes[i].boxPos + i * dist) - 10, 310], // Position des oberen linken Ecks
			size: [100, 100], // Breite und Höhe
			fillColor: "black", // Füllfarbe
		});
		boxes[i].Box = rectangle;
	}
}

// shapes
// rectangle
function drawRectangle() {
	for (var i = 0; i < 5; i++) {

		var rectCol = 'white';
		if (boxes[i].RectColor == "red")
			rectCol = "red";

		var rectangle = new Path.Rectangle({
			point: [boxes[i].boxPos + i * dist, 320], // Position des oberen linken Ecks
			size: [30, 30], // Breite und Höhe
			fillColor: rectCol, // Füllfarbe
		});
		boxes[i].Rectangle = rectangle;
	}
}

// circle
function drawBoxCircle() {
	for (var i = 0; i < 5; i++) {

		var circleCol = 'white';
		if (boxes[i].CircleColor == "green")
			circleCol = "green";
	
		var circle = new Path.Circle({
			center: [(boxes[i].boxPos + i * dist) + 15, 385], // Center of the circle
			radius: 17, // Radius of the circle
			fillColor: circleCol // Fill color of the circle
		});
		boxes[i].Circle = circle;
	}

	return circle;
}

// triangle
function drawBoxTriangle() {
	for (var i = 0; i < 5; i++) {

		var triCol = 'white';
		if (boxes[i].TriColor == "blue")
			triCol = "blue";

		var triangle = new Path.RegularPolygon({
		center: [(boxes[i].boxPos + i * dist) + 65, 389],
		sides: 3,
		radius: 17,
		fillColor: triCol,
		});
		boxes[i].Triangle = triangle;
	}
}

// shape
function drawBoxShape() {
	for (var i = 0; i < 5; i++) {
		
		var shapeCol = 'white';
		if (boxes[i].ShapeColor == "cyan")
			shapeCol = "cyan";

		var triangle = new Path.RegularPolygon({
			center: [(boxes[i].boxPos + i * dist) + 65, 335],
			sides: 8,
			radius: 17,
			fillColor: shapeCol,
		});
		boxes[i].Shape = triangle;
	}
}

function drawFullBox() {
	drawBox();
	drawRectangle();
	drawBoxCircle();
	drawBoxTriangle();
	drawBoxShape();
}

var Boxesmoving = true;

function updateBox() {

	var startPos = 300;
	for (var i = 0; i < 5; i++) {
		if (boxes[i].filledup == true)
			startPos = startPos - 150;
	}

	for (var i = 0; i < 5; i++) {
		if (boxes[i].filledup == true)
			boxes[i].boxPos -= 3;
		else if (boxes[i].boxPos > startPos) {
			boxes[i].boxPos -= 3;
			Boxesmoving = true;
		}
		else
			Boxesmoving = false;
	}

	if (boxes[4].boxPos < -800) {
		for (var i = 0; i < 5; i++) {
			boxes[i].filledup = false;
			boxes[i].CircleColor = "0";
			boxes[i].boxPos = 800;
		}
	}
}
// Finished Boxes

function drawAssemblyLine() {
	drawLine(line.posx, line.posy, line.width, line.height, new Color('#3a3a3a'), true);
	drawLine(line.posx, line.posy + line.height + 2.5, line.width, line.height / 4, "black", false);
	
	line.posy = line.posy + 200;
	drawLine(line.posx, line.posy, line.width, line.height, new Color('#3a3a3a'), true);
	drawLine(line.posx, line.posy + line.height + 2.5, line.width, line.height / 4, "black", false);
	line.posy = line.posy - 200;

	drawFullBox();
}

// testing with enter key to let one box move
var count = 0;
function enterPressed() {
	boxes[count].filledup = true;
	count++;
	if (count == 5)
		count = 0;
}


