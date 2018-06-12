let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
	x: undefined,
	y: undefined
};

let maxRadius = 40;
let minRadius = 2;

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

let colorArray = [
	'#ff88cc',
	'#228844',
	'#aacc11',
	'#93f',
	'#04d',
];

// Arc/Circle
function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = () => {
		c.beginPath(); //Set it one more time to draw the shape without any coordinates (In case there's more than a figure)
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); //(x, y, radius, startAngle, endAngle, which direction on clockwise)
		// c.strokeStyle = generateRandomColor();
		// c.stroke(); // We can erase it since both strokeStyle & fillStyle are the same
		c.fillStyle = this.color;
		c.fill();
	};

	this.update = () => {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx; //Incrementing width based on the last time x's coordinates been
		this.y += this.dy;

		// Interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius <= maxRadius) {
				this.radius++;
			}
		} else if (this.radius > this.minRadius) {
			this.radius--;
		}

		this.draw();
	}
}

let circleArray = [];

function init() {
	circleArray = [];
	for (let i = 0; i < 1000; i++) {
		let radius = Math.random() * 4 + 1;
		let x = Math.random() * (innerWidth - radius * 2) + radius;
		let y = Math.random() * (innerHeight - radius * 2) + radius;
		let dx = (Math.random() - 0.5) * 7; //Refers to the velocity or Dimension of the x axis
		let dy = (Math.random() - 0.5) * 7;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

(function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0 ; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}());

init();
