class DisplayInfoBtn extends HTMLElement {
  constructor() {
    super();
    this._infoContainer;
    this._btnText = "Show Info";
    this.isHidden = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <button></button>
        <slot></slot>
    `;
  }
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._btnText = this.getAttribute("text");
    }
    const btn = this.shadowRoot.querySelector("button");
    this._infoContainer = this.shadowRoot.querySelector("slot");
    this._infoContainer.style.display = "none";

    btn.textContent = this._btnText;
    btn.addEventListener("click", () => {
      if (this.isHidden) {
        this._showInfo();
        this.isHidden = false;
        btn.textContent = "Hide Info";
      } else {
        this._hideInfo();
        this.isHidden = true;
        btn.textContent = "Show Info";
      }
    });
  }
  _showInfo() {
    this._infoContainer.style.display = "block";
  }
  _hideInfo() {
    this._infoContainer.style.display = "none";
  }
}

customElements.define("display-info-btn", DisplayInfoBtn);
