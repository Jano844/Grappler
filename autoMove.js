
var rotateTo = {
	Basefirst: 0,
	BaseSecond: 0,

	Grappler: 0,
};

function calculateAngle1(recX, recY) {
	var directionX = Math.abs(Rotationpoint.x - recX);
	var directionY = Math.abs(Rotationpoint.y - recY);
	var len = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2)) / 2; // len Zwischen startPunkt und MittelPunkt
	var MittelPunktX = (Rotationpoint.x + recX) / 2
	var MittelPunktY = (Rotationpoint.y + recY) / 2
	var phi = Math.acos(directionY / (len * 2)) * 180 / Math.PI;
	var phi2 = Math.acos(len / BaseArm.vecCircles) * 180 / Math.PI;

	rotateTo.Basefirst = phi + phi2;
	rotateTo.BaseSecond = phi - phi2;
}


function calculateAngle2(recX, recY) {

}

function autoMove() {

	DeltaPhiOne = Math.abs(BaseArm.rotationAngle - rotateTo.Basefirst);
	DeltaPhiTwo = Math.abs(BaseArm.rotationAngle - rotateTo.BaseSecond);

	if (DeltaPhiOne < 1 || DeltaPhiTwo < 1) {
		SpacePressed = false;
		rotateSecond = true;
		calculateAngle2(360, 280);
		return ;
	}

	if (DeltaPhiOne < DeltaPhiTwo)
	{
		if (BaseArm.rotationAngle < rotateTo.Basefirst)
			BaseArm.rotationAngle = BaseArm.rotationAngle + 0.4;
		else
			BaseArm.rotationAngle = BaseArm.rotationAngle - 0.4;
	}
	else
	{
		if (BaseArm.rotationAngle < rotateTo.BaseSecond)
			BaseArm.rotationAngle = BaseArm.rotationAngle + 0.4;
		else
			BaseArm.rotationAngle = BaseArm.rotationAngle - 0.4;
	}
}

function autoMoveSecond() {

}