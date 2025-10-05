const slider = document.getElementById("slider");

slider.addEventListener("input", () => {
  const val = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.setProperty("--valore", `${val}%`);
});
