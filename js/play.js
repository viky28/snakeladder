var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 240;
canvas.height = 240;

var boxW = canvas.width / 10;
var boxH = canvas.height / 10;
var img = new Image();
var diceNumber;
var coordinates = [];
let count = 101;

let snakes = [{ s: 16, e: 6 }, { s: 47, e: 26 }, { s: 49, e: 11 }, { s: 56, e: 53 }, { s: 62, e: 19 },
    { s: 64, e: 60 }, { s: 87, e: 24 }, { s: 93, e: 73 }, { s: 95, e: 75 }, { s: 98, e: 78 }
];
let ladders = [{ s: 1, e: 38 }, { s: 4, e: 14 }, { s: 9, e: 31 }, { s: 21, e: 42 }, { s: 36, e: 44 },
    { s: 28, e: 84 }, { s: 51, e: 67 }, { s: 71, e: 91 }, { s: 80, e: 100 }
]
let players = [
    { playername: "viky", playerIndex: 0, color: "red", pos: { x: 0, y: 9 } },
    { playername: "sasi", playerIndex: 0, color: "green", pos: { x: 0, y: 9 } },
    { playername: "sidhu", color: "blue", pos: {} },
    { playername: "viky1", color: "yellow", pos: {} }
]
let active = players[0];
console.log("active is ", active.playername)
let tempPlayer = {
    playerIndex: 0,
    diceCount: 0,
    stepMoved: 0,
    completed: false
}




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

coordinates.sort(function(a, b) {
    return a.count - b.count;
})
console.log("coordinates", coordinates)
document.getElementById('button').innerHTML = players[0].playername;

function loadDefaultBox() {
    drawBox(players[0].pos.x, players[0].pos.y, players[0])
    drawBox(players[1].pos.x, players[1].pos.y, players[1])
}

function drawBox(x, y, player) {
    // console.log(x, +" " + y, ": draw for ", player)
    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.fillRect(x * boxW + (boxW / 4), y * boxH + (boxH / 4), boxW / 2, boxH / 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#003300";
    ctx.rect(x * boxW + (boxW / 4), y * boxH + (boxH / 4), boxW / 2 + 1, boxH / 2 + 1);
    ctx.stroke();
}

function refreshAndDrawBox() {
    clear(ctx);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawBox(players[0].pos.x, players[0].pos.y, players[0])
    drawBox(players[1].pos.x, players[1].pos.y, players[1])
}

function rollDice() {
    // console.log("activeeeeeeee", active,tempPlayer)
    let diceValue = Number(document.getElementById('diceNum').value)
    if(diceValue==1){
        diceNumber = 1;
    } else {
        diceNumber = diceValue-1;
    }
    tempPlayer.diceCount = diceNumber;
    tempPlayer.playerIndex = active.playerIndex;
    console.log("activeeeeeeee", active, tempPlayer)
    // console.log("active is ", active.playername)

    function _setTime() {
        setTimeout(function() {
            tempPlayer.stepMoved = ++tempPlayer.stepMoved;
            tempPlayer.playerIndex = ++tempPlayer.playerIndex;
            console.log("active player index", tempPlayer.playerIndex, active.playerIndex)
            active.pos.x = coordinates[tempPlayer.playerIndex].pos.x;
            active.pos.y = coordinates[tempPlayer.playerIndex].pos.y;
            refreshAndDrawBox();
            if (tempPlayer.diceCount == tempPlayer.stepMoved) {
                tempPlayer.completed = true;
                if (tempPlayer.completed) {
                    console.log("steps done !", active, players)
                    
                    active.playerIndex = tempPlayer.playerIndex + 1;
                    snakeBite(active)
                    ladderClimb(active)
                    // switchPlayer()
                    tempPlayer.diceCount = 0;
                    tempPlayer.stepMoved = 0;
                    switchPlayer()
                }
                return;
            }
            _setTime();
        }, 200)
    }
    _setTime();
}

function switchPlayer(cb) {
    if (active === players[0]) {
        tempPlayer.playerIndex = 0;
        active = players[1]
        console.log("active 11111")
    } else {
        tempPlayer.playerIndex = 0;
        active = players[0]
        console.log("active 22222")
    }
}

function snakeBite(player) {
    // console.log("player is ", player)
    let filtercount = snakes.filter(function(item) {
        return item.s == player.playerIndex;
    })
    console.log("filter count snake", filtercount[0])
    if (filtercount[0]) {
        let start = filtercount[0].s;
        let end = filtercount[0].e-1;
        let x = coordinates[end].pos.x;
        let y = coordinates[end].pos.y;
        player.pos.x = x;
        player.pos.y = y;
        player.playerIndex = end+1;
        refreshAndDrawBox();
    }
    
}

function ladderClimb(player) {
    console.log("player is ", player)
    let filtercount = ladders.filter(function(item) {
        console.log("boolean",item.s,player.playerIndex,item.s==player.playerIndex)
        return item.s == player.playerIndex;
    })
    console.log("filter count ladder", filtercount)
    if (filtercount[0]) {
        let start = filtercount[0].s;
        let end = filtercount[0].e - 1;
        let x = coordinates[end].pos.x;
        let y = coordinates[end].pos.y;
        console.log("console.log(player) x and y", x, y)
        player.pos.x = x;
        player.pos.y = y;
        player.playerIndex = end+1;
        console.log("console.log(player)", player)
        refreshAndDrawBox();
    } 
    player.active = true;
}