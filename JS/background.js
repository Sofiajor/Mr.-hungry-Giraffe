//This function mantains the background of the game
function Background(game) {
  this.game = game;

  this.img = new Image(); //native of JS, how to create an image

  this.x = 0; //position in 0/0
  this.y = 0;

  this.dx = 10; //velocity
}

//draws background
Background.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.game.canvas.width,
    this.game.canvas.height
  );
};
