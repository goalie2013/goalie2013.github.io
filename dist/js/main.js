"use strict";

const menuBtn = document.querySelector(".menu-btn");
const menuBtnLine = document.getElementsByClassName("btn-line");
const menu = document.querySelector(".menu");
const homeHeader = document.getElementById("home-header");
const mainNav = document.querySelectorAll(".nav-lnk");

// Initial State of Menu
let showMenu;

function _init() {
  showMenu = false;

  _addEventHandlers();
  _checkPositionNavToChangeColor();
}

function _addEventHandlers() {
  // If window gets resized -> rerun init()
  window.addEventListener("resize", _init);
  window.addEventListener("scroll", _checkPositionNavToChangeColor);

  menuBtn.addEventListener("click", _toggleMenu);
}

function _checkPositionNavToChangeColor() {
  let navPosY = window.scrollY;
  console.log(window.innerWidth);

  if (window.innerWidth <= 650) {
    homeHeader.style.background = "none";
    return false;
  }

  if (navPosY > 50) {
    homeHeader.style.background = "rgb(48, 47, 47)";
    for (let link of mainNav) {
      // link.style.color = "rgb(48, 47, 47)";
    }
  } else {
    homeHeader.style.background = "none";
    for (let link of mainNav) {
      // link.style.color = "white";
    }
  }
}

// Toggle Side-Menu & Menu Button (burger to X)
function _toggleMenu() {
  console.log("_toggleMenu");
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
      btnLine.style.background = "#fff";
    }
    menu.classList.remove("show");
    showMenu = false;
  }
}

window.onload = () => {
  _init();
};
