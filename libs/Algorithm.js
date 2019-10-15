class Algorithm {
    constructor(interval) {
        window.interval = interval;
        window.Algorithm = this;
        window.randomize = this.randomize;
        window.makeArrayFromDivs = this.makeArrayFromDivs;
        window.resetAll = this.resetAll;
        window.countSteps = this.countSteps;
        this.bubbleSort = this.bubbleSort.bind(this);
    }
    countSteps(){
        const count = document.getElementById("count");
        count.innerHTML = parseInt(count.innerHTML) + 1;
    }
    randomize() {
        let divs = document.getElementsByClassName("number");
        if (divs.length === 0)
            return;
        let randomIndex, currentIndex = divs.length;
        
        while(currentIndex > 0){
            currentIndex--;
            randomIndex = Math.floor(Math.random() * divs.length);
            let temp = divs[currentIndex];
            divs[currentIndex].classList.remove("sorting");
            divs[currentIndex].parentNode.insertBefore(divs[currentIndex], divs[randomIndex]);
            divs[randomIndex].parentNode.insertBefore(divs[randomIndex], temp);
        }
        window.resetAll();
    }
    resetAll() {
        let divs = document.getElementsByClassName("number");
        for (let i = 0; i < divs.length; i++) {
            divs[i].classList.remove("sorting");
        }
        document.getElementById("count").innerHTML = 0;
        window.stop = true;
    }
    makeArrayFromDivs(){
        let divs = document.getElementsByClassName("number-text");
        let array = [];
        for(let i = 0; i < divs.length; i++){
            array.push(parseInt(divs[i].innerHTML));
        }
        return array;
    }
    async bubbleSort() {
        window.stop = false;
        let array = window.makeArrayFromDivs();
        let len = array.length;
        let divs = document.getElementsByClassName("number");
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                window.countSteps();
                if (array[j + 1] < array[j]) {
                    divs[j].classList.toggle("sorting");
                    await new Promise(resolve => setTimeout(resolve, window.interval));
                    let temp = divs[j + 1];
                    divs[j + 1].parentNode.insertBefore(divs[j + 1], divs[j]);
                    divs[j].parentNode.insertBefore(divs[j], temp);

                    temp = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = temp;
                    divs[j + 1].classList.toggle("sorting");
                }
                if(window.stop) 
                    return window.resetAll()
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const interval = document.getElementById("slider").nodeValue;
    window.Algorithm = new Algorithm(interval);
    window.bubbleSort = Algorithm.prototype.bubbleSort;
})