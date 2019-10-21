class Number{
    constructor(value, unitHeight, size){
        let number = document.createElement("div");
        let text = document.createElement("span");

        text.innerHTML = value;
        text.classList.add("number-text")
        window.width = 35;
        if(value * unitHeight < 35)
            text.classList.add("small");
        if(size > 40){
            text.classList.add("hidden");
            number.classList.add("tiny");
            window.width = 15;
        }
        if(size > 99){
            text.classList.add("hidden")
            number.classList.add("line");
            window.width = 2;
        }

        number.appendChild(text);
        number.classList.add("number");
        number.setAttribute("value", value);
        number.style.height = value * unitHeight + "px";
        return number;
    }
}
window.Number = Number;