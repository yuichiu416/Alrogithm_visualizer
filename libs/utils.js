function changeSpeed() {
    window.speed = document.getElementById("slider").value;
    document.getElementById("speed-label").innerHTML = window.speed;
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
        divs[i].classList.remove("finished");
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
    if(window.speed === 5)
        return new Promise(resolve => setTimeout(resolve, 0));
    let left = document.getElementsByClassName("move-to-right")[0];
    let right = document.getElementsByClassName("move-to-left")[0];
    let id = setInterval(() => frame(left, right), 1);
    function frame(left, right) {
        let leftDistance = parseInt(left.style.left) || 0;
        let rightDistance = parseInt(right.style.left) || 0;
        if (leftDistance >= window.width * cells) {
            clearInterval(id);
        } else {
            left.style.left = leftDistance + 1 * cells + "px";
            right.style.left = rightDistance - 1 * cells + "px";
        }
    }
    return new Promise(resolve => setTimeout(resolve, 600 / window.speed + cells * 200));
}

function changeArray(operation) {
    const array = window.arrays[window.currentArrayIndex += operation];
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
        nextButton.disabled = false;
    else
        nextButton.disabled = true;
    if (idx > 0)
        prevButton.disabled = false;
    else
        prevButton.disabled = true;
}

function handleHistroy(toggle) {
    const histroy = document.getElementById("array-history");
    const len = window.arrays.length;
    let historyLen = histroy.childNodes.length;
    for (let i = historyLen; historyLen < len; i++) {
        let li = document.createElement("li");
        let text = document.createElement("p")
        text.innerHTML = "[" + window.arrays[i] + "]";
        li.appendChild(text);
        histroy.appendChild(li);
        historyLen = histroy.childNodes.length;
    }
    for(let i = 0; i < historyLen; i++){
        if(i != window.currentArrayIndex)
            histroy.childNodes[i].classList.remove("current-array");
        else
            histroy.childNodes[i].classList.add("current-array");
    }
    if(toggle)
        histroy.parentNode.classList.toggle("hidden");
}
function clickNav(e){
    if(e.target.id === "algs")
        return;
    const lis = document.getElementById("algs");
    document.getElementById("snippet").children[window.algorithmIndex].classList.add("hidden");
    for(let i = 0; i < lis.children.length; i++){
        lis.children[i].classList.remove("selected");
        lis.children[i].innerHTML = lis.children[i].id.substring(0, 3);
        if(e.target.id === lis.children[i].id){
            lis.children[i].classList.add("selected");
            lis.children[i].innerHTML = lis.children[i].id;
            window.algorithmIndex = i;
        }
    }
}
function sort(){
    window.algorithms[window.algorithmIndex]();
}

function setCodeIndent(){
    let divC = document.getElementById("snippet").children[window.algorithmIndex].children;

    for(let i = 0; i < divC.length; i++){
        divC[i].style.paddingLeft = divC[i].id * 30 + "px";
    }
}

function setCodeColor(idx){
    const divC = document.getElementById("snippet").children[window.algorithmIndex].children;
    for (let i = 0; i < divC.length; i++) {
        if(i === idx)
            divC[i].classList.add("sorting");
        else
            divC[i].classList.remove("sorting");
    }
}

function toggleSnippet(){
    setCodeIndent();
    setCodeColor(0);
    document.getElementById("snippet").children[window.algorithmIndex].classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    window.countSteps = countSteps;
    window.countSwaps = countSwaps;
    window.makeArrayFromDivs = makeArrayFromDivs;
    window.resetAllSorting = resetAllSorting;
    window.move = move;
    window.sleep = sleep;
    window.changeArray = changeArray;
    window.toggleArrayButtons = toggleArrayButtons;
    window.handleHistroy = handleHistroy;
    window.clickNav = clickNav;
    window.toggleSnippet = toggleSnippet;
    window.sort = sort;
    document.getElementById("algs").onclick = clickNav;
    window.algorithmIndex = 0;
    document.getElementById("BUBBLE SORT").click();
    toggleArrayButtons();
    changeSpeed();
    setCodeColor(0);
});