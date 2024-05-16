
paper.install(window);
paper.setup('gameCanvas');


// defines
const Roundung = 30;


// // Get the canvas element
// var canvas = document.getElementById('gameCanvas');

// // Get the 2D rendering context
// var ctx = canvas.getContext('2d');

// // Set the willReadFrequently attribute to true
// ctx.willReadFrequently = true;


document.addEventListener('keydown', function(event) {
	if(event.key === "A" || event.key === "a") {
		updateArm("A");
	}
	if(event.key === "D" || event.key === "d") {
		updateArm("D");
	}
	if(event.key === "ArrowLeft") {
		updateArm("Left");
	}
	if(event.key === "ArrowRight") {
		updateArm("Right");
	}
	if(event.key === " ") {
		if (StopTopLine == true) {
			rotateDone = false;
			rotateFirst = true;
			// autoMove();
		}
	}
	if (event.key === "Enter")
		enterPressed();

	if (event.key === "s") {
		if (StopTopLine == true && startRotating == false)
			StopTopLine = false;
		else {
			StopTopLine = true;
			grabShape("rect");
		}
	}
});

var rectGrab = {
	recX:  260,
	recY: 150,
}

function test() {
	// var rectangle = new Path.Rectangle({
	// 	point: [350, 50], // Position des oberen linken Ecks
	// 	size: [30, 30], // Breite und Höhe
	// 	fillColor: "black", // Füllfarbe
	// });




	// drawCircle(rectGrab.recX, rectGrab.recY, BaseArm.vecCircles, 1);
	// drawCircle(Rotationpoint.x, Rotationpoint.y, BaseArm.vecCircles, 1);
	drawCircle(Rotationpoint.x, Rotationpoint.y, BaseArm.vecCircles * 2, 1);

	// return rectangle;
}

var startRotating = false;


var StopTopLine = false;
var rotateFirst = false;
var rotateSecond = false;
var rotateDone = false;

function drawObject() {

}

var frames = 0;
function update() {
	if (StopTopLine == false)
		frames++;
	if (rotateFirst == true)
		MoveFirst();
	if (rotateSecond == true)
		MoveSecond();
	updateBox();
	updateTopLine(frames);
}

function rendering() {
	project.activeLayer.removeChildren();

	drawAssemblyLine();
	drawTopLineObjects();
	drawArm();
	test();
}

function gameloop() {

	// framerate setzen auf Bildschirmfrequenz
	view.onFrame = function(event)
	{
		update();
		rendering();
	}
}


gameloop();
