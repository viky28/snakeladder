var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 240;
canvas.height = 240;
var boxW = canvas.width / 10;
var boxH = canvas.height / 10;
var img = new Image();
var gotiNumber;
var coordinates = [];
let count = 101;
let gotiSum = 0;
let snakes = [{ s: 16, e: 6 }, { s: 47, e: 26 }, { s: 49, e: 11 }, { s: 56, e: 53 }, { s: 62, e: 19 }, { s: 64, e: 60 }, { s: 87, e: 24 }, { s: 93, e: 73 }, { s: 95, e: 75 }, { s: 98, e: 78 }];
let ladders = [{ s: 1, e: 38 }, { s: 4, e: 14 }, { s: 9, e: 31 }, { s: 21, e: 42 },
    { s: 36, e: 44 }, { s: 28, e: 84 }, { s: 51, e: 67 }, { s: 71, e: 91 }, { s: 80, e: 100 }
]

img.src = 'images/snake_and_ladder.png';

img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function clear(c) {
    c.clearRect(0, 0, canvas.width, canvas.height);
}

function createCoordinates() {
    for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            for (let j = 0; j < 10; j++) {
                count--;
                coordinates.push({ count: count, pos: { x: j, y: i } })
            }
        } else {
            for (let j = 9; j >= 0; j--) {
                count--;
                coordinates.push({ count: count, pos: { x: j, y: i } })
            }
        }
    }
}
createCoordinates();
var X = coordinates[0].pos.x;
var Y = coordinates[0].pos.y;
console.log("coordinates", coordinates)

function drawBox(x, y) {
    clear(ctx);
    img.onload();
    ctx.beginPath();
    ctx.fillStyle = "#8df7e4";
    ctx.fillRect(x * boxW + (boxW / 4), y * boxH + (boxH / 4), boxW / 2, boxH / 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#003300";
    ctx.rect(x * boxW + (boxW / 4), y * boxH + (boxH / 4), boxW / 2 + 1, boxH / 2 + 1);
    ctx.stroke();
}

function play() {
    gotiNumber = Math.floor(Math.random() * 6) + 1;
    gotiSum = gotiSum + gotiNumber;
    if(gotiSum>100){
        gotiSum = gotiSum - gotiNumber;
    }
    console.log("Goti Sum", gotiSum)
    document.getElementById('placeholder').innerHTML = gotiNumber;
    if(gotiSum>100){
        console.log("goti sum excceeded 100")
        gotiSum = gotiSum - gotiNumber;
        return;
    }
    for (let i = 0; i < coordinates.length; i++) {
        if (gotiSum == coordinates[i].count) {
            X = coordinates[i].pos.x;
            Y = coordinates[i].pos.y;
            drawBox(X, Y)
            snakeBite(gotiSum)
            ladderClimb(gotiSum)
        }
    }
    if(gotiSum==100){
        console.log("You Won !")
        ctx.textAlign = "center";
        ctx.fillText("You Won !",120,120);
        return;
    }
}

function snakeBite(goti) {
    let filtercount = snakes.filter(function(item) {
        return item.s == goti;
    })
    if (filtercount[0]) {
        let snakeBiteDown = coordinates.filter(function(item) {
            return item.count == filtercount[0].e;
        })
        let x = snakeBiteDown[0].pos.x;
        let y = snakeBiteDown[0].pos.y;
        gotiSum = snakeBiteDown[0].count;
        setTimeout(function() {
            drawBox(x, y)
        }, 1000)

    }
}

function ladderClimb(goti) {
    let filtercount = ladders.filter(function(item) {
        return item.s == goti;
    })
    if (filtercount[0]) {
        let ladderClimbUp = coordinates.filter(function(item) {
            return item.count == filtercount[0].e;
        })
        let x = ladderClimbUp[0].pos.x;
        let y = ladderClimbUp[0].pos.y;
        gotiSum = ladderClimbUp[0].count;
        setTimeout(function() {
            drawBox(x, y)
        }, 1000)
    }
}