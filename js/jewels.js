class Jewels {
  constructor(posY, type) {
    this.type = type
    this.node = document.createElement("img");

    if (type === "jewels"){
this.node.src = "./images/jewels.png";
    }else if(type === "jewels") {
        this.node.src = "./images/jewels.jpg";
    }
    gameBoxNode.append(this.node);

    this.x = -100;
    this.y = posY;
    this.width = 30;
    this.height = 30;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    // this.gravitySpeed = 1.8;
    // this.jumpSpeed = 30;
    this.speed = 1.8;
  }

 automaticMovement() {
    this.x += this.speed;
    this.node.style.left = `${this.x}px`;
  }
  
}
