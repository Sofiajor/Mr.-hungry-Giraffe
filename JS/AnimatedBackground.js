function AnimatedBackgroundSprite(type, initialPosY) {
    let DOMElement = document.createElement("div")
    DOMElement.className = "sprite-" + type + " right";

    document.querySelector("body").appendChild(DOMElement)

    var posX = 0
    var posY = initialPosY
    var sense = 1

    setInterval(function () {
        if (posX > window.innerWidth) {
            sense = -1
            document.querySelector(".sprite-" + type).setAttribute("class", "sprite-" + type + " left")

        }

        if (posX < 0) {
            sense = 1
            document.querySelector(".sprite-" + type).setAttribute("class", "sprite-" + type + " right")
        }

        if (sense === 1) {
            posX++
        }   else {
            posX--
        }

        document.querySelector(".sprite-" + type).style.left = posX + "px"
        document.querySelector(".sprite-" + type).style.top = posY + "px"
    }, 10)
}

