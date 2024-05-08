
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

function drawRectangle() {
	var rectangle = new Path.Rectangle({
		point: [350, 250], // Position des oberen linken Ecks
		size: [30, 30], // Breite und Höhe
		fillColor: "black", // Füllfarbe
	});
	drawCircle(350 + 15, 250 + 15, BaseArm.vecCircles);
	drawCircle(Rotationpoint.x, Rotationpoint.y, BaseArm.vecCircles);
	return rectangle;
}


function drawObject() {

}

function update() {
	
}

function rendering() {
	project.activeLayer.removeChildren();
	drawRectangle();
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