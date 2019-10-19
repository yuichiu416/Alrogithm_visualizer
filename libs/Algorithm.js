class Algorithm {
    async selectionSort() {
        window.stop = false;
        window.resetAllSorting();
        let array = window.makeArrayFromDivs();
        let len = array.length;
        let divs = document.getElementsByClassName("number");

        let minIdx, temp;
        for (let i = 0; i < len - 1; i++) {
            window.setCodeColor(1)
            await window.sleep(600 / window.speed);

            if (window.stoppedIndex) {
                i = window.stoppedIndex;
                window.stoppedIndex = undefined;
            }
            minIdx = i;
            let left = divs[i], right;
            left.classList.add("move-to-right");
            for (let j = i + 1; j < len; j++) {
                window.setCodeColor(2)
                await window.sleep(600 / window.speed);
                right = divs[j];
                right.classList.add("move-to-left");
                if (array[j] < array[minIdx]) {
                    window.setCodeColor(3);
                await window.sleep(600 / window.speed);
                    minIdx = j;
                    window.setCodeColor(4)
                await window.sleep(600 / window.speed);
                }
                right.classList.remove("move-to-left");
            }
            
            window.countSteps();
            window.countSwaps();
            right = divs[minIdx];
            right.classList.add("move-to-left");
            window.setCodeColor(5);
            await window.sleep(600 / window.speed);
            await window.move(minIdx - i);
            await window.sleep( 300 / window.speed * (minIdx - 1));

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
            if (parseInt(divs[i].firstChild.innerHTML) === i + 1)
                divs[i].classList.add("finished");
            if (parseInt(divs[len - 1].firstChild.innerHTML) === len)
                divs[len - 1].classList.add("finished");
        }
    }

    async bubbleSort() {
        window.stop = false;
        window.resetAllSorting();
        let array = window.makeArrayFromDivs();
        let len = array.length;
        let divs = document.getElementsByClassName("number");
        let sorted = false;
        while(!sorted) {
            window.setCodeColor(0);
            await window.sleep(600 / window.speed);
            sorted = true
            window.setCodeColor(1);
            await window.sleep(600 / window.speed);
            
            for (let i = 0; i < len - 1; i++) {
                window.codeSnippetIndex = 2;
                window.setCodeColor(2);
                await window.sleep(600 / window.speed);

                if(window.stoppedIndex){
                    i = window.stoppedIndex;
                    window.stoppedIndex = undefined;
                }
                window.countSteps();
                let left = divs[i], right = divs[i + 1];
                left.classList.add("move-to-right");
                if (array[i + 1] < array[i]) {
                    window.setCodeColor(3);
                    await window.sleep(600 / window.speed);

                    window.countSwaps();
                    sorted = false;
                    window.setCodeColor(4);
                    await window.sleep(600 / window.speed);

                    right.classList.add("move-to-left");
                    await window.move()
                    await window.sleep(300 / window.speed);

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
            if (parseInt(divs[i].firstChild.innerHTML) === i + 1)
                divs[i].classList.add("finished");
            if (parseInt(divs[len - 1].firstChild.innerHTML) === len)
                divs[len - 1].classList.add("finished");
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const alg = Algorithm.prototype;
    window.algorithms = [alg.bubbleSort, alg.selectionSort, "insertion sort", "merge sort", "quick sort", "heap sort"];
})