function changeInterval(){
    window.interval = Math.abs(document.getElementById("slider").value - 1000);
    console.log(Math.abs(window.interval))
};

function stopSorting(){
    window.stop = true;
};

document.addEventListener("DOMContentLoaded", () => {
    window.interval = Math.abs(document.getElementById("slider").value - 1000);
});