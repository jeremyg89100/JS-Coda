// python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

class GameView {
  constructor(game) {
    this.game = game;
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // Chargement du fond
    this.background = new Image();
    this.background.src = "img/jsarena.jpg";
    this.background.onload = () => this.drawBackground();

    this.playerSkin = {};

    this.render();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawBackground() {
    this.ctx.drawImage(this.background, 0, 0, this.width, this.height);
  }

  render() {
    this.clear();
    this.drawBackground();
    const players = this.game.infos.players;
    for (const id in players) {
      const player = players[id];

      if (player != player.isDead) {
        player.animate();
        this.drawPlayer(player);
      }
    }
  }

  drawPlayer(player) {
    let skinPath = player.skinPath;

    // Débug du skinPath
    if (!skinPath.startsWith("./") && !skinPath.startsWith("http")) {
      skinPath = "./" + skinPath;
    }

    // Initialisation du skin du player
    if (!this.playerSkin[skinPath]) {
      this.playerSkin[skinPath] = new Image();
      this.playerSkin[skinPath].src = player.skinPath;
    }

    // Variable du skin du player
    const skin = this.playerSkin[skinPath];

    const x = player.renderX * this.width;
    const y = player.renderY * this.height;

    let spriteX = 0;
    let spriteY = 0;
    const spriteWidth = 64;
    const spriteHeight = 64;

    // Débug inversion du sens de la marche
    let actualDirection = player.direction;
    if (player.direction === 1) {
      // East devient West
      actualDirection = 3;
    } else if (player.direction === 3) {
      // West devient East
      actualDirection = 1;
    }

    const walkSpriteCol = 8;
    const attackSpriteCol = 55;
    if (player.isDying || player.deathSpriteIndex > 0) {
      spriteX = player.deathSpriteIndex * spriteWidth;
      spriteY = actualDirection * spriteHeight + spriteHeight * 4;
    } else if (player.isAttacking || player.attackSpriteIndex > 0) {
      spriteX = player.attackSpriteIndex * spriteWidth;
      spriteY =
        (actualDirection + attackSpriteCol) * spriteHeight + spriteHeight * 4;
    } else if (player.isWalking) {
      spriteX = player.walkSpriteIndex * spriteWidth;
      spriteY = (actualDirection + walkSpriteCol) * spriteHeight;
    } else {
      spriteX = 0;
      spriteY = actualDirection * spriteHeight;
    }

    this.ctx.drawImage(
      skin,
      spriteX,
      spriteY,
      spriteWidth,
      spriteHeight,
      x - spriteWidth / 2,
      y - spriteHeight / 2,
      spriteWidth,
      spriteHeight,
    );
  }
}
