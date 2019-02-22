//main character of the game
function Player(game) {
  this.game = game;

  //Horizontal position  of the giraffe regarding the canvas (WIDTH)
  this.x = this.game.canvas.width / 2 - 150;

  //Vertical position of the giraffe regarding the canvas (HEIGHT)
  this.y0 = this.game.canvas.height / 2 + 5;

  // y0 = floor  y= player
  this.y = this.y0;

  this.img = new Image();
  this.img.src = "img/giraffe.png";

  this.img_flipped = new Image();
  this.img_flipped.src = "img/giraffe_flipped.png";

  //number of diferent images
  this.img.frames = 0;
  this.img.frameIndex = 0;

  //size-measure of the giraffe
  this.w = 200;
  this.h = 550;

  this.direction = "right"

  this.setListeners();
}

//Draws Giraffe
Player.prototype.draw = function() {
  if (this.direction === "left")    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  if (this.direction === "right")    this.game.ctx.drawImage(this.img_flipped, this.x, this.y, this.w, this.h);

};

//Giraffe moves left and right
Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === 37) this.moveGiraffeLeft();
    if (event.keyCode === 39) this.moveGiraffeRight();

  }.bind(this);
};
Player.prototype.moveGiraffeRight = function() {
  this.direction = "right"
  if (this.x + this.w < this.game.canvas.width) this.x += 20; //speed of the giraffe moving right
};
Player.prototype.moveGiraffeLeft = function() {
  this.direction = "left"
  if (this.x > 0) this.x -= 20; //speed of the giraffe moving left
};
