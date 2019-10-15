class Array{
    constructor(size, values){
        if(values)
            this.array = values;
        else
            this.array = this.initializeArrayWithSize(size);
    }
    initializeArrayWithSize(size){
        let array = [];
        for (let i = 1; i <= size; i++) {
            array.push(i);
        }
        return array;
    }

    createArrayLi(arrayHTMLElement) {
        let array = this.array;
        const unitWidth = 600 / array.length;
        array.forEach(value => {
            let number = new Number(value, unitWidth);
            arrayHTMLElement.appendChild(number);
        })
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const arrayHTMLElement = document.getElementById("array");
    new Array(10).createArrayLi(arrayHTMLElement);
})