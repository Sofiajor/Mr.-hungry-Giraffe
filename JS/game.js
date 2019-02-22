var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  score: 0,
  level: 0,
  gameOverInterval: undefined,
  foodImages: [
    ["popcorn.png","beer.png","bacon.png","hamburger.png", "vodka.png"],
    ["iceCream.png", "watermelon.png","avocado.png", "caiprinha.png"],
    ["egg.png", "burrito.png", "honey.png","Cookie.png", "aubergine.png", "sushi.png"],
    [ "Cookie.png", "avocado.png", "blueberrie.png","meat.png", "cheese.png"]
    
  ],
  backgroundImages: [
    "img/ironhack3.jpg",
    "img/beach3.jpeg",
    "img/snow3.jpeg",
  ],
  velocityFood: [-5, -5, -7],

  // loadedAudios.level1.play()

  init: function(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.w = window.innerWidth - 5;
    this.h = window.innerHeight - 5;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.framesCounter = 0;
    this.music = new Audio("music/music1.mp3");
    this.music2 = new Audio("music/music2.mp3");
    this.music3 = new Audio ("music/music3.mp3");

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
    this.music.play();
  },

  //reset all elements of the game tudo start in a clean state
  reset: function() {
    this.background = new Background(this);
    this.player = new Player(this);
    this.foods = [];
    this.level = 0;
    ScoreBoard.rectW = 10;
    this.scoreBoard = ScoreBoard;
    clearInterval(this.gameOverInterval)
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
      this.music.pause()
      this.music2.play()
      this.level = 1;
      this.scoreBoard.rectW = 10;
      this.foods = []; // food disapears in the following level
    } else if (this.scoreBoard.rectW >= 400 && this.level === 1) {
      this.music2.pause()
      this.music3.play()
      this.level = 2;
      this.scoreBoard.rectW = 10;
      this.foods = [];
    } else if (this.scoreBoard.rectW >= 400 && this.level === 2) {
      this.level = 3;
      this.music3.pause()

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
          } else if (food.img.src.includes("aubergine.png")) {
            console.log("aubergine!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("nuts.png")) {
            console.log("nuts!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("blueberrie.png")) {
            console.log("blueberrie!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("popcorn.png")) {
            console.log("Popcorn!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("caiprinnha.png")) {
            console.log("Popcorn!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("watermelon.png")) {
            console.log("watermelon!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("beer.png")) {
            console.log("beer!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("vodka.png")) {
            console.log("vodka!!");
            this.scoreBoard.rectW += 100;
          } else if (food.img.src.includes("caiprinha.png")) {
            console.log("caipirinha!!");
            this.scoreBoard.rectW += 100;
          } else {                      //diminui el Scoreboard
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
    document.getElementsByClassName("gameOver")[0].style.display = "inline";

    this.gameOverInterval = setInterval(function(){
      document.getElementsByClassName("flexContainer")[0].style.background = `rgba(${Math.floor(Math.random() * 256) + 100},${Math.floor(Math.random() * 256) + 100},${Math.floor(Math.random() * 256) + 100}, 0.6)`
    }, 500)

  },

  

  stop: function() {
    clearInterval(this.interval);
  },

  nextLevel: function() {
    this.continue();
  }
};
