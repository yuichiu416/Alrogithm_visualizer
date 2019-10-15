class Number{
    constructor(value, unitWidth){
        let number = document.createElement("div");
        number.innerHTML = value;
        number.classList.add("number");
        number.setAttribute("value", value);
        number.style.height = value * unitWidth + "px";

        return number;
    }
}
window.Number = Number;