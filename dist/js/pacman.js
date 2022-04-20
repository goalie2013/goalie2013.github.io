"use strict";

const container = document.querySelector(".pacman");
const pacmanImg = document.querySelector(".abc");
const pacArr = ["pacman1.png", "pacman2.png", "pacman2.png", "pacman1.png"];
let directionPac = 0;
let directionGhost = 0;
let currPic = 0;
let pos = -20;
let posGhost = -300;

const ghostObj = {};

function runPacmanAnim() {
  const arrSize = pacArr.length;
  currPic = (currPic + 1) % arrSize;
  //directionPac = checkPageBounds(directionPac);
  pacmanImg.src = `../img/${pacArr[currPic]}`;
  pacmanImg.alt = "Pacman";

  if (directionPac) {
    pos -= 20;
    pacmanImg.style.left = pos + "px";
  } else {
    pos += 20;
    pacmanImg.style.left = pos + "px";
  }

  setTimeout(runPacmanAnim, 100);
}

function runGhostAnim(ghostImg) {
  // Need to store in Object bc parameters get erased after the first time setTimeout is called
  // if (ghostObj.img) {
  //   console.log("EXISTSSSS", ghostObj.img);
  // } else {
  //   console.log("DOES NOT EXIST");
  //   ghostObj.img = ghostImg;
  // }

  if (ghostObj.imgArr) {
    // console.log("EXISTSSSS", ghostObj);
    if (ghostObj.imgArr.length === 2) {
      // console.log("2 GHOSTS IN ARRAY");
    } else {
      ghostObj.imgArr.push(ghostImg);
    }
  } else {
    console.log("DOES NOT EXIST");
    ghostObj.imgArr = [ghostImg];
  }

  for (let obj of ghostObj.imgArr) {
    obj.alt = "Pacman Ghost";
  }
  // ghostObj.img.alt = "Pacman Ghost";

  directionGhost = _checkPageBounds(directionGhost, posGhost);

  // Move Ghost Right or Left
  // if (directionGhost) {
  //   posGhost -= 20;
  //   ghostObj.img.style.left = posGhost + "px";
  // } else {
  //   posGhost += 20;
  //   ghostObj.img.style.left = posGhost + "px";
  // }

  if (directionGhost) {
    posGhost -= 10;
    let velocity = -10;

    for (let obj of ghostObj.imgArr) {
      // console.log("parse", parseInt(obj.style.left));
      let x = parseInt(obj.style.left);
      obj.style.left = x + velocity + "px";
    }
  } else {
    posGhost += 10;
    let velocity = 10;

    for (let obj of ghostObj.imgArr) {
      // console.log("parse", parseInt(obj.style.left));

      let x = parseInt(obj.style.left);
      obj.style.left = x + velocity + "px";
    }
  }

  setTimeout(runGhostAnim, 100);
}

function _checkPageBounds(direction, pos) {
  const containerEdge = container.getBoundingClientRect().right;

  // If ghost at edge -> change direction & horizontally flip image
  if (direction === 0 && pos > containerEdge) {
    direction = 1;
    // ghostObj.img.src = "../dist/img/ghost_blue_2.png";

    // ghostObj.img.style = "transform: scaleX(-1)";
    // ghostObj.img.style.top = "40%";

    for (let obj of ghostObj.imgArr) {
      obj.style.transform = "scaleX(-1)";
      obj.style.top = "40%";
    }
  }
  if (direction === 1 && pos <= -200) {
    direction = 0;
    // ghostObj.img.style = "transform: scaleX(1)";

    for (let obj of ghostObj.imgArr) {
      obj.style.transform = "scaleX(1)";
    }
  }

  return direction;
}

export { runPacmanAnim, runGhostAnim };
