const NUMBER_OF_PIECES = 4;
const PUZZLE_HOVER_TINT = '#009900';
//
var canvas = null;
var context = null;
//
var img = null;
var pieces = [];
var puzzleWidth = 0;
var puzzleHeight = 0;
var pieceWidth = 0;
var pieceHeight = 0;
var currentPiece = null;
var currentDropPiece = null;
// 
var mouse = {x:0,y:0};
//
function initialization() {
    initImage();
}
function initImage() {
    img = new Image();
    img.addEventListener('load',initScale);
    img.src = 'media/picture.jpg';
    //img.setAttribute("width","1000");
    //img.setAttribute("height","600");
}
function initScale() {
    pieceWidth = Math.floor(img.width / NUMBER_OF_PIECES );
    pieceHeight = Math.floor(img.height / NUMBER_OF_PIECES );
    puzzleWidth = pieceWidth * NUMBER_OF_PIECES;
    puzzleHeight = pieceHeight * NUMBER_OF_PIECES;
    initCanvas();
    initPuzzle();
}
function initCanvas() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.width = puzzleWidth;
    canvas.height = puzzleHeight;
    canvas.style.border = "1px solid black";
}
function initPuzzle() {
    
    context.drawImage(img, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);
    createPuzles();
}
function createPuzles() {
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < NUMBER_OF_PIECES * NUMBER_OF_PIECES; i++) {
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        pieces.push(piece);
        xPos += pieceWidth;
        if(xPos >= puzzleWidth){
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    document.onmousedown = shufflePuzzle;
}
function shufflePuzzle(){
    pieces = shuffleArray(pieces);
    context.clearRect(0,0,puzzleWidth,puzzleHeight);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < pieces.length;i++){
        piece = pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        context.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
        context.strokeRect(xPos, yPos, pieceWidth,pieceHeight);
        xPos += pieceWidth;
        if(xPos >= puzzleWidth){
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    //document.onmousedown = onPuzzleClick;
}
function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
