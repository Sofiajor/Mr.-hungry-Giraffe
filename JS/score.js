//this literal mantains the marker of the game with its punctuation
var ScoreBoard = {
  rectW: 10,
  rectH: 35,

  update: function(score, ctx, game) {
    // score width = when it turns negative goes directly to 0
    var width = this.rectW;
    if (width < 0) width = 0;

    ctx.font = "30px sans-serif";
    ctx.fillStyle = "pink";
    ctx.fillText("score:", 50, 50);
    ctx.fillStyle = "black";
    ctx.fillRect(50, 60, 400, this.rectH);
    ctx.fillStyle = "pink  ";
    ctx.fillRect(50, 60, width, this.rectH);
    ctx.font = "90px Hanalei Fill";
    ctx.fillStyle = "black";
    ctx.fillText("Level:"+ game.level, 1000, 100);
    console.log(this.rectW);
    // console.log(ctx.fillrect)
  }
};
