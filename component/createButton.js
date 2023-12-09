"use strict";

function createButton(className, textContent, onClick) {
  const button = document.createElement("button");
  button.classList.add("btn", className);
  button.textContent = textContent;
  return button;
}

export default createButton;
