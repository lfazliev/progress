export default class Progress extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getBasePath() {
    try {
      const scriptURL = new URL(import.meta.url);
      const pathParts = scriptURL.pathname.split("/");
      pathParts.pop();
      return pathParts.join("/");
    } catch (e) {
      const pathMatch = window.location.pathname.match(/^(\/[^\/]+)/);
      return pathMatch ? pathMatch[0] : "";
    }
  }

  setProgress(value) {
    if (this.roundElement) {
      this.roundElement.style.setProperty("--percent-fill", `${value}%`);
    }
  }

  setVisibility(isHidden) {
    if (this.roundElement) {
      this.roundElement.classList.toggle("hidden", isHidden);
    }
  }

  setAnimated(isAnimated) {
    if (this.roundElement) {
      this.roundElement.classList.toggle("animated", isAnimated);
    }
  }

  connectedCallback() {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");

    const basePath = this.getBasePath();
    link.setAttribute("href", `${basePath}/style.css`);
    this.shadowRoot.appendChild(link);

    fetch(`${basePath}/progress.html`)
      .then((response) => response.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.initComponent();
      })
      .catch((error) => {
        console.error("Ошибка загрузки шаблона компонента:", error);
      });
  }

  initComponent() {
    this.valueInput = this.shadowRoot.querySelector("[data-value]");
    this.animatedCheckbox = this.shadowRoot.querySelector("[data-animated]");
    this.hiddenCheckbox = this.shadowRoot.querySelector("[data-hidden]");
    this.roundElement = this.shadowRoot.querySelector(".round");

    if (this.valueInput && this.roundElement) {
      this.setProgress(this.valueInput.value);
    }

    if (this.animatedCheckbox && this.roundElement) {
      this.setAnimated(this.animatedCheckbox.checked);
    }

    if (this.hiddenCheckbox && this.roundElement) {
      this.setVisibility(this.hiddenCheckbox.checked);
    }

    if (this.valueInput) {
      this.valueInput.addEventListener("input", (e) =>
        this.setProgress(e.target.value)
      );
    }

    if (this.animatedCheckbox) {
      this.animatedCheckbox.addEventListener("input", (e) =>
        this.setAnimated(e.target.checked)
      );
    }

    if (this.hiddenCheckbox) {
      this.hiddenCheckbox.addEventListener("input", (e) =>
        this.setVisibility(e.target.checked)
      );
    }
  }
}

customElements.define("progress-block", Progress);
