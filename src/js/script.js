// global project variables
const body = document.getElementsByTagName("body")[0];
const nav = document.querySelector(".nav");
const navigationList = document.querySelector(".nav-list");
const humburger = document.querySelector(".humburger");
const ctaWords = document.querySelector("#ctaWords");
const headerWords = document.querySelector("#headerWords");

// function to move bg ellipses
function parallax(e) {
  const n = 3;
  let moveX = (e.clientX * -0.3) / 8;
  let moveY = (e.clientY * -0.3) / 8;
  let elipse = document.getElementsByClassName("ellipse");
  for (let i = 0; i < elipse.length; i++) {
    elipse[i].style.transform = "translate(" + moveX + "px," + moveY + "px)";
  }
}

// set position to the slider navigation buttons
function setSliderNavPosition() {
  const sliderNav = document.querySelector(".testimonials-slider__nav");
  const element = document.querySelector(".testimonials-slider__img");
  const style = element.currentStyle || window.getComputedStyle(element);
  const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  const width = element.offsetWidth;

  sliderNav.style.left = width + margin + "px";
}

// show ellipses after loading the content(page)
function showEllipses() {
  const elipses = document.getElementsByClassName("ellipse");
  for (let i = 0; i < elipses.length; i++) {
    elipses[i].classList.add("active");
  }
}

// juas fadeOut function
function fadeOut(element) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    op -= op * 0.1;
  }, 20);
}

// just fadeIn function
function fadeIn(element) {
  var op = 0.1; // initial opacity
  element.style.display = "flex";
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    op += op * 0.1;
  }, 10);
}

function openMenu() {
  // console.log(this);
  humburger.classList.add("open");
  fadeIn(nav);
  setTimeout(function () {
    navigationList.classList.add("open");
  }, 800);
}

function closeMenu() {
  humburger.classList.remove("open");
  navigationList.classList.remove("open");
  fadeOut(nav);
}

// slow show all contenr after loading the page
function showContent() {
  document.querySelector(".main-wrapper").classList.remove("js-fadeIn");
}

// rounded words on firs screen
function circularWords(words) {
  const degreeToRadian = (angle) => {
    return angle * (Math.PI / 180);
  };

  const radius = 60;
  const diameter = radius * 2;

  const circle = words;
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

  humburger.addEventListener("click", function () {
    // nav.classList.toggle("open");
    if (this.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  circularWords(ctaWords);
  circularWords(headerWords);
  setSliderNavPosition();

  $(".testimonials-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    dots: false,
    arrows: true,
    infinite: true,
    fade: true,
    adaptiveHeight: true,
    prevArrow: $(".arrow-btn_prev"),
    nextArrow: $(".arrow-btn_next"),
    infinite: false,
    responsive: [{
      breakpoint: 769,
      settings: {
        fade: false,
        adaptiveHeight: false,
        arrows: false,
      },
    }, ],
  });
});

window.addEventListener("resize", function (event) {
  // do stuff here
  setSliderNavPosition();
});

window.onload = function () {
  // alert("Page is loaded!!!!!");
};

$(document).ready(function () {});

svg4everybody();