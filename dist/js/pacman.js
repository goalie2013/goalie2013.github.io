"use strict";

const container = document.querySelector(".pacman");
const pacArr = ["pacman1.png", "pacman2.png", "pacman2.png", "pacman1.png"];
let directionPac = 0;
let currPic = 0;
let pos = -20;
let interval;

let pacmanObj = {};
const ghostObj = {};

function makePacman(pacmanImg) {
  let currPic = 0;
  let direction = 0;
  let positionX = 40;

  return {
    img: pacmanImg,
    direction,
    positionX,
    currPic,
  };
}

function runPacmanAnim(pmanObj) {
  console.log("pmanObj", pmanObj);
  if (pmanObj) {
    pacmanObj = pmanObj;
  } else {
  }
  console.log("pacmanObj", pacmanObj);
  const arrSize = pacArr.length;
  pacmanObj.currPic = (pacmanObj.currPic + 1) % arrSize;
  //directionPac = checkPageBounds(directionPac);
  pacmanObj.img.src = `../img/${pacArr[pacmanObj.currPic]}`;
  pacmanObj.img.alt = "Pacman";

  pacmanObj.direction = _checkBoundaries(pacmanObj);

  if (pacmanObj.direction) {
    pacmanObj.positionX -= 20;

    pacmanObj.img.style.left = pacmanObj.positionX + "px";
    pacmanObj.img.style.top = "40%";
  } else {
    pacmanObj.positionX += 20;
    pacmanObj.img.style.left = pacmanObj.positionX + "px";
    pacmanObj.img.style.top = "70%";
  }

  setTimeout(runPacmanAnim, 100);
}

function _checkBoundaries(el) {
  const containerEdge = container.getBoundingClientRect().right;

  // If ghost at edge -> change direction & horizontally flip image
  if (el.direction === 0 && el.positionX > containerEdge) {
    el.direction = 1;

    el.img.style.transform = "scaleX(-1)";
    el.img.style.top = "40%";
  }
  if (el.direction === 1 && el.positionX <= -200) {
    el.direction = 0;

    el.img.style.transform = "scaleX(1)";
    el.img.style.top = "70%";
  }

  return el.direction;
}

function ghostFactory(ghostImg) {
  let direction = 0;
  let positionX = parseInt(ghostImg.style.left);
  const velocity = { x: 20, y: 20 };

  return {
    img: ghostImg,
    positionX,
    direction,
    velocity,
  };
}

function runGhostAnim(ghostArr) {
  // Need to store in Object bc parameters get erased after the first time setTimeout is called

  if (ghostObj.ghosts) {
    console.log("GHOSTS");
  } else {
    console.log("NOT GHOSTS");
    ghostObj.ghosts = ghostArr;
  }

  // console.log(ghostObj.ghosts);
  ghostObj.ghosts.forEach((ghost) => {
    console.log("ghost", ghost);
    ghost.direction = _checkPageBounds(ghost);

    if (ghost.direction) {
      ghost.positionX -= ghost.velocity.x;

      ghost.img.style.left = ghost.positionX + "px";
    } else {
      ghost.positionX += ghost.velocity.x;

      ghost.img.style.left = ghost.positionX + "px";
    }
  });

  interval = setTimeout(runGhostAnim, 100);
}

function _checkPageBounds(ghost) {
  const containerEdge = container.getBoundingClientRect().right;

  // If ghost at edge -> change direction & horizontally flip image
  if (ghost.direction === 0 && ghost.positionX > containerEdge) {
    ghost.direction = 1;

    ghost.img.style.transform = "scaleX(-1)";
    ghost.img.style.top = "40%";
  }
  if (ghost.direction === 1 && ghost.positionX <= -200) {
    ghost.direction = 0;

    ghost.img.style.transform = "scaleX(1)";
    ghost.img.style.top = "70%";
  }

  return ghost.direction;
}

export { makePacman, ghostFactory, runPacmanAnim, runGhostAnim };
