export default class Progress extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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

  connectedCallback() {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "/progress/style.css");
    this.shadowRoot.appendChild(link);

    fetch("/progress/index.html")
      .then((response) => response.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.initComponent();
      });
  }

  initComponent() {
    this.valueInput = this.shadowRoot.querySelector("[data-value]");
    this.animatedCheckbox = this.shadowRoot.querySelector("[data-animated]");
    this.hiddenCheckbox = this.shadowRoot.querySelector("[data-hidden]");
    this.roundElement = this.shadowRoot.querySelector(".round");

    this.setProgress(this.valueInput.value);
    this.setAnimated(this.animatedCheckbox.checked);
    this.setVisibility(this.hiddenCheckbox.checked);

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
}

customElements.define("progress-block", Progress);
