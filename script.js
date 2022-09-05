let myOrientation = 'white'
var board1;
var startC = "rnbqkbnr/pppp1ppp/8/8/3QP3/8/PPP2PPP/RNB1KBNR"
$(document).ready(function () {
 
    
    
    var config = {
        draggable: true,
        moveSpeed: 'slow',
        snapbackSpeed: 500,
        snapSpeed: 100,
        dropOffBoard: "trash",
        
        position: "start",
        orientation: "white"
    }
    
    
    board1 = Chessboard('board1', config)
});

function changeOrientation(){
 if(myOrientation == 'black') myOrientation ='white';
 else myOrientation = 'black';   
 board1.orientation(myOrientation);

}

function positionCenter(){
    board1.position(startC)
}