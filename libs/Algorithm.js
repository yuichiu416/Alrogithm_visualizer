class Algorithm {
    async selectionSort() {
        window.stop = false;
        window.resetAllSorting();
        let array = window.makeArrayFromDivs();
        let len = array.length;
        let divs = document.getElementsByClassName("number");

        let minIdx, temp;
        for (let i = 0; i < len - 1; i++) {
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
                left.classList.add("sorting");
                if (array[i + 1] < array[i]) {
                    window.countSwaps();
                    sorted = false;
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
                await window.sleep(window.interval);
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