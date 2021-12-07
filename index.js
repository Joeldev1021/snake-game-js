const canvas = document.getElementById("myCanvas");
const $score = document.querySelector(".score");
const start = document.getElementById("start");
const ctx = canvas.getContext("2d");

start.addEventListener("click", () => {
  initGameSnake();
  start.style.display = "none";
});

class Snake {
  constructor () {
    this.FPS = 10;
    this.direction = 39;
    this.eatFood_x = 200;
    this.eatFood_y = 200;

    this.arrayDirection = {
      UP: 38,
      LEFT: 37,
      RIGHT: 39,
      DOWN: 40
    };
    this.snakeBody = [
      { x: 100, y: 100 },
      { x: 90, y: 100 },
      { x: 80, y: 100 }
    ];
    this.score = 0;
  }

  // initial loop
  initializeGame () {
    console.log(this.snakeBody);
    setInterval(() => {
      this.principal();
    }, 1000 / this.FPS);
  }

  // principal functions
  principal () {
    this.clearMap();
    this.moveSnake();
    this.drawEatenFood();
    this.snakeEatenFood();
    this.collisionBodySnake();
    this.controls();
    canvas.focus();
  }

  // clear canvas
  clearMap () {
    canvas.width = 500;
    canvas.height = 300;
  }

  // draw snake
  drawSnake () {
    ctx.lineWidth = 3;
    this.snakeBody.forEach((el) => {
      ctx.strokeRect(el.x, el.y, 8, 8);
    });
  }

  // controls keyboard
  controls () {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 39 && this.direction !== this.arrayDirection.LEFT) {
        this.direction = this.arrayDirection.RIGHT;
      } else if (
        e.keyCode === 37 &&
        this.direction !== this.arrayDirection.RIGHT
      ) {
        this.direction = this.arrayDirection.LEFT;
      } else if (
        e.keyCode === 38 &&
        this.direction !== this.arrayDirection.DOWN
      ) {
        this.direction = this.arrayDirection.UP;
      } else if (
        e.keyCode === 40 &&
        this.direction !== this.arrayDirection.UP
      ) {
        this.direction = this.arrayDirection.DOWN;
      }
    });
  }

  // move snake here delete last element is the head and add the new head
  moveSnake () {
    if (this.snakeBody.length > 1) {
      this.snakeBody.pop();
      this.snakeBody.unshift({
        x: this.snakeBody[0].x,
        y: this.snakeBody[0].y
      });
    }
    if (this.direction === this.arrayDirection.UP) {
      if (this.snakeBody[0].y < 0) this.snakeBody[0].y = 300;
      this.snakeBody[0].y -= 10;
    } else if (this.direction === this.arrayDirection.DOWN) {
      if (this.snakeBody[0].y > 300) this.snakeBody[0].y = -10;
      this.snakeBody[0].y += 10;
    } else if (this.direction === this.arrayDirection.LEFT) {
      if (this.snakeBody[0].x < 0) this.snakeBody[0].x = 500;
      this.snakeBody[0].x -= 10;
    } else if (this.direction === this.arrayDirection.RIGHT) {
      if (this.snakeBody[0].x > 500) this.snakeBody[0].x = -10;
      this.snakeBody[0].x += 10;
    }

    this.drawSnake();
  }

  snakeEatenFood () {
    if (
      this.snakeBody[0].x === this.eatFood_x &&
      this.snakeBody[0].y === this.eatFood_y
    ) {
      this.snakeBody.push({
        x: this.snakeBody[this.snakeBody.length - 1].x,
        y: this.snakeBody[this.snakeBody.length - 1].y
      });

      this.eatFood_x = (Math.floor(Math.random() * (50 - 1)) + 1) * 10;
      this.eatFood_y = (Math.floor(Math.random() * (30 - 1)) + 1) * 10;
      console.log(this.eatFood_x, this.eatFood_y);
      this.score++;
      this.renderScore();
    }
  }

  // draw food
  drawEatenFood () {
    ctx.fillStyle = "red";
    ctx.lineWidth = 2;
    ctx.fillRect(this.eatFood_x, this.eatFood_y, 8, 8);
    ctx.strokeRect(this.eatFood_x, this.eatFood_y, 8, 8);
  }

  // collision body snake
  collisionBodySnake () {
    if (this.snakeBody.length > 4) {
      for (let i = 1; i < this.snakeBody.length; i++) {
        if (
          this.snakeBody[0].x === this.snakeBody[i].x &&
          this.snakeBody[0].y === this.snakeBody[i].y
        ) {
          alert("Game Over");
          this.snakeBody.length = 1;
          this.snakeBody[0].x = 100;
          this.snakeBody[0].y = 100;
          return;
        }
      }
    }
  }

  renderScore () {
    console.log(this.snakeBody);
    $score.innerHTML = `Score:${this.score}`;
  }
}
// initialize game
function initGameSnake () {
  const snake = new Snake();
  snake.initializeGame();
}
