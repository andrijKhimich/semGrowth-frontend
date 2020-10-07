const body = document.getElementsByTagName("body")[0];

// function to move bg ellipses
function parallax(e) {
	let moveX = (e.clientX * -0.3) / 8;
	let moveY = (e.clientY * -0.3) / 8;
	let elipse = document.getElementsByClassName("ellipse");
	for (let i = 0; i < elipse.length; i++) {
		elipse[i].style.transform = "translate(" + moveX + "px," + moveY + "px)";
	}
}

function showEllipses() {
	const elipses = document.getElementsByClassName("ellipse");
	for (let i = 0; i < elipses.length; i++) {
		elipses[i].classList.add("active");
	}
}

function showContent() {
	document.querySelector(".main-wrapper").classList.remove("js-fadeIn");
}

function circularWords() {
	const degreeToRadian = (angle) => {
		return angle * (Math.PI / 180);
	};

	const radius = 60;
	const diameter = radius * 2;

	const circle = document.querySelector("#circular-text");
	circle.style.width = `${diameter}px`;
	circle.style.height = `${diameter}px`;

	const text = circle.innerText;
	const characters = text.split("");
	circle.innerText = null;

	const startAngle = -90;
	const endAngle = 270;
	const angleRange = endAngle - startAngle;

	const deltaAngle = angleRange / characters.length;
	let currentAngle = startAngle;

	characters.forEach((char, index) => {
		const charElement = document.createElement("span");
		charElement.innerText = char;
		const xPos = radius * (1 + Math.cos(degreeToRadian(currentAngle)));
		const yPos = radius * (1 + Math.sin(degreeToRadian(currentAngle)));

		const transform = `translate(${xPos}px, ${yPos}px)`;
		const rotate = `rotate(${index * deltaAngle}deg)`;
		charElement.style.transform = `${transform} ${rotate}`;

		currentAngle += deltaAngle;
		circle.appendChild(charElement);
	});
}

document.addEventListener("DOMContentLoaded", function (e) {
	body.addEventListener("mousemove", function (e) {
		parallax(event);
	});

	showContent();

	setTimeout(function () {
		showEllipses();
	}, 1000);

	circularWords();
});

window.onload = function () {
	// alert("Страница загружена");
};

// $(document).ready(function () {

// });

svg4everybody();
