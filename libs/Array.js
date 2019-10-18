class Array{
    constructor(size, values){
        if(values){
            this.array = values;
            this.createArrayLi();
            this.initializeArrayWithvalues(values);
        }
        else{
            this.array = this.initializeArrayWithSize(size);
            this.createArrayLi();
        }
        this.initializeArrayWithSize = this.initializeArrayWithSize.bind(this);
    }
    initializeArrayWithSize(size){
        let array = [];
        for (let i = 1; i <= size; i++) {
            array.push(i);
        }
        return array;
    }
    initializeArrayWithvalues(values){
        window.arrays.push(values);
        window.currentArrayIndex++;
        window.resetAllSorting();
        window.toggleArrayButtons();
        window.handleHistroy();
    }
    randomize() {
        let divs = document.getElementsByClassName("number");
        if (divs.length === 0)
            return;
        let randomIndex, currentIndex = divs.length;
        while (currentIndex > 0) {
            currentIndex--;
            randomIndex = Math.floor(Math.random() * divs.length);
            let temp = divs[currentIndex];
            divs[currentIndex].classList.remove("sorting");
            divs[currentIndex].parentNode.insertBefore(divs[currentIndex], divs[randomIndex]);
            divs[randomIndex].parentNode.insertBefore(divs[randomIndex], temp);
        }
        let array = window.makeArrayFromDivs();
        this.initializeArrayWithvalues(array);
    }

    createArrayLi() {
        let array = this.array;
        const arrayHTMLElement = document.getElementById("array");
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
        document.getElementById("size-label").innerHTML = size;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.Array = Array;
    window.arrays = [];
    window.currentArrayIndex = 0;
    window.randomize = this.randomize;
    let arr = new Array(10, [7, 2, 9, 1, 4, 3, 6, 5, 8, 10]);
    window.currentArrayIndex = 0;
});