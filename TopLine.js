

// Draw Top line shapes


var Shapes = [];

// Add new shape to the top line
function addNewShape(rand) {
	// console.log("rand", rand);
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
		startpick: false,
		in_grab_range: false,
		boxPos: 800,
		centerX: 15,
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
	return Math.floor(Math.random() * 4);
}

function deleteShapeAtIndex(index) {
	if (index >= 0 && index < Shapes.length) {
		Shapes.splice(index, 1);
	} else {
		console.log("Index out of bounds");
	}
}

function updateTopLine(frames) {
	// console.log(frames);
	if (frames % 50 == 0) {
		addNewShape(getRandNum_04());
	}
	if (!(Array.isArray(Shapes))) {
		return ;
	}
	for (var i = 0; i < Shapes.length; i++) {
		if (Shapes[i].startpick == true && startRotating == false && rotateDone == true) {
			rotateDone = false;
			put_in_box(Shapes[i].id);
			deleteShapeAtIndex(i);
		}
	}
	if (StopTopLine == true)
		return ;
	for (var i = 0; i < Shapes.length; i++) {
		Shapes[i].boxPos -= 2;
		if (Shapes[i].boxPos < -30 || Shapes[i].pickedup == true) {
			deleteShapeAtIndex(i);
		}
		if (Shapes[i].boxPos > 0 && Shapes[i].boxPos < 500) {
			vecX = Math.abs(Rotationpoint.x - Shapes[i].Shape.position.x);
			vecY = Math.abs(Rotationpoint.y - Shapes[i].Shape.position.y);
			var dist = Math.sqrt(vecX * vecX + vecY * vecY);
			if (dist < (BaseArm.vecCircles * 2))
				Shapes[i].in_grab_range = true;
		}
	}
}

// Grap one Shape
function grabShape(toGrab) {
	if (!(Array.isArray(Shapes))) {
		return ;
	}
	var i = 0;
	for (; i < Shapes.length; i++) {
		if (Shapes[i].in_grab_range == true && Shapes[i].id == toGrab) {
			break;
		}
	}

	if (i == Shapes.length) {
		return ;
	}

	if (Shapes[i].pickedup == true) {
		return ;
	}
	if (Shapes[i].id == "rect") {
		rectGrab.recX = Shapes[i].boxPos + Shapes[i].centerX;
		rectGrab.recY = Shapes[i].Shape.position.y;
		Shapes[i].startpick = true;
		// console.log("Rect");
	} else if (Shapes[i].id == "circle") {
		rectGrab.recX = Shapes[i].boxPos + Shapes[i].centerX;
		rectGrab.recY = Shapes[i].Shape.position.y;
		Shapes[i].startpick = true;
		// console.log("Circle");
	} else if (Shapes[i].id == "triangle") {
		rectGrab.recX = Shapes[i].boxPos + Shapes[i].centerX;
		rectGrab.recY = Shapes[i].Shape.position.y;
		Shapes[i].startpick = true;
		// console.log("Triangle");
	} else if (Shapes[i].id == "shape") {
		rectGrab.recX = Shapes[i].boxPos + Shapes[i].centerX;
		rectGrab.recY = Shapes[i].Shape.position.y;
		Shapes[i].startpick = true;
		// console.log("Shape");
	}
}

function drawTopLineObjects() {
	if (!(Array.isArray(Shapes))) {
		return ;
	}
	// console.log(Shapes.length);
	for (var i = 0; i < Shapes.length; i++) {
		drawTopLineRect(i);
		drawTopLineCircle(i);
		drawTopLineTriangle(i);
		drawTopLineShape(i);
	}
}


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function put_in_box(shape) {

	var i = 0;

	for (; i < 5; i++) {
		if (boxes[i].filledup == false) {
			break;
		}
	}
	if (i == 5) {
		console.log("All boxes are filled");
		return ;
	}
	// console.log("Shape", shape);
	if (shape == "rect") {
		// move to box rect
		startRotating = false;
		rotateDone = false;
		rectGrab.recX = boxes[i].Rectangle.position.x;
		rectGrab.recY = boxes[i].Rectangle.position.y;
		boxes[i].RectColor = "red";
		// start
	} else if (shape == "circle") {
		boxes[i].CircleColor = "green";
	} else if (shape == "triangle") {
		boxes[i].TriColor = "blue";
	} else if (shape == "shape") {
		boxes[i].ShapeColor = "cyan";
	}
}
