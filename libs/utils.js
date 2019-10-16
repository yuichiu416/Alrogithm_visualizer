function changeInterval() {
    window.interval = Math.abs(document.getElementById("slider").value - 1000);
    console.log(Math.abs(window.interval))
}

function stopSorting() {
    window.stop = true;
}

function countSteps() {
    const steps = document.getElementById("steps");
    steps.innerHTML = parseInt(steps.innerHTML) + 1;
}
function countSwaps() {
    const swaps = document.getElementById("swaps");
    swaps.innerHTML = parseInt(swaps.innerHTML) + 1;
}

function resetAllSorting() {
    let divs = document.getElementsByClassName("number");
    for (let i = 0; i < divs.length; i++) {
        divs[i].classList.remove("sorting");
    }
    document.getElementById("steps").innerHTML = 0;
    document.getElementById("swaps").innerHTML = 0;
}

function makeArrayFromDivs() {
    let divs = document.getElementsByClassName("number-text");
    let array = [];
    for (let i = 0; i < divs.length; i++) {
        array.push(parseInt(divs[i].innerHTML));
    }
    return array;
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function move(cells = 1) {
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

function previousArray() {
    const array = window.arrays[--window.currentArrayIndex];
    new window.Array(undefined, array);
    toggleArrayButtons();
    handleHistroy()
}

function nextArray() {
    const array = window.arrays[++window.currentArrayIndex];
    console.log(`current ${array}`)
    new window.Array(undefined, array);
    toggleArrayButtons();
    handleHistroy()
}

function toggleArrayButtons() {
    const len = window.arrays.length;
    const prevButton = document.getElementById("previous-array");
    const nextButton = document.getElementById("next-array");
    const idx = window.currentArrayIndex;
    if (len - idx > 1)
        nextButton.classList.remove("hidden");
    else
        nextButton.classList.add("hidden");
    if (idx > 0)
        prevButton.classList.remove("hidden");
    else
        prevButton.classList.add("hidden");
}

function handleHistroy(toggle) {
    const histroy = document.getElementById("array-history");
    const len = window.arrays.length;
    let historyLen = histroy.childNodes.length;
    for (let i = historyLen; historyLen < len; i++) {
        let li = document.createElement("li");
        li.innerHTML = "[" + window.arrays[i] + "]";
        histroy.appendChild(li);
        historyLen = histroy.childNodes.length;
    }
    for(let i = 0; i < historyLen; i++){
        if(i != window.currentArrayIndex)
            histroy.childNodes[i].classList.remove("sorting");
        else
            histroy.childNodes[i].classList.add("sorting");
    }
    if(toggle)
        histroy.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    window.interval = Math.abs(document.getElementById("slider").value - 1000);
    window.countSteps = countSteps;
    window.countSwaps = countSwaps;
    window.makeArrayFromDivs = makeArrayFromDivs;
    window.resetAllSorting = resetAllSorting;
    window.move = move;
    window.sleep = sleep;
    window.previousArray = previousArray;
    window.nextArray = nextArray;
    window.toggleArrayButtons = toggleArrayButtons;
    window.handleHistroy = handleHistroy;
    toggleArrayButtons();
});