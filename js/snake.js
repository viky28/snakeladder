var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 240;
canvas.height = 240;
var boxW = canvas.width / 10;
var boxH = canvas.height / 10;
var img = new Image();
var box  = [{x:3,y:5}]
img.src = 'images/snake_and_ladder.png'
img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    console.log(box[0].x,box[0].y)
    drawBox(box[0].x,box[0].y)
    // drawBox(3,5)
}

function drawBox(x, y) {
    console.log("its getting called")
    ctx.beginPath();
    ctx.rect(x * boxW, y * boxH, boxW, boxH);
    ctx.stroke();
}
document.addEventListener('keydown', keyevent, false);
var X = box[0].x;
var Y = box[0].y;
function keyevent(e) {
    if (e.key === "ArrowUp" ) {
        drawBox(X,--Y)
        console.log("Up","---Coordinates",X,Y)
    } else if (e.key === "ArrowDown") {
        drawBox(X,++Y)
        console.log("Down","---Coordinates",X,Y)
    } else if (e.key === "ArrowLeft") {
        drawBox(--X,Y)
        console.log("Left","---Coordinates",X,Y)
    } else if (e.key === "ArrowRight") {
        drawBox(++X,Y)
        console.log("Right","---Coordinates",X,Y)
    }
}