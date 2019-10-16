class Algorithm {
    constructor(interval) {
        window.randomize = this.randomize;
        window.makeArrayFromDivs = this.makeArrayFromDivs;
        window.resetAllSorting = this.resetAllSorting;
        window.move = this.move;
        window.sleep = this.sleep;
        window.countSteps = this.countSteps;
        window.countSwaps = this.countSwaps;
        this.bubbleSort = this.bubbleSort.bind(this);
    }

    countSteps(){
        const steps = document.getElementById("steps");
        steps.innerHTML = parseInt(steps.innerHTML) + 1;
    }
    countSwaps() {
        const swaps = document.getElementById("swaps");
        swaps.innerHTML = parseInt(swaps.innerHTML) + 1;
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
        window.resetAllSorting();
    }
    resetAllSorting() {
        let divs = document.getElementsByClassName("number");
        for (let i = 0; i < divs.length; i++) {
            divs[i].classList.remove("sorting");
        }
        document.getElementById("steps").innerHTML = 0;
        document.getElementById("swaps").innerHTML = 0;
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
    move(cells = 1) {
        let left = document.getElementsByClassName("move-to-right")[0];
        let right = document.getElementsByClassName("move-to-left")[0];
        let id = setInterval(() => frame(left, right), 1);
        function frame(left, right) {
            let leftDistance = parseInt(left.style.left) || 0;
            let rightDistance = parseInt(right.style.left) || 0;
            if (leftDistance == window.width * cells) {
                clearInterval(id);
            } else {
                left.style.left = leftDistance + 1 + "px";
                right.style.left = rightDistance - 1 + "px";
            }
        }
        return new Promise(resolve => setTimeout(resolve, window.interval * cells));
    }
    async selectionSort() {
        window.stop = false;
        window.resetAllSorting();
        let array = window.makeArrayFromDivs();
        let len = array.length;
        let divs = document.getElementsByClassName("number");

        let minIdx, temp;
        for (let i = 0; i < len - 2; i++) {
            minIdx = i;
            for (let j = i + 1; j < len; j++) {
                window.countSteps();
                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
            }

            let left = divs[i], right = divs[minIdx];
            window.countSwaps();
            left.classList.add("sorting");
            right.classList.add("sorting");
            left.classList.add("move-to-right");
            right.classList.add("move-to-left");
            await window.move(minIdx - i);
            await window.sleep(window.interval * (minIdx - i));

            temp = divs[i];
            divs[minIdx].parentNode.insertBefore(divs[minIdx], divs[i]);
            if(minIdx === len - 1)
                divs[minIdx].parentNode.appendChild(divs[i + 1]);
            else
                divs[minIdx].parentNode.insertBefore(divs[i + 1], divs[minIdx + 1]);
            left.style.left = "";
            right.style.left = "";
            
            temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;

            left.classList.remove("move-to-right");
            right.classList.remove("move-to-left");
            if (window.stop)
                return window.stoppedIndex = i + 1;
            left.classList.remove("sorting");
            right.classList.remove("sorting");
        }
        return array;
    }

    async bubbleSort() {
        window.stop = false;
        window.resetAllSorting();
        let array = window.makeArrayFromDivs();
        let len = array.length;
        let divs = document.getElementsByClassName("number");
        let sorted = false;
        while(!sorted) {
            sorted = true
            for (let i = 0; i < len - 1; i++) {
                if(window.stoppedIndex){
                    i = window.stoppedIndex;
                    window.stoppedIndex = undefined;
                }
                window.countSteps();
                let left = divs[i], right = divs[i + 1];
                if (array[i + 1] < array[i]) {
                    window.countSwaps();
                    sorted = false;
                    left.classList.add("sorting");
                    left.classList.add("move-to-right");
                    right.classList.add("move-to-left");
                    await window.move()
                    await window.sleep(window.interval);
                    let temp = right;
                    right.parentNode.insertBefore(divs[i + 1], left);
                    left.parentNode.insertBefore(divs[i], temp);

                    left.style.left = "";
                    right.style.left = "";

                    temp = array[i + 1];
                    array[i + 1] = array[i];
                    array[i] = temp;
                }
                left.classList.remove("move-to-right");
                right.classList.remove("move-to-left");
                if(window.stop)
                    return window.stoppedIndex = i + 1;
                left.classList.remove("sorting");
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const interval = document.getElementById("slider").nodeValue;
    window.Algorithm = new Algorithm(interval);
})