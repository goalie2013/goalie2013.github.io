"use strict";

import {
  makePacman,
  ghostFactory,
  runPacmanAnim,
  runGhostAnim,
  resetPacmenAnim,
} from "./pacman.js";

const menuBtn = document.querySelector(".menu-btn");
const menuBtnLine = document.getElementsByClassName("btn-line");
const menu = document.querySelector(".menu");
const pacmanImg = document.querySelector(".abc");
const projectsNav = document.querySelector(".projects-jumbotron");
const nav = document.querySelector(".main-nav");

// Initial State of Menu
let showMenu;

// For Animation on Scroll
let hiddenEls;
let windowHeight;

// Fade-In Animation on Scroll
// Get all elements with class 'hidden'; put in Array 'hiddenEls'; on scroll, loop through Array and check if element/s are on screen (using .getBoundingClientRect());
// If on the screen -> replace 'hidden' class with 'fade-in' class
function _init() {
  showMenu = false;
  hiddenEls = document.getElementsByClassName("hidden");
  windowHeight = window.innerHeight;

  if (pacmanImg.classList.contains("anim-pacman")) {
    resetPacmenAnim();
    // pacmanImg.classList.remove("anim-pacman");
  }

  _checkPosHiddenEls();
  _checkPosPacman();
  // _checkPositionMenuBtn();
  // _checkPositionNav();
  _addEventHandlers();
}

function _addEventHandlers() {
  window.addEventListener("resize", _init);
  window.addEventListener("scroll", _checkPosHiddenEls);
  window.addEventListener("scroll", _checkPosPacman);

  // window.addEventListener("scroll", _checkPositionMenuBtn);
  // window.addEventListener("scroll", _checkPositionNav);

  // If window gets resized -> rerun init
  window.addEventListener("resize", _init);

  menuBtn.addEventListener("click", _toggleMenu);
}

// Reveal hidden elements when come into view
function _checkPosHiddenEls() {
  for (let elem of hiddenEls) {
    const posY = elem.getBoundingClientRect().top;
    if (posY - windowHeight <= 0)
      // Then element is on screen!
      elem.className = elem.className.replace("hidden", "fade-in");
    console.log(elem.className);
  }
}

function _checkPosPacman() {
  console.log("_checkPosPacman");
  const blueGhost = document.querySelector(".blue-ghost");
  const greenGhost = document.querySelector(".green-ghost");
  const posY = pacmanImg.getBoundingClientRect().top;

  // 'anim-pacman' class gets added first time invoked, so used to setup initial positions of ghosts
  if (!pacmanImg.classList.contains("anim-pacman")) {
    if (posY - windowHeight <= 0) {
      pacmanImg.classList.add("anim-pacman");

      // Set initial positions of elements
      pacmanImg.style.left = "40px";
      blueGhost.style.left = "-220px";
      greenGhost.style.left = "-400px";

      console.log("blueGhost", blueGhost);

      const pacmanObj = makePacman(pacmanImg);
      const blueGhostObj = ghostFactory(blueGhost);
      const greenGhostObj = ghostFactory(greenGhost);
      const ghostArr = [blueGhostObj, greenGhostObj];

      console.log("ghostArr", ghostArr);

      runPacmanAnim(pacmanObj);
      // runGhostAnim(blueGhostObj);
      // runGhostAnim(greenGhostObj);
      runGhostAnim(ghostArr);
    }
  }
}

///////////////////////////////////////////////////
// Toggle Side-Menu & Menu Button (burger to X)
function _toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    for (let btnLine of menuBtnLine) {
      btnLine.style.background = "red";
    }
    menu.classList.add("show");
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    for (let btnLine of menuBtnLine) {
      btnLine.style.background = "rgb(48, 47, 47)";
    }
    // _checkPositionMenuBtn();
    menu.classList.remove("show");
    showMenu = false;
  }
}

// Change color of menu button while scrolling, depending on background
// function _checkPositionMenuBtn() {
//   let menuBtnPosY = menuBtn.getBoundingClientRect().top;
//   console.log("projectsNav", projectsNav);
//   let projectsTitlePosBottom = projectsNav.getBoundingClientRect().bottom;

//   if (menuBtn.classList.contains("close")) {
//     return false;
//   }

//   if (menuBtnPosY <= projectsTitlePosBottom) {
//     for (let btnLine of menuBtnLine) {
//       btnLine.style.background = "rgb(48, 47, 47)";
//     }
//   } else {
//     for (let btnLine of menuBtnLine) {
//       btnLine.style.background = "#fff";
//     }
//   }
// }

// If scroll down to a certain point, hide nav menu and show menu btn
// function _checkPositionNav() {
//   let navPosY = projectsNav.getBoundingClientRect().top;
//   if (navPosY < -150) {
//     nav.style.visibility = "hidden";
//     menuBtn.style.visibility = "visible";
//   } else {
//     menuBtn.style.visibility = "hidden";
//     if (menuBtn.classList.contains("close")) {
//       _toggleMenu();
//     }
//     nav.style.visibility = "visible";
//   }
// }

window.onload = () => {
  _init();
};
