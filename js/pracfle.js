
// document.addEventListener('keydown', keyevent, false);
// var box  = [{x:0,y:9}]
// drawBox(X,Y)
// function keyevent(e) {
//     if (e.key === "ArrowUp" ) {
//         drawBox(X,--Y)
//         console.log("Up","---Coordinates",X,Y)
//     } else if (e.key === "ArrowDown") {
//         drawBox(X,++Y)
//         console.log("Down","---Coordinates",X,Y)
//     } else if (e.key === "ArrowLeft") {
//         drawBox(--X,Y)
//         console.log("Left","---Coordinates",X,Y)
//     } else if (e.key === "ArrowRight") {
//         drawBox(++X,Y)
//         console.log("Right","---Coordinates",X,Y)
//     }
// }

// function play(){
//    // ctx.clearRect(0,0,canvas.width, canvas.height)
//    gotiNumber =  Math.floor(Math.random() * 6)+1;
//    document.getElementById('number').innerHTML = gotiNumber;
//    console.log("goitNumber",gotiNumber)
//    let prevX = box[0].x;
//    let prevY = box[0].y;


//    if(Y==8 || Y==6 || Y==4 || Y==2 || Y==0){
//       X = X-gotiNumber; 
//    } else {
//        X = X+gotiNumber;
//    }
//    if(X>9){
//        Y = Y-1;
//        X = prevX+gotiNumber-9
//    }

//    console.log("prex and prevy",prevX,prevY)
//    box.pop();
//    // X = X+gotiNumber;

//    box.push({x:X,y:Y})
//    console.log(box[0]);
//    drawBox(X,Y)
// }