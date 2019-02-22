function Food(game, images, velocityFood) {
  this.game = game;

  //size-measure of the food
  this.w = 150;
  this.h = 150;

  //speed of food moving down
  this.dy = velocityFood;

  //propriedade de food -> food = false
  this.collition = false;

  // where the food falls down widthwise
  this.x = Math.floor(Math.random() * this.game.w);

  //where the food falls down heightwise !!DONT FORGET TO PHOTOSHOP PICTURES SO THE SIZE FITS BETTER AND CHANGE THIS.Y TO = 0
  this.y = -50;

  this.images = images;

  //creates image
  this.img = new Image();

  //chooses random food Images
  this.img.src = "img/" + images[Math.floor(Math.random() * images.length)];

  //draws food
  Food.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  //moves food
  Food.prototype.move = function() {
    this.y -= this.dy;
  };
}
