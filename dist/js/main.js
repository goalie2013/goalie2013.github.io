"use strict";

import { runPacmanAnim, runGhostAnim } from "./pacman.js";

const menuBtn = document.querySelector(".menu-btn");
const menuBtnLine = document.getElementsByClassName("btn-line");
const menu = document.querySelector(".menu");

// Initial State of Menu
let showMenu = false;

let windowHeight;

function _init() {
  windowHeight = window.innerHeight;
  _addEventHandlers();
}

function _addEventHandlers() {
  // If window gets resized -> rerun init()
  window.addEventListener("resize", _init);

  menuBtn.addEventListener("click", _toggleMenu);
}

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
      btnLine.style.background = "#fff";
    }
    menu.classList.remove("show");
    showMenu = false;
  }
}

window.onload = () => {
  _init();
};
