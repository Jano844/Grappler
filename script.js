
paper.install(window);
paper.setup('gameCanvas');

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
		updateArm("Space")
	}
});

var rectGrab = {
	recX: 360,
	recY: 280,
}
function drawRectangle() {
	var rectangle = new Path.Rectangle({
		point: [rectGrab.recX - 15, rectGrab.recY - 15], // Position des oberen linken Ecks
		size: [30, 30], // Breite und Höhe
		fillColor: "black", // Füllfarbe
	});




	drawCircle(rectGrab.recX, rectGrab.recY, BaseArm.vecCircles, 1);
	drawCircle(Rotationpoint.x, Rotationpoint.y, BaseArm.vecCircles, 1);

	return rectangle;
}

var SpacePressed = false;
var rotateSecond = false;

function drawObject() {

}

function update() {
	if (SpacePressed == true)
		autoMove();
	if (rotateSecond == true)
		autoMoveSecond();
}

function rendering() {
	project.activeLayer.removeChildren();
	drawArm();
	drawRectangle();
}

function gameloop() {

	// framerate setzen auf Bildschirmfrequenz
	view.onFrame = function(event)
	{
		update();
		rendering();
	}
}
calculateAngle1(rectGrab.recX, rectGrab.recY);
gameloop();
