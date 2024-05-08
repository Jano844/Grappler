
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
	var recX = 350;
	var recY = 250;
	var rectangle = new Path.Rectangle({
		point: [recX - 15, recY - 15], // Position des oberen linken Ecks
		size: [30, 30], // Breite und Höhe
		fillColor: "black", // Füllfarbe
	});




	drawCircle(recX, recY, BaseArm.vecCircles, 1);
	drawCircle(Rotationpoint.x, Rotationpoint.y, BaseArm.vecCircles, 1);

	var directionX = Math.abs(Rotationpoint.x - recX);
	var directionY = Math.abs(Rotationpoint.y - recY);


	var len = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2)) / 2; // len Zwischen startPunkt und MittelPunkt
	var MittelPunktX = (Rotationpoint.x + recX) / 2
	var MittelPunktY = (Rotationpoint.y + recY) / 2


	var phi = Math.acos(directionY / (len * 2)) * 180 / Math.PI;
	var phi2 = Math.acos(len / BaseArm.vecCircles) * 180 / Math.PI;

	console.log("Phi 1: ", phi2 + phi);
	console.log(MittelPunktX);
	console.log(MittelPunktY);



	drawCircle(MittelPunktX, MittelPunktY, 8, 0);

	return rectangle;
}


function drawObject() {

}

function update() {
	
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

gameloop();