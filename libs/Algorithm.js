class Algorithm {
    constructor(interval) {
        window.interval = interval;
        window.Algorithm = this;
        window.randomize = this.randomize;
        window.makeArrayFromDivs = this.makeArrayFromDivs;
        this.bubbleSort = this.bubbleSort.bind(this);
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
            divs[currentIndex].parentNode.insertBefore(divs[currentIndex], divs[randomIndex]);
            divs[randomIndex].parentNode.insertBefore(divs[randomIndex], temp);
        }
    }
    makeArrayFromDivs(){
        let divs = document.getElementsByClassName("number");
        let array = [];
        for(let i = 0; i < divs.length; i++){
            array.push(parseInt(divs[i].innerHTML));
        }
        return array;
    }
    async bubbleSort() {
        let array = window.makeArrayFromDivs();
        let len = array.length;
        let divs = document.getElementsByClassName("number");
        console.log(window.interval);
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                if (array[j + 1] < array[j]) {
                    await new Promise(resolve => setTimeout(resolve, window.interval));
                    let temp = divs[j + 1];
                    divs[j + 1].parentNode.insertBefore(divs[j + 1], divs[j]);
                    divs[j].parentNode.insertBefore(divs[j], temp);

                    temp = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = temp;
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const interval = document.getElementById("slider").nodeValue;
    window.Algorithm = new Algorithm(interval);
    window.bubbleSort = Algorithm.prototype.bubbleSort;
})