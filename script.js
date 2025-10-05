const slider = document.getElementById("slider");
const colorInput = document.getElementById("colorPicker");
const gridSize = 600;
let eraseMode = false;
let draw = false;
let squareSize = undefined;
const areaDrawing = document.querySelector(".areaDrawing");
const reset = document.querySelector("#reset");
const textResolution = document.querySelector("span");
const randomColor = document.querySelector("#randomColor");
const erase = document.querySelector("#erase");

areaDrawing.style.width = `${gridSize}px`;
areaDrawing.style.height = `${gridSize}px`;
areaDrawing.style.border = "1px solid teal";
areaDrawing.style.display = "flex";
areaDrawing.style.flexWrap = "wrap";
areaDrawing.style.cursor = "crosshair";
areaDrawing.addEventListener("mousedown", () => {
  draw = true;
});
areaDrawing.addEventListener("mouseup", () => {
  draw = false;
});

let newColor = colorInput.value;

colorInput.addEventListener("input", () => {
  const colorValue = colorInput.value;
  const r = parseInt(colorValue.slice(1, 3), 16);
  const g = parseInt(colorValue.slice(3, 5), 16);
  const b = parseInt(colorValue.slice(5, 7), 16);

  const light = (v) => Math.min(255, v + 40);

  newColor = `rgb(${light(r)}, ${light(g)}, ${light(b)})`;
});

function createCells(squareSize) {
  areaDrawing.innerHTML = "";

  for (let i = 0; i < squareSize * squareSize; i++) {
    const cell = document.createElement("div");

    cell.style.width = cell.style.height = `${
      Math.floor(gridSize / squareSize) - 1
    }px`;
    cell.classList.add("cell");

    cell.addEventListener("mouseover", () => {
      if (draw) {
        if (eraseMode) {
          cell.style.backgroundColor = "";
        } else {
          cell.style.backgroundColor = newColor;
        }
      }
    });

    cell.addEventListener("mousedown", () => {
      if (eraseMode) {
        cell.style.backgroundColor = "";
      } else {
        cell.style.backgroundColor = newColor;
      }
    });

    areaDrawing.appendChild(cell);
  }
}

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

slider.addEventListener("input", () => {
  const val = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.setProperty("--valore", `${val}%`);
  squareSize = parseInt(slider.value);
  textResolution.textContent = "";
  textResolution.textContent = `${slider.value} x ${slider.value}`;
  createCells(squareSize);
});

reset.addEventListener("click", () => {
  areaDrawing.innerHTML = "";
  createCells(squareSize);
});

randomColor.addEventListener("click", () => {
  newColor = generateRandomColor();
});

erase.addEventListener("click", () => {
  eraseMode = !eraseMode;
  areaDrawing.style.cursor = eraseMode
    ? "url('eraser.png'), auto"
    : "crosshair";
});

// when page is loaded

slider.value = 16;

const val = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
slider.style.setProperty("--valore", `${val}%`);
squareSize = parseInt(slider.value);
textResolution.textContent = `${squareSize} x ${squareSize}`;
createCells(squareSize);
