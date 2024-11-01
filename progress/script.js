export default class Progress {
  constructor(rootElement) {
    this.root = rootElement;
    this.valueInput = this.root.querySelector("[data-value]");
    this.animatedCheckbox = this.root.querySelector("[data-animated]");
    this.hiddenCheckbox = this.root.querySelector("[data-hidden]");
    this.roundElement = this.root.querySelector(".round");

    // Установка начальных значений
    this.setProgress(this.valueInput.value);
    this.setAnimated(this.animatedCheckbox.checked);
    this.setVisibility(this.hiddenCheckbox.checked);

    // Привязка обработчиков событий
    this.valueInput.addEventListener("input", (e) =>
      this.setProgress(e.target.value),
    );
    this.animatedCheckbox.addEventListener("input", (e) =>
      this.setAnimated(e.target.checked),
    );
    this.hiddenCheckbox.addEventListener("input", (e) =>
      this.setVisibility(e.target.checked),
    );
  }

  setProgress(value) {
    this.roundElement.style.setProperty("--percent-fill", `${value}%`);
  }

  setVisibility(isHidden) {
    this.roundElement.classList.toggle("hidden", isHidden);
  }

  setAnimated(isAnimated) {
    this.roundElement.classList.toggle("animated", isAnimated);
  }
}
