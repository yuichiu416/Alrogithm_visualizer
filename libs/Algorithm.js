class Algorithm {
    constructor(interval) {
        window.interval = interval;
        window.Algorithm = this;
        window.randomize = this.randomize;
        window.makeArrayFromDivs = this.makeArrayFromDivs;
        window.resetAll = this.resetAll;
        window.countSteps = this.countSteps;
        window.move = this.move;
        window.sleep = this.sleep;
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
    sleep(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    move() {
        let left = document.getElementsByClassName("move-to-right")[0];
        let right = document.getElementsByClassName("move-to-left")[0];
        let id = setInterval(() => frame(left, right), 10);
        function frame(left, right) {
            let leftDistance = parseInt(left.style.left) || 0;
            let rightDistance = parseInt(right.style.left) || 0;
            if (leftDistance >= 40) {
                clearInterval(id);
            } else {
                left.style.left = leftDistance + 1 + "px";
                right.style.left = rightDistance - 1 + "px";
            }
        }
        return new Promise(resolve => setTimeout(resolve, window.interval));
    }
    async bubbleSort() {
        window.stop = false;
        let array = window.makeArrayFromDivs();
        let len = array.length;
        let divs = document.getElementsByClassName("number");
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                let left = divs[j], right = divs[j + 1];
                if (array[j + 1] < array[j]) {
                    left.classList.toggle("sorting");
                    left.classList.toggle("move-to-right");
                    right.classList.toggle("move-to-left");
                    await window.move()
                    await window.sleep(window.interval);
                    let temp = right;
                    right.parentNode.insertBefore(divs[j + 1], left);
                    left.parentNode.insertBefore(divs[j], temp);

                    left.style.left = "";
                    right.style.left = "";

                    temp = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = temp;
                    left.classList.toggle("sorting");
                    left.classList.toggle("move-to-right");
                    right.classList.toggle("move-to-left");
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