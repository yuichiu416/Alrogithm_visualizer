class Array{
    constructor(size){
        this.array = this.initializeArrayWithSize(size);
    }
    initializeArrayWithSize(size){
        let arr = [];
        for (let i = 1; i <= size; i++) {
            arr.push(i);
        }
        return arr;
    }

    createArrayLi(arrayHTMLElement) {
        let array = this.array;
        const unitWidth = 600 / array.length;
        array.forEach(num => {
            var number = document.createElement("div");
            number.innerHTML = num;
            number.classList.add("number");
            number.setAttribute("value", num);
            number.style.height = num * unitWidth + "px";
            arrayHTMLElement.appendChild(number);
        })
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const arrayHTMLElement = document.getElementById("array");
    new Array(10).createArrayLi(arrayHTMLElement);
})