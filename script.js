let body = document.querySelector("body");
const userInput = document.getElementById("user-input");
const gameText = document.getElementById("game-text");
const input = document.querySelector("input");
let cpuNum = Math.floor(Math.random()*100);
let vert = window.innerHeight;
let x = 30;
let y = 30;
let dx = 2;
let dy = 2;
let radius = 30;
let circleArray = [];
let canvas = document.querySelector("canvas");
let cid = document.getElementById("cid");
let c = canvas.getContext("2d");
let colorArray = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#9ADCFF", "#FFF89A", "#55D8C1", "#6A5495"];

let gameLogic = (userNumber) => {
    parsedNum = parseInt(userNumber);
    if (userNumber.toLowerCase() === "replay"){
        cpuNum = Math.floor(Math.random()*100);
        if (input.classList.contains("mellow")){
            input.classList.toggle("mellow");
        }
    }
    if (userNumber != cpuNum){
        if (parseInt(userNumber) * 0 === 0){
            if ((cpuNum - cpuNum/2) < parsedNum && parsedNum < (cpuNum + cpuNum/2)){
                if (!input.classList.contains("hot")){
                    input.classList.toggle("hot");
                }
                if (input.classList.contains("cold")){
                    input.classList.toggle("cold");
                }
            } else {
                if (!input.classList.contains("cold")){
                    input.classList.toggle("cold");
                }
            }
            if (parsedNum < cpuNum){
                gameText.innerHTML = "Higher";
            } else if (parsedNum > cpuNum){
                gameText.innerHTML = "Lower";
            }
        } else {
            gameText.innerHTML = "Enter a Number";
        }
    } else if (parsedNum == cpuNum){
        gameText.innerHTML = "Correct, congratulations. Type 'REPLAY' to play again";
        if (!input.classList.contains("mellow")){
            input.classList.toggle("mellow");
        }
    }
}

let loadCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    canvasDrawCr(x, y, 30);
    //canvasDrawSq(30, 30, 30, 30,);
    if (x + radius > innerWidth || x - radius < 0){
        reverseDirectionX();
    }
    if (y + radius > innerHeight || y - radius < 0){
        reverseDirectionY();
    }
    x += dx;
    y += dy;
}
let createCircles = (n) => {
    for (let i = 0; i < n;  i++){
        canvasDrawCr(Math.floor(Math.random*innerWidth), Math.floor(Math.random()*innerHeight), radius);
    }
}
let update = (circle) => {
    if (x + radius > innerWidth || x - radius < 0){
        reverseDirectionX();
    }
    if (y + radius > innerHeight || y - radius < 0){
        reverseDirectionY();
    }
    x += dx;
    y += dy;
}

let reverseDirectionX = () => {
    dx = -dx;
}

let reverseDirectionY = () => {
    dy = -dy;
}
//Square
let canvasDrawSq = (x, y, width, height, color) => {
    c.fillStyle = `${color}`;
    c.fillRect(x, y, width, height);
}

//Line
let canvasDrawLn = (x, y, width, height) => {
    //c.beginPath();
    //c.moveTo(0,6);
    c.lineTo(2, 2);
    c.strokeStyle = "green";
    c.stroke();
    c.translate(0.5, 0.5);
}

//Circle
let canvasDrawCr = (x, y, radius, color) => {
    c.beginPath();
    c.strokeStyle = `${color}`;
    c.fillStyle = `${color}`;
    c.fill();
    c.arc(x, y, radius, Math.PI*2, false);
    c.stroke();
}

let fillCanvasWithObj = (num, obj, vert) => {
    for (let i = 0; i < num; i++){
        let x = Math.floor(Math.random()*window.innerWidth);
        let y = Math.floor(Math.random()*window.innerHeight);
        let color = colorArray[Math.floor(Math.random()*colorArray.length)];
        if (obj === "sq"){
            canvasDrawSq(x, y, 20, 20, color);
        } else if (obj === "cr"){
            canvasDrawCr(x, y, 5, color);
        }

    }
}

window.addEventListener("resize", () => {
    loadCanvas();
    fillCanvasWithObj(10, "cr");

})

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        userNumber = userInput.value;
        gameLogic(userNumber);
    }
});

loadCanvas();
animate();
// canvasDrawSq(100, 100, 20, 20);
canvasDrawLn(3, 3, 4);
// canvasDrawCr(50, 100, 3);