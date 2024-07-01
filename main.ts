abstract class NewElement extends HTMLElement {
  abstract toggleText(value: boolean): void;
}
class MyContainer extends HTMLElement {
  private showText: boolean;
  constructor() {
    super();

    this.showText = false;
  }

  connectedCallback() {
    this.addEventListener("toggle-text", this.onToggleText);
    this.onToggleText = this.onToggleText.bind(this);
  }

  onToggleText() {
    this.showText = !this.showText;

    this.querySelectorAll<NewElement>("my-card").forEach(
      (cardEl: NewElement) => {
        cardEl.toggleText(this.showText);
      }
    );
  }
}

class MyCard extends NewElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `<h1 style="color:${this.getAttribute(
      "headerColor"
    )};"> ${this.getAttribute("title")}</h1>
 <main>${this.getAttribute(
   "content"
 )}</main><span slot="my-text" class="my-text"> </slot></span><br/><slot class="btn" name="btn"></slot>`;

    const btn: HTMLButtonElement | null = shadow.querySelector("slot.btn");

    btn && btn.addEventListener("click", this.onClick);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.dispatchEvent(
      new CustomEvent("toggle-text", {
        bubbles: true,
        composed: true,
      })
    );
  }

  toggleText(value: boolean) {
    (this.shadowRoot?.querySelector("span") as HTMLSpanElement).innerHTML =
      value ? "Button Clicked!" : "";
  }
}

customElements.define("my-container", MyContainer);
customElements.define("my-card", MyCard);
