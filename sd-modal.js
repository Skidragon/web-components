class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
              .backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0,0,0,0.75);
                z-index: 10;
                opacity: 0;
                pointer-events: none;
              }
              :host([opened]) .backdrop,
              :host([opened]) .modal {
                opacity: 1;
                pointer-events: all;
              }
              .modal {
                position: fixed;
                top: 10vh;
                left: 50%;
                transform: translateX(-50%);
                max-width: 500px;
                width: 100%;
                z-index: 100;
                background: white;
                border-radius: 3px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0;
                pointer-events: none;
              }
              header {
                padding: 1rem;
                border-bottom: 1px solid #ccc;
              }
              .main {
                padding: 1rem;
              }
              .footer {
                padding: 1rem;
                border-top: 1px solid #ccc;
              }
            </style>
            <div class = "backdrop"></div>
            <div class = "modal">
                <header>
                    <slot name="icon"></slot>
                    <slot name="title">Modal title!</slot>
                </header>
                <section class="main">
                    <slot name="main-content">The information goes here!</slot>
                </section>
                <section class = "footer">
                  <slot name="action-buttons></slot>
                </section>
            </div>
        `;
    const backdrop = this.shadowRoot.querySelector(".backdrop");
    const cancelBtn = this.shadowRoot.querySelector(".cancel-btn");
    const confirmBtn = this.shadowRoot.querySelector(".confirm-btn");
    backdrop.addEventListener("click", this._cancel.bind(this));
    cancelBtn.addEventListener("click", this._cancel.bind(this));
    confirmBtn.addEventListener("click", this._confirm.bind(this));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute("opened")) {
      this.isOpen = true;
      // this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
      // this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
      // this.shadowRoot.querySelector('#modal').style.opacity = 1;
      // this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
    } else {
      this.isOpen = false;
    }
  }
  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    this.setAttribute("opened", "");
    this.isOpen = true;
  }
  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false;
  }
  _cancel(event) {
    this.hide();
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }
  _confirm() {
    this.hide();
    const confirmEvent = new Event("confirm");
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define("sd-modal", Modal);
