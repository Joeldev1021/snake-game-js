let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let FPS = 50;

const arrays = {
  UP: 38,
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,

};

const direction = {
    UP: false,
    LEFT: false,
    RIGHT: false,
    DOWN: false,
  };

let x = 150;
let y = 150;

addEventListener("keydown", (e) => {
  booleanChangeSnake(e);
  
});

function booleanChangeSnake(e) {
    if(e.keyCode == arrays.UP){
        e.preventDefault();
        direction.UP = true 
        direction.DOWN = false
        direction.LEFT = false
        direction.RIGHT = false     
    }else if(e.keyCode == arrays.DOWN){
        direction.DOWN = true
        direction.LEFT = false
        direction.RIGHT = false
        direction.UP = false  
    }else if(e.keyCode == arrays.LEFT){
        direction.LEFT = true
        direction.DOWN = false
        direction.RIGHT = false
        direction.UP = false  
    }else if(e.keyCode == arrays.RIGHT){
        direction.RIGHT = true
        direction.LEFT = false
        direction.DOWN = false 
        direction.UP = false  
    }
}

function principal() {
  deleteMap();
  drawSnake();
  changeSnake();
}

function deleteMap() {
  canvas.width = 500;
  canvas.height = 300;
}

setInterval(() => {
  principal();
}, 1000 / FPS);

function drawSnake() {
  ctx.moveTo(0, 0);
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 8, 8);

}

const changeSnake = () => {
    let move = 5
    if (direction.UP == true) {
      y -= move;  
    } else if(direction.DOWN == true) {
      y += move; 
    } else if (direction.RIGHT == true) {
      x += move;
    } else if (direction.LEFT == true) {
      x -= move;
    }  
};
