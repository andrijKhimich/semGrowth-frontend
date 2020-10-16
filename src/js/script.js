// global project variables
const body = document.getElementsByTagName("body")[0];
const nav = document.querySelector(".nav");
const navigationList = document.querySelector(".nav-list");
const humburger = document.querySelector(".humburger");
const ctaWords = document.querySelector("#ctaWords");
const headerWords = document.querySelector(".js-header-words");
const sliderNav = document.querySelector(".testimonials-slider__nav");
const subItem = document.querySelector('nav-list li');
const subList = document.querySelector(".sublist");
let windowWidth = window.innerWidth;
// console.log(windowWidth);
//  console.log(sliderNav.length);
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
    if (this.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (windowWidth <= 768) {
    subItem.addEventListener("click", () => {
      /** Slide down. */
      if (!subList.classList.contains("active")) {
				/** Show the container. */
				subList.classList.add("active");
				subList.style.height = "auto";

				/** Get the computed height of the container. */
				var height = subList.clientHeight + "px";

				/** Set the height of the content as 0px, */
				/** so we can trigger the slide down animation. */
				subList.style.height = "0px";

				/** Do this after the 0px has applied. */
				/** It's like a delay or something. MAGIC! */
				setTimeout(() => {
					subList.style.height = height;
				}, 0);

				/** Slide up. */
			} else {
				/** Set the height as 0px to trigger the slide up animation. */
				subList.style.height = "0px";

				/** Remove the `active` class when the animation ends. */
				subList.addEventListener(
					"transitionend",
					() => {
						subList.classList.remove("active");
					},
					{
						once: true,
					}
				);
			}
    });
  }
  circularWords(ctaWords);

  circularWords(headerWords);

  if (typeof sliderNav != "undefined" && sliderNav != null) {
    // Exists.
    setSliderNavPosition();
  }
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
  if (typeof sliderNav != "undefined" && sliderNav != null) {
    // Exists.
    setSliderNavPosition();
  }
});

window.onload = function () {
  // alert("Page is loaded!!!!!");
};

$(document).ready(function () {

  $('.scroll-down[href^="#"]').on("click", function () {
    $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top,
      },
      1200
    );
  });

  initPartnersSlider();

  $(window).scroll(function () {
    const scrollValue = $(this).scrollTop();
    showOnScroll(scrollValue);
    // scrollValue >= 1 ? closeMenu() : null;
    if (humburger.classList.contains("open") && scrollValue >= 1) {
      closeMenu();
    }
  });
});

// jquery functions
function showOnScroll(scrollValue) {
  $(".js-scroll").each(function () {
    let elem = $(this);
    let sectionPos = elem.offset().top;
    let windowPos = $(window).scrollTop() + $(window).height() / 1.2;
    if (sectionPos < windowPos) {
      elem.removeClass("js-fadeIn js-slideLeft js-slideRight js-slideTop");
    }
  });
}

function initPartnersSlider() {
  let slider = $(".investments-list");
  $(window).on("load resize", function () {
    if ($(window).width() > 992 && $(".investments-list").length > 0) {
      if (slider.hasClass("slick-initialized")) {
        slider.slick("unslick");
      }
      return;
    }
    if (!slider.hasClass("slick-initialized")) {
      return slider.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        dots: false,
        arrows: false,
        infinite: true,
        responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 420,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });
    }
  });
}
svg4everybody();