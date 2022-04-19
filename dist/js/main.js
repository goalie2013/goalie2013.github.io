"use strict";

import { runPacmanAnim, runGhostAnim } from "./pacman.js";

const menuBtn = document.querySelector(".menu-btn");
const menuBtnLine = document.getElementsByClassName("btn-line");
const menu = document.querySelector(".menu");
const pacmanImg = document.querySelector(".abc");
const projectsTitle = document.getElementById("projects-title");

// Initial State of Menu
let showMenu = false;

// For Animation on Scroll
let hiddenEls;
let windowHeight;

// Fade-In Animation on Scroll
// Get all elements with class 'hidden'; put in Array 'hiddenEls'; on scroll, loop through Array and check if element/s are on screen (using .getBoundingClientRect());
// If on the screen -> replace 'hidden' class with 'fade-in' class
function _init() {
  hiddenEls = document.getElementsByClassName("hidden");
  windowHeight = window.innerHeight;
  _checkPosHiddenEls();
  _checkPositionMenuBtn();
  _addEventHandlers();
}

function _addEventHandlers() {
  window.addEventListener("scroll", _checkPosHiddenEls);
  window.addEventListener("scroll", _checkPositionMenuBtn);
  window.addEventListener("scroll", _checkPosPacman);

  // If window gets resized -> rerun init()
  window.addEventListener("resize", _init);

  menuBtn.addEventListener("click", _toggleMenu);
}

function _checkPosHiddenEls() {
  for (let elem of hiddenEls) {
    let posY = elem.getBoundingClientRect().top;
    if (posY - windowHeight <= 0)
      // Then element is on screen!
      elem.className = elem.className.replace("hidden", "fade-in");
    console.log(elem.className);
  }
}

function _checkPositionMenuBtn() {
  let menuBtnPosY = menuBtn.getBoundingClientRect().top;
  let projectsTitlePosTop = projectsTitle.getBoundingClientRect().top;
  let projectsTitlePosBottom = projectsTitle.getBoundingClientRect().bottom;

  if (menuBtn.classList.contains("close")) {
    return false;
  }

  if (
    menuBtnPosY >= projectsTitlePosTop &&
    menuBtnPosY <= projectsTitlePosBottom
  ) {
    for (let btnLine of menuBtnLine) {
      btnLine.style.background = "rgb(48, 47, 47)";
    }
  } else {
    for (let btnLine of menuBtnLine) {
      btnLine.style.background = "#fff";
    }
  }
}

function _checkPosPacman() {
  const blueGhost = document.querySelector(".blue-ghost");
  const greenGhost = document.querySelector(".green-ghost");
  blueGhost.style.left = "-80px";
  greenGhost.style.left = "-160px";

  let posY = pacmanImg.getBoundingClientRect().top;
  if (!pacmanImg.classList.contains("anim-pacman"))
    if (posY - windowHeight <= 0) {
      pacmanImg.classList.add("anim-pacman");
      runPacmanAnim();
      console.log("blueGhost", blueGhost.style);
      runGhostAnim(blueGhost);
      runGhostAnim(greenGhost);
    }
}

//////////////////
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
    // for (let btnLine of menuBtnLine) {
    //   btnLine.style.background = "#fff";
    // }
    _checkPositionMenuBtn();
    menu.classList.remove("show");
    showMenu = false;
  }
}

window.onload = () => {
  _init();
};
