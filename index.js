/* eslint-disable no-unused-vars */
const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext("2d");

const FPS = 10;

canvas.focus();

const arrayDirection = {
  UP: 38,
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
};

let direction = 0;

const snakeBody = [
  { x: 100, y: 100 },
];

let eatFood_x = 200;
let eatFood_y = 200;


// move sanke
window.addEventListener("keydown", (e) => {
  //restringe el movimiento de la serpiente
  if(e.keyCode ==  39 && direction != arrayDirection.LEFT) {
    direction = arrayDirection.RIGHT;
  } else if (e.keyCode ==  37 && direction != arrayDirection.RIGHT) {
    direction = arrayDirection.LEFT;
  } else if (e.keyCode ==  38 && direction != arrayDirection.DOWN) {
    direction = arrayDirection.UP;
  } else if (e.keyCode ==  40 && direction != arrayDirection.UP) {
    direction = arrayDirection.DOWN;
  }
   
});

const drawSnake = () => {
  ctx.lineWidth = 3;
  snakeBody.forEach((el) => {
    ctx.strokeRect(el.x, el.y, 8, 8);
  })
  
};

function clearMap() {
  canvas.width = 500;
  canvas.height = 300;
}

function drawEatenFood() {
  ctx.fillStyle = "red";
  ctx.lineWidth = 2
  ctx.fillRect(eatFood_x,eatFood_y , 8, 8);
  ctx.strokeRect(eatFood_x, eatFood_y, 8, 8);
}

function moveSnake() {
  if (snakeBody.length > 1) {
    snakeBody.pop()
    snakeBody.unshift({
        x: snakeBody[0].x,
        y: snakeBody[0].y
    })
}

  if (direction === arrayDirection.UP) {
    if(snakeBody[0].y < 0) snakeBody[0].y = 300;
    snakeBody[0].y -= 10 
    
  } else if (direction === arrayDirection.DOWN) {
    if(snakeBody[0].y > 300) snakeBody[0].y = -10;
    snakeBody[0].y += 10 
   
  } else if (direction === arrayDirection.LEFT) {
    if(snakeBody[0].x < 0) snakeBody[0].x = 500;
    snakeBody[0].x -= 10 
  
  } else if (direction === arrayDirection.RIGHT) {
    if(snakeBody[0].x > 500) snakeBody[0].x = -10;
    snakeBody[0].x += 10 
    
  }

  drawSnake();
}

function snakeEatenFood () {
  if (snakeBody[0].x === eatFood_x && snakeBody[0].y === eatFood_y) {
 
    snakeBody.push({
      x: snakeBody[snakeBody.length-1].x,
      y: snakeBody[snakeBody.length-1].y
    })
    eatFood_x = (Math.floor(Math.random() * (50 - 1)) + 1) * 10;
    eatFood_y = (Math.floor(Math.random() * (30 - 1)) + 1) * 10;
    console.log(eatFood_x, eatFood_y)
  }
  
}

function collisionBodySnake() {
  if(snakeBody.length > 4) {
    for (let i = 1; i < snakeBody.length; i++) {
      if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
        clearMap();
        alert("Game Over");
        snakeBody.length = 1;
        snakeBody[0].x = 100;
        snakeBody[0].y = 100;

        return;
      }
      
    }
  }
}

function principal() {
  clearMap();
  moveSnake();
  drawEatenFood()
  snakeEatenFood()
  collisionBodySnake()
}

setInterval(() => {
  principal();
}, 1000 / FPS);



