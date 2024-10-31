const inputValue = document.getElementById("value");
const animated = document.getElementById("animated");
const hidden = document.getElementById("hidden");

const setProgress = (e) => {
  const value = e.target.value;
  document
    .querySelector(".round")
    .style.setProperty("--percent-fill", `${value}%`);
};
const setVisibility = (e) => {
  console.log(1);

  if (e.target.checked)
    document.querySelector(".round").classList.add("hidden");
  else document.querySelector(".round").classList.remove("hidden");
};
const setAnimated = (e) => {
  if (e.target.checked)
    document.querySelector(".round").classList.add("animated");
  else document.querySelector(".round").classList.remove("animated");
};

inputValue.addEventListener("input", setProgress);
hidden.addEventListener("input", setVisibility);
animated.addEventListener("input", setAnimated);
