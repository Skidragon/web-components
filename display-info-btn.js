class DisplayInfoBtn extends HTMLElement {
  constructor() {
    super();
    this._info;
    this._btnText = "Show Info";
    this._isHidden = true;
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
    this._info = this.shadowRoot.querySelector("slot");
    this._info.style.display = "none";

    btn.textContent = this._btnText;
    btn.addEventListener("click", () => {
      if (this._isHidden) {
        this._showInfo();
        this._isHidden = false;
        btn.textContent = "Hide Info";
      } else {
        this._hideInfo();
        this._isHidden = true;
        btn.textContent = "Show Info";
      }
    });
  }
  _showInfo() {
    this._info.style.display = "block";
  }
  _hideInfo() {
    this._info.style.display = "none";
  }
}

customElements.define("display-info-btn", DisplayInfoBtn);
