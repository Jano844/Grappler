
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
	if (event.key === "Enter")
		enterPressed();

	if (event.key === "s") {
		if (StopTopLine == true)
			StopTopLine = false;
		else
			StopTopLine = true;
	}
});

var rectGrab = {
	recX:  260,
	recY: 150,
}

function test() {
	var rectangle = new Path.Rectangle({
		point: [rectGrab.recX - 15, rectGrab.recY - 15], // Position des oberen linken Ecks
		size: [30, 30], // Breite und Höhe
		fillColor: "black", // Füllfarbe
	});




	// drawCircle(rectGrab.recX, rectGrab.recY, BaseArm.vecCircles, 1);
	// drawCircle(Rotationpoint.x, Rotationpoint.y, BaseArm.vecCircles, 1);
	// drawCircle(Rotationpoint.x, Rotationpoint.y, BaseArm.vecCircles * 2, 1); 

	return rectangle;
}

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
