class Number{
    constructor(value, unitWidth){
        let number = document.createElement("div");
        let text = document.createElement("span");
        text.innerHTML = value;
        text.classList.add("number-text")
        number.appendChild(text);
        number.classList.add("number");
        number.setAttribute("value", value);
        number.style.height = value * unitWidth + "px";

        return number;
    }
}
window.Number = Number;