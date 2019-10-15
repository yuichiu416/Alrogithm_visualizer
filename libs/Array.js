class Array{
    constructor(size, values){
    window.Array = this;
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
        const unidHeight = 600 / array.length;
        while(arrayHTMLElement.firstChild){
            arrayHTMLElement.removeChild(arrayHTMLElement.firstChild);
        }
        array.forEach(value => {
            let number = new Number(value, unidHeight, array.length);
            arrayHTMLElement.appendChild(number);
        });
    }
    changeSize(){
        const size = document.getElementById("size").value;
        if(isNaN(parseInt(size)))
            return;
        const arrayHTMLElement = document.getElementById("array");
        new Array(size).createArrayLi(arrayHTMLElement);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const arrayHTMLElement = document.getElementById("array");
    new Array(10).createArrayLi(arrayHTMLElement);
})