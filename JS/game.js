var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  score: 0,
  level: 0,
  foodImages: [
    ["avocado.png", "cheese.png","blueberrie.png"],
    ["pina.png", "bacon.png", "iceCream.png", "banana.png"],
    ["egg.png", "honey.png", "blueberrie.png", "aubergine.png", "popcorn.png"]
  ],
  backgroundImages: [
    "../img/animatedJungle.jpg",
    "../img/animatedForest.jpg",
    "../img/animatedSavana.jpg"
  ],
  velocityFood: [-2, -4, -6],

  
  init: function(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.w = window.innerWidth - 20;
    this.h = window.innerHeight - 20;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.framesCounter = 0;

    this.reset();
  },
  start: function() {
    this.reset();

    this.interval = setInterval(
      function() {
        // this.clear();

        console.log(this.foodImages[this.level]);
        this.framesCounter++;

        // controls that the framecounter is not bigger than 1000
        if (this.framesCounter > 1000) {
          this.framesCounter = 0;
        }

        //generates the food every 100 frames
        if (this.framesCounter % 100 === 0) {
          this.generateFood();
        }

        //executing the function
        this.moveAll();
        this.drawAll();
        this.changeLevel();

        if (this.scoreBoard.rectW <= 0) this.gameOver();
        this.isCollision();
      }.bind(this),
      1000 / this.fps
    );
  },

  //reset all elements of the game tudo start in a clean state
  reset: function() {
    this.background = new Background(this);
    this.player = new Player(this);
    this.foods = [];
    this.level = 0;
    this.scoreBoard = ScoreBoard;
  },

  //draws all assets of the game; by declaring the fucntion
  drawAll: function() {
    this.background.draw();
    this.player.draw();
    this.drawScore();

    // filter by food.collition === false
    this.foods = this.foods.filter(function(food) {
      return food.collition === false;
    });

    // draw all
    this.foods.forEach(function(food) {
      food.draw();
    });
  },

  changeLevel: function() {
    if (this.scoreBoard.rectW >= 400 && this.level === 0) {
      this.level = 1;
      this.scoreBoard.rectW = 10;
      this.foods = []; // food disapears in the following level
    } else if (this.scoreBoard.rectW >= 400 && this.level === 1) {
      this.level = 2;
      this.scoreBoard.rectW = 10;
      this.foods = [];
    } else if (this.scoreBoard.rectW >= 400 && this.level === 2) {
      this.level = 3;
      this.scoreBoard.rectW = 10;
      this.foods = [];
    }

    this.background.img.src = this.backgroundImages[this.level];
  },
  //moves the food object inside the scenario
  moveAll: function() {
    this.foods.forEach(function(food) {
      food.move();
    });
  },

  //generates new foods
  generateFood: function() {
    //this = game
    this.foods.push(
      new Food(this, this.foodImages[this.level], this.velocityFood[this.level])
    );
  },

  //COLLISION
  isCollision: function() {
    this.foods.some(
      function(food) {
        if (
          this.player.x + this.player.w >= food.x &&
          food.x + food.w > this.player.x &&
          this.player.y + this.player.h > food.y &&
          food.y + food.h > this.player.y
        ) {
          if (food.img.src.includes("avocado.png")) {
            console.log("avocado!!");
            this.scoreBoard.rectW += 100; //aumenta el Scoreboard
            this.score++;
          } else if (food.img.src.includes("strawberry.png")) {
            console.log("strawberry!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("pina.png")) {
            console.log("pina!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("aubergine.png")) {
            console.log("aubergine!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("banana.png")) {
            console.log("banana!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("blueberrie.png")) {
            console.log("blueberrie!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("popcorn.png")) {
            console.log("Popcorn!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("chickpea.jpg")) {
            console.log("Strawberry!!");
            this.scoreBoard.rectW += 100;
          } else {
            //diminui el Scoreboard
            console.log("This food is bad");
            this.scoreBoard.rectW -= 50;
          }

          console.log(this.score.rectW);

          food.collition = true;
        }

        // Change collition property of food to true if touches
      }.bind(this)
    );
  },

  // deletes food when there's collision
  deleteObstacle: function(index) {
    this.foods.splice(index, 1);
    console.log("I deleted the index" + index);
  },

  //draws the score
  drawScore: function() {
    this.scoreBoard.update(this.score, this.ctx, this);
  },

  //End of game
  gameOver: function() {
    this.stop();
    this.gameOverBanner();
    // this.reset();
    // this.start();
  },

  gameOverBanner: function() {
    this.img = new Image();
    this.img.src = "../img/gameover.png";
    this.img.onload = function() {
    this.ctx.drawImage(this.img, 0, 0, 500, 500);
    }.bind(this);
  },

  stop: function() {
    clearInterval(this.interval);
  },

  nextLevel: function() {
    this.continue();
  }
};
