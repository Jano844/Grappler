
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




function autoMove() {

	DeltaPhiOne = Math.abs(BaseArm.rotationAngle - rotateTo.Basefirst);
	DeltaPhiTwo = Math.abs(BaseArm.rotationAngle - rotateTo.BaseSecond);

	if (DeltaPhiOne < 1 || DeltaPhiTwo < 1) {
		SpacePressed = false;
		rotateSecond = true;
		calculateAngle2(rectGrab.recX, rectGrab.recY);
		return ;
	}

	if (DeltaPhiOne < DeltaPhiTwo)
	{
		if (BaseArm.rotationAngle < rotateTo.Basefirst) {
			BaseArm.rotationAngle = BaseArm.rotationAngle + 0.4;
			Grappler.rotationAngle = Grappler.rotationAngle + 0.4;

		}
		else {
			BaseArm.rotationAngle = BaseArm.rotationAngle - 0.4;
			Grappler.rotationAngle = Grappler.rotationAngle - 0.4;
		}
	}
	else
	{
		if (BaseArm.rotationAngle < rotateTo.BaseSecond) {
			BaseArm.rotationAngle = BaseArm.rotationAngle + 0.4;
			Grappler.rotationAngle = Grappler.rotationAngle + 0.4;
		}
		else {
			BaseArm.rotationAngle = BaseArm.rotationAngle - 0.4;
			Grappler.rotationAngle = Grappler.rotationAngle - 0.4;
		}
	}
}

function calculateAngle2(recX, recY) {
	// calculate the Angle for the Second arm
	var DeltaY = Math.abs(recY - Grappler.yDir);
	var DeltaX = Math.abs(recX - Grappler.xDir);

	var phi = Math.acos(Math.abs(DeltaY) / BaseArm.vecCircles) * 180 / Math.PI;
	if (phi == 'nan')
		phi = Math.asin(Math.abs(DeltaX) / BaseArm.vecCircles) * 180 / Math.PI;
	return phi;
}

function autoMoveSecond() {
	// if condition that if true, sets rotateSecond = false; and returns
	var destPhi = calculateAngle2(rectGrab.recX, rectGrab.recY);

	var vecx = Math.abs(rectGrab.recX - Grappler.lastx);
	var vecy = Math.abs(rectGrab.recY - Grappler.lasty);

	var vecLen = Math.sqrt(Math.pow(vecx, 2) + Math.pow(vecy, 2));
	console.log("vecLen", vecLen);

	if (vecLen < 3) {
		console.log("finished");
		rotateSecond = false;
		return ;
	}

	var speed = 0.1;
	if (vecLen > 100)
		speed = speed * 10;
	else if (vecLen > 80)
		speed = speed * 8;
	else if (vecLen > 60)
		speed = speed * 6;
	else if (vecLen > 40)
		speed = speed * 4;
	else if (vecLen > 20)
		speed = speed * 2;

	if (Grappler.rotationAngle < destPhi + 180) {
		Grappler.rotationAngle = Grappler.rotationAngle + speed;
	}
	else {
		Grappler.rotationAngle = Grappler.rotationAngle - speed;
	}
}
