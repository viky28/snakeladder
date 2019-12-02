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
// let gotiSum = 0;
let snakes = [{ s: 16, e: 6 }, { s: 47, e: 26 }, { s: 49, e: 11 }, { s: 56, e: 53 }, { s: 62, e: 19 }, { s: 64, e: 60 }, { s: 87, e: 24 }, { s: 93, e: 73 }, { s: 95, e: 75 }, { s: 98, e: 78 }];
let ladders = [{ s: 1, e: 38 }, { s: 4, e: 14 }, { s: 9, e: 31 }, { s: 21, e: 42 },
    { s: 36, e: 44 }, { s: 28, e: 84 }, { s: 51, e: 67 }, { s: 71, e: 91 }, { s: 80, e: 100 }
]

let players = [
    { playername: "viky", gotiSum: 0, color: "red", active: true, pos: { x: 0, y: 9 } },
    { playername: "sasi", gotiSum: 0, color: "green", active: true, pos: { x: 0, y: 9 } },
    { playername: "sidhu", gotiSum: 0, color: "blue", pos: {} },
    { playername: "viky1", gotiSum: 0, color: "yellow", pos: {} }
]

let diceRollFor = 0;
// let active = players[0].playername;
img.src = 'images/snake_and_ladder.png';

img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    loadDefaultBox()
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
// var X = coordinates[0].pos.x;
// var Y = coordinates[0].pos.y;
console.log("coordinates", coordinates)
console.log("player pos", players[0].pos.x, players[0].pos.y, players[0])
console.log("player pos", players[1].pos.x, players[1].pos.y, players[1])
// ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
function loadDefaultBox() {
    drawBox(players[0].pos.x, players[0].pos.y, players[0])
    drawBox(players[1].pos.x, players[1].pos.y, players[1])
}


function drawBox(x, y, player) {
    // clear(ctx);
    console.log(x, +" " + y, ": draw for ", player)
    // img.onload();
    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.fillRect(x * boxW + (boxW / 4), y * boxH + (boxH / 4), boxW / 2, boxH / 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#003300";
    ctx.rect(x * boxW + (boxW / 4), y * boxH + (boxH / 4), boxW / 2 + 1, boxH / 2 + 1);
    ctx.stroke();
}
document.getElementById('button').innerHTML = players[0].playername;

function rollDice() {
    // if (!players[0].active && !players[1].active && !players[2].active && !players[3].active) {
    //     console.log("Game Initaited")
    //     players[0].active = true;
    // }
    if (players[0].active) {
        play(players[0])
        players[1].active = true;
        players[0].active = false;
        document.getElementById('button').innerHTML = players[1].playername;

    } else if (players[1].active) {
        play(players[1])
        players[1].active = false;
        players[0].active = true;
        document.getElementById('button').innerHTML = players[0].playername;
    }
}

function play(player) {
    console.log("Player " + player.playername + " is Active")
    console.log("player details", players)
    gotiNumber = Math.floor(Math.random() * 6) + 1;
    // let gotiSum = player.gotiSum;
    player.gotiSum = player.gotiSum + gotiNumber;
    if (player.gotiSum > 100) {
        player.gotiSum = player.gotiSum - gotiNumber;
    }

    console.log("Goti " + gotiNumber + " Goti Sum " + player.gotiSum);
    document.getElementById('placeholder').innerHTML = gotiNumber;
    if (player.gotiSum > 100) {
        console.log("goti sum excceeded 100")
        player.gotiSum = player.gotiSum - gotiNumber;
        return;
    }
    for (let i = 0; i < coordinates.length; i++) {
        if (player.gotiSum == coordinates[i].count) {
            // X = coordinates[i].pos.x;
            // Y = coordinates[i].pos.y;
            // drawBox(X,Y,player)
            player.pos.x = coordinates[i].pos.x;
            player.pos.y = coordinates[i].pos.y;
            clear(ctx);
            // img.onload();
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawBox(players[0].pos.x, players[0].pos.y, players[0])
            drawBox(players[1].pos.x, players[1].pos.y, players[1])
            player.active = false;
            snakeBite(player)
            ladderClimb(player)
        }
    }
    if (player.gotiSum == 100) {
        console.log(player.playername + " Won !")
        ctx.textAlign = "center";
        ctx.fillText("You Won !", 120, 120);
        return;
    }
}

function snakeBite(player) {
    let filtercount = snakes.filter(function(item) {
        return item.s == player.gotiSum;
    })
    if (filtercount[0]) {
        let snakeBiteDown = coordinates.filter(function(item) {
            return item.count == filtercount[0].e;
        })
        let x = snakeBiteDown[0].pos.x;
        let y = snakeBiteDown[0].pos.y;
        player.pos.x = x;
        player.pos.y = y;
        player.gotiSum = snakeBiteDown[0].count;
        setTimeout(function() {
            clear(ctx);
            // img.onload();
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawBox(players[0].pos.x, players[0].pos.y, players[0])
            drawBox(players[1].pos.x, players[1].pos.y, players[1])
            // drawBox(x, y,player)
        }, 1000)
    }
}

function ladderClimb(player) {
    let filtercount = ladders.filter(function(item) {
        return item.s == player.gotiSum;
    })
    if (filtercount[0]) {
        let ladderClimbUp = coordinates.filter(function(item) {
            return item.count == filtercount[0].e;
        })
        let x = ladderClimbUp[0].pos.x;
        let y = ladderClimbUp[0].pos.y;
        player.pos.x = x;
        player.pos.y = y;
        player.gotiSum = ladderClimbUp[0].count;
        setTimeout(function() {
            clear(ctx);
            // img.onload();
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawBox(players[0].pos.x, players[0].pos.y, players[0])
            drawBox(players[1].pos.x, players[1].pos.y, players[1])
            // drawBox(x, y,player)
        }, 1000)
    }
    player.active = true;
}

// function playerCollide(){
//     if(player[0].gotiSum==player[1].gotiSum){
//         if(player[0].active){

//         }
//     }
// }