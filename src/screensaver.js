const template = document.createElement("template");
template.innerHTML = `
<style>
text#value {
  fill: rgb(35,190,24);
  font-size: 4em;
}
#wrapper{
  display: none;
}
#wrapper.show{
  display: block;
}
.backdrop{ 
  display: none;
  width: 100%;
  position: absolute;
  height: 3000pt;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(30, 30, 30);
}
.backdrop.show{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  z-index: 1000;
}
.full{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
<div class="full" id="wrapper">
<svg class="full" id="root" viewBox="0 0 1000 1000">
<rect width="100%" class="backdrop"></rect>
<text id="value" x="10%" y="10%"></text>
</svg>
</div>
`;
function create() {
  customElements.define(
    "screen-saver",
    class extends HTMLElement {
      constructor() {
        super();
        this.text = this.getAttribute("text") || "default";

        const templateContent = template.content;

        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.appendChild(templateContent.cloneNode(true));
        this.$valueDisplay = this.shadow.querySelector("text");
        this.$valueDisplay.innerHTML = this.text;

        this.$wrapper = this.shadow.querySelector("#wrapper");

        this.$backdrop = this.shadow.querySelector("rect.backdrop");

        this.$backdrop.addEventListener("click", (e) => {
          this.$backdrop.classList = "backdrop";
          this.$wrapper.classList = "";
        });
      }
      showThis() {
        this.$show = Boolean(this.getAttribute("show")) || false;
        if (this.$show) {
          this.$backdrop.classList = "backdrop show";
          this.$wrapper.classList = "show";
        } else {
          this.$backdrop.classList = "backdrop";
          this.$wrapper.classList = "";
        }
      }
      static get observedAttributes() {
        return ["show"];
      }
      attributeChangedCallback(name, oldValue, newValue) {
        this.showThis();
      }
      connectedCallback() {
        // this.renderValue();
        // const button = this.shadow.querySelector("my-button");
        // button.addEventListener("clicked", (e) => {
        //   this.value++;
        //   this.renderValue();
        // });
      }
    }
  );
}

if (customElements.get("screen-saver")) window.location.reload();
create();
