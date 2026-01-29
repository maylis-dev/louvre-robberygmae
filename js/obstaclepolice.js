class Obstaclepolice {
  constructor(posY, type) {
    this.type = type
    this.node = document.createElement("img");
    if (type === "policeman"){
this.node.src = "./images/policeman.png";
    }else if(type === "tourist") {
        this.node.src = "./images/tourist.png";
    }
    
    gameBoxNode.append(this.node);

    this.x = -100;
    this.y = posY;
    this.width = 40;
    this.height = 40;

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
