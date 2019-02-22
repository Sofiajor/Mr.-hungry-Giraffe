window.onload = function() {
  Game.init("canvas");



}


//DOM 
hola = function() {
  //document.getElementById('canvas').style.display = "none"
  document.getElementsByClassName("game")[0].style.display = "none"
  console.log("holiiiiiiiii")
  Game.start()
}


adios = function() {
  document.getElementsByClassName("gameOver")[0].style.display = "none"
  Game.init("canvas");
  Game.start()
  this.music3.pause()
}
pepe = function(){

  var div = document.getElementById("sopa"); 
  // console.dir(div)

    if(div.className.includes("desaparecer")){
      div.classList.remove("desaparecer")
    } else {
      div.classList.add("desaparecer")
    }
 }





 
