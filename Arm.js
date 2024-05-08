// draw the Arm

// rectangle

function drawRoundedRect(x, y, width, height, radius) {
	var rectangleOne = new Path.Rectangle({
		point: [x, y],
		size: [width, height],
		radius: radius,
		strokeColor: 'black',
		fillColor: 'blue',
	});
	return rectangleOne;
}

// circles
function drawCircle(x, y, radius, fill) {
	var circle = new Path.Circle(new Point(x, y), radius);
	circle.strokeColor = 'black'; // Farbe des Kreisumrisses
	// Alternativ:

	if (fill == 0)
		circle.fillColor = 'black'; // Farbe des Kreisinneren
}

function rotateAroundPoint(path, angle, center) {
	path.rotate(angle, center);
}

function inRadian(angle) {
	var rad = angle * (Math.PI / 180)
	return rad;
}

var BaseArm = {
	x: 200,
	y: 340,
	width: 75,
	height: 250,
	roundAngle: 40,
	// for testing normal value = 0
	rotationAngle: 0,
	vecCircles: 250 - 75
};

var Rotationpoint = {
	x: BaseArm.x + BaseArm.width / 2,
	y: BaseArm.y + BaseArm.height - BaseArm.width / 2,
}

var Grappler = {
	x: Rotationpoint.x + BaseArm.vecCircles * Math.sin(inRadian(BaseArm.rotationAngle)) - BaseArm.width / 2,
	y: Rotationpoint.y - BaseArm.vecCircles * Math.cos(inRadian(BaseArm.rotationAngle)) - BaseArm.width / 2,
	width: 75,
	height: 250,
	roundAngle: 40,
	// for testing nurmal value = 180
	rotationAngle: 180,
	xDir: Rotationpoint.x + BaseArm.vecCircles * Math.sin(inRadian(BaseArm.rotationAngle)),
	yDir: Rotationpoint.y - BaseArm.vecCircles * Math.cos(inRadian(BaseArm.rotationAngle)),


	lastx: 0,
	lasty: 0,
};

function drawCircles() {
	drawCircle(Rotationpoint.x, Rotationpoint.y , 5, 0);
	Grappler.xDir = Rotationpoint.x + BaseArm.vecCircles * Math.sin(inRadian(BaseArm.rotationAngle));
	Grappler.yDir = Rotationpoint.y - BaseArm.vecCircles * Math.cos(inRadian(BaseArm.rotationAngle));

	Grappler.x = Rotationpoint.x + BaseArm.vecCircles * Math.sin(inRadian(BaseArm.rotationAngle)) - BaseArm.width / 2;
	Grappler.y = Rotationpoint.y - BaseArm.vecCircles * Math.cos(inRadian(BaseArm.rotationAngle)) - BaseArm.width / 2;

	// Grappler.rotationAngle = (BaseArm.rotationAngle) + 180;

	var cx = Grappler.xDir + BaseArm.vecCircles * Math.sin(inRadian(Grappler.rotationAngle - 180));
	var cy = Grappler.yDir + BaseArm.vecCircles * Math.cos(inRadian(Grappler.rotationAngle));

	Grappler.lastx = cx;
	Grappler.lasty = cy;
	
	drawCircle(cx, cy, 5, 0);
	drawCircle(cx, cy, 75 / 2, 1);
	drawCircle(Grappler.xDir, Grappler.yDir, 5, 0);
	drawCircle(Grappler.xDir, Grappler.yDir, 74 / 2, 1);
}


function updateArm(direction) {
	if (direction === "D") {
		BaseArm.rotationAngle = BaseArm.rotationAngle 		+ 2;
		Grappler.rotationAngle = Grappler.rotationAngle 	+ 2;
	}
	if (direction === "A") {
		BaseArm.rotationAngle = BaseArm.rotationAngle 		- 2;
		Grappler.rotationAngle = Grappler.rotationAngle		- 2;
	}
	if (direction === "Left")
		Grappler.rotationAngle = Grappler.rotationAngle		- 2;
	if (direction === "Right")
		Grappler.rotationAngle = Grappler.rotationAngle		+ 2;
	if (direction == "Space") {
		SpacePressed = true;
		autoMove();
	}
}

function drawArm() {
	// fixed size
	drawCircles();
	var rect = drawRoundedRect(BaseArm.x, BaseArm.y, BaseArm.width, BaseArm.height, BaseArm.roundAngle);
	var rect2 = drawRoundedRect(Grappler.x, Grappler.y, Grappler.width, Grappler.height, Grappler.roundAngle);
	drawCircles();

	rotateAroundPoint(rect, BaseArm.rotationAngle, new Point(Rotationpoint.x, Rotationpoint.y));
	rotateAroundPoint(rect2, Grappler.rotationAngle, new Point(Grappler.xDir, Grappler.yDir));
}
