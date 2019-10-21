class Histogram{
    constructor(size, values){
        if(values){
            this.array = values;
            this.createArrayLi();
            window.resetSettings();
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
    createNewArrayWithValues(values){
        window.arrays.push(values);
        window.currentArrayIndex++;
        window.resetSettings();
    }
    randomize() {
        let divs = document.getElementsByClassName("number");
        if (divs.length === 0)
            return;
        for(let i = 0; i < 3; i++){
            let randomIndex, currentIndex = divs.length;
            while(currentIndex > 0) {
                currentIndex--;
                randomIndex = Math.floor(Math.random() * divs.length);
                let temp = divs[currentIndex];
                divs[currentIndex].classList.remove("sorting");
                divs[currentIndex].parentNode.insertBefore(divs[currentIndex], divs[randomIndex]);
                divs[randomIndex].parentNode.insertBefore(divs[randomIndex], temp);
            }
        }
        let array = window.makeArrayFromDivs();
        this.createNewArrayWithValues(array);
    }

    createArrayLi() {
        let array = this.array;
        const arrayHTMLElement = document.getElementById("array");
        const navHeight = document.getElementById("nav").offsetHeight;
        const panelHeight = document.getElementById("panel").offsetHeight;

        const unitHeight = 500 / array.length;
        while(arrayHTMLElement.firstChild){
            arrayHTMLElement.removeChild(arrayHTMLElement.firstChild);
        }
        array.forEach(value => {
            let number = new Number(value, unitHeight, array.length);
            arrayHTMLElement.appendChild(number);
        });
    }
    changeSize(){
        const size = document.getElementById("size").value;
        if(isNaN(parseInt(size)))
            return;
        const arrayHTMLElement = document.getElementById("array");
        new Histogram(size).createArrayLi(arrayHTMLElement);
        document.getElementById("size-label").innerHTML = size;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.Histogram = Histogram;
    window.arrays = [];
    window.randomize = Histogram.prototype.randomize;
    new Histogram(document.getElementById("size").value);
    window.currentArrayIndex = -1;
});