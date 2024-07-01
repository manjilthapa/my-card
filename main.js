"use strict";
class MyCard extends HTMLElement {
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
  }
}
customElements.define("my-card", MyCard);
