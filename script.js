// 1. create 16 x 16 gird with flexbox
//const GRIDSIDE = 600; px size now👇🏾
const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");


// 2. add styling to the sketch area
const sketchArea = document.querySelector("#sketch-area");

const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

//sliderValue.textContent = `${slider.value} / ${slider.value} {Resolution}`;
//sketchArea.style.width = `${GRIDSIDE}px`;
//sketchArea.style.height = `${GRIDSIDE}px`; combined as=
//sketchArea.style.width = sketchArea.style.height = `${GRIDSIDE}px`;

// 4. Function to change background color 

const gridToggle = document.querySelector("#grid-toggle");
//let rows = 16; let cols = 16; combined as=
let squarePerSide = 16;
gridVisible = false;

let isDrawing = false;

function toggleGrid() {
  gridVisible = gridVisible ? false : true;
  gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

  removeGridSquares();
  createGridSquares();
}

function setBackgroungColor(e) {
  if (e.type === "mousedown") {
    isDrawing = true;
    e.target.style.backgroundColor = "black";
    } else if (e.type === "mouseover" && isDrawing){
      e.target.style.backgroundColor = "black";
    } else isDrawing = false;
}

// 3.  function to make grid cells 
function createGridSquares() {
  const numOfSquares = (squarePerSide * squarePerSide);

 // const widthOrHeigth = `${(GRIDSIDE / squarePerSide) -2}px`;//-2 for additional padding space
  for (let i = 0; i < numOfSquares; i++) {
    const gridCell = document.createElement("div");
    let widthOrHeigth = 0;

    //gridCell.style.width =  `${(GRIDSIDE / cols) -2}px`;
    //gridCell.style.height =  `${(GRIDSIDE / rows) -2}px`; combined to const widthOrHeigth = `${(GRIDSIDE / cols) -2}px`;

    if (gridVisible) {
      widthOrHeigth = `${(parseInt(gridWidth) / squarePerSide) -2}px`;
      gridCell.style.border = "1px solid whitesmoke";
    }else if (!gridVisible) {
      widthOrHeigth = `${(parseInt(gridWidth) / squarePerSide)}px`;
      gridCell.style.border = "none";
    }

    gridCell.style.height = gridCell.style.width = widthOrHeigth;
    gridCell.classList.add("cell");

    gridCell.addEventListener("mousedown", (e) => setBackgroungColor(e));
    gridCell.addEventListener("mouseover", (e) => setBackgroungColor(e));
    gridCell.addEventListener("mouseup", (e) => setBackgroungColor(e));

    gridCell.addEventListener("dragstart", (e) => {e.preventDefault()});
    sketchArea.appendChild(gridCell);
  }
}

function removeGridSquares() {
  while (sketchArea.firstChild) {
    sketchArea.removeChild(sketchArea.firstChild);
  }
}

slider.oninput = function () {
  squarePerSide = this.value;
  sliderValue.textContent = `${this.value} x ${this.value} (Resolution)`;

  removeGridSquares();
  createGridSquares();
}

gridToggle.addEventListener("click", toggleGrid);

createGridSquares();