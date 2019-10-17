class Array{
    constructor(size, values){
        if(values){
            this.array = values;
            this.createArrayLi();
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
        window.arrays.push(array);
        window.currentArrayIndex++;
        window.resetAllSorting();
        window.toggleArrayButtons();
        window.handleHistroy();
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
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.Array = Array;
    window.arrays = [];
    window.currentArrayIndex = 0;
    window.randomize = this.randomize;
    let arr = new Array(10);
    arr.randomize();
    window.currentArrayIndex = 0;
    console.log(window.currentArrayIndex)
})