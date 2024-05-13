
var rotateTo = {
	Basefirst: 0,
	BaseSecond: 0,


	Grappler: 0,
	dir: 0,
};

function calculateAngle1(recX, recY) {
	var directionX = Math.abs(Rotationpoint.x - recX);
	var directionY = Math.abs(Rotationpoint.y - recY);
	var len = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2)) / 2; // len Zwischen startPunkt und MittelPunkt
	var phi = Math.acos(directionY / (len * 2)) * 180 / Math.PI;
	var phi2 = Math.acos(len / BaseArm.vecCircles) * 180 / Math.PI;

	rotateTo.Basefirst = phi + phi2;
	rotateTo.BaseSecond = phi - phi2;

	if (recX < Rotationpoint.x) {
		rotateTo.Basefirst = -1 * rotateTo.Basefirst;
		rotateTo.BaseSecond = -1 * rotateTo.BaseSecond;
	}
}




function MoveFirst() {
	calculateAngle1(rectGrab.recX, rectGrab.recY);
	var DeltaPhiOne = Math.abs(BaseArm.rotationAngle - rotateTo.Basefirst);
	var DeltaPhiTwo = Math.abs(BaseArm.rotationAngle - rotateTo.BaseSecond);

	var speed = 0.8;
	if (DeltaPhiOne < 2 || DeltaPhiTwo < 2) {
		speed = 0.1;
	}
	
	if (DeltaPhiOne < 0.2 || DeltaPhiTwo < 0.2) {
		rotateFirst = false;
		rotateSecond = true;
		return ;
	}

	if (DeltaPhiOne < DeltaPhiTwo)
	{
		if (BaseArm.rotationAngle < rotateTo.Basefirst) {
			BaseArm.rotationAngle = BaseArm.rotationAngle + speed;
			Grappler.rotationAngle = Grappler.rotationAngle + speed;

		}
		else {
			BaseArm.rotationAngle = BaseArm.rotationAngle - speed;
			Grappler.rotationAngle = Grappler.rotationAngle - speed;
		}
	}
	else
	{
		if (BaseArm.rotationAngle < rotateTo.BaseSecond) {
			BaseArm.rotationAngle = BaseArm.rotationAngle + speed;
			Grappler.rotationAngle = Grappler.rotationAngle + speed;
		}
		else {
			BaseArm.rotationAngle = BaseArm.rotationAngle - speed;
			Grappler.rotationAngle = Grappler.rotationAngle - speed;
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

	if (recX < Grappler.xDir)
		phi = -1 * phi;
	return phi;
}

function MoveSecond() {
	// if condition that if true, sets rotateSecond = false; and returns
	var destPhi = calculateAngle2(rectGrab.recX, rectGrab.recY);

	var vecx = Math.abs(rectGrab.recX - Grappler.lastx);
	var vecy = Math.abs(rectGrab.recY - Grappler.lasty);

	var vecLen = Math.sqrt(Math.pow(vecx, 2) + Math.pow(vecy, 2));
	
	var speed = 0.1;

	if (vecLen > 200)
		speed = speed * 10;
	else if (vecLen > 100)
		speed = speed * 8;
	else if (vecLen > 50)
		speed = speed * 6;
	else if (vecLen > 20)
		speed = speed * 4;
	else if (vecLen > 10)
		speed = speed * 2;


	console.log(vecLen);
	console.log(destPhi + 180);

	if (vecLen < 1) {
		console.log("finished");
		rotateSecond = false;
		rotateDone = true;
		rotateTo.dir = 0;
		return ;
	}

	if (rotateTo.dir == 0) {
		if (Grappler.rotationAngle < destPhi + 180)
			rotateTo.dir = 1;
		else
			rotateTo.dir = -1;
	}
	if (rotateTo.dir == 1)
		Grappler.rotationAngle = Grappler.rotationAngle + speed;
	else
		Grappler.rotationAngle = Grappler.rotationAngle - speed;
}
