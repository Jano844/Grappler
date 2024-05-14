

// Draw Top line shapes


var Shapes = [];

// Add new shape to the top line
function addNewShape(rand) {
	console.log("rand", rand);
	var identity = "null";
	switch (rand) {
		case 0:
			identity = "rect";
			break;
		case 1:
			identity = "circle";
			break;
		case 2:
			identity = "triangle";
			break;
		case 3:
			identity = "shape";
			break;
		default:
			identity = "rect";
	}
	var newShape = {
		id: identity,
		Shape: null,
		pickedup: false,
		boxPos: 800,
	};
	
	Shapes.push(newShape);
}

// Draw all the shapes
function drawTopLineRect(i) {
	if (Shapes[i].id != "rect")
		return ;
	var rectangle = new Path.Rectangle({
		point: [Shapes[i].boxPos, 145], // Position des oberen linken Ecks
		size: [30, 30], // Breite und Höhe
		fillColor: "red", // Füllfarbe
	});
	Shapes[i].Shape = rectangle;
	Shapes[i].id = "rect";
}
function drawTopLineCircle(i) {
	if (Shapes[i].id != "circle")
		return ;
	var circle = new Path.Circle({
		center: [Shapes[i].boxPos + 15, 160], // Center of the circle
		radius: 17, // Radius of the circle
		fillColor: 'green' // Fill color of the circle
	});
	Shapes[i].Shape = circle;
	Shapes[i].id = "circle";
}
function drawTopLineTriangle(i) {
	if (Shapes[i].id != "triangle")
		return ;
	var triangle = new Path.RegularPolygon({
		center: [Shapes[i].boxPos + 15, 167],
		sides: 3,
		radius: 17,
		fillColor: 'blue',
	});
	Shapes[i].Shape = triangle;
	Shapes[i].id = "triangle";
}
function drawTopLineShape(i) { 
	if (Shapes[i].id != "shape")
		return ;
	var triangle = new Path.RegularPolygon({
		center: [Shapes[i].boxPos + 15, 160],
		sides: 8,
		radius: 17,
		fillColor: 'cyan',
	});
	Shapes[i].Shape = triangle;
	Shapes[i].id = "shape";
}

function getRandNum_04() {
	return Math.floor(Math.random() * 5);
}

function updateTopLine(frames) {
	// console.log(frames);
	if (frames % 50 == 0) {
		addNewShape(getRandNum_04());
	}
	if (!(Array.isArray(Shapes))) {
		return ;
	}
	if (StopTopLine == true)
		return ;
	for (var i = 0; i < Shapes.length; i++) {
		Shapes[i].boxPos -= 2;
	}
}

function drawTopLineObjects() {
	if (!(Array.isArray(Shapes))) {
		return ;
	}
	console.log(Shapes.length);
	for (var i = 0; i < Shapes.length; i++) {
		drawTopLineRect(i);
		drawTopLineCircle(i);
		drawTopLineTriangle(i);
		drawTopLineShape(i);
	}
}

