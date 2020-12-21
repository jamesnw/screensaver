import "./styles.css";

const textButton = document.getElementById("text");
const textSS = document.getElementById("text-screen-saver");
console.log("loaded", textButton);

textButton.addEventListener("click", (e) => {
  textSS.setAttribute("show", true);
});
// Handler when the DOM is fully loaded
