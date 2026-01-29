class Robber {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "./images/robber.png";
    gameBoxNode.append(this.node);

    this.x = gameBoxNode.offsetWidth - 150;
    this.y = gameBoxNode.offsetHeight - 150;
    this.width = 50;
    this.height = 50;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.zIndex = 999
   // this.gravitySpeed = 1.8;
   // this.jumpSpeed = 30;
    this.speed = 20;
  }

  /*gravity() {
    this.y += this.gravitySpeed;
    this.node.style.top = `${this.y}px`;
  }*/

 /* jump() {
    if (this.y > 0){
    this.y -= this.jumpSpeed;
    this.node.style.top = `${this.y}px`;}
  }*/

  moveUp() {
    this.y -= this.speed;
    this.node.style.top = `${this.y}px`;
  }

  moveDown() {
    this.y += this.speed;
    this.node.style.top = `${this.y}px`;
  }
}

