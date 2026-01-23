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

    // Timer
    this.timer = document.createElement("h2");
    this.timer.className = "game-timer";
    const section = document.querySelector("#compteurPerso");
    section.appendChild(this.timer);

    // Compteur des joueurs encore en vie
    this.livingCounter = document.createElement("div");
    this.livingCounter.className = "compteurVivant";
    const compteur = document.querySelector("#compteurPerso");
    compteur.appendChild(this.livingCounter);

    // Classement joueurs vivant
    this.classement = document.createElement("div");
    const h2 = document.querySelector("#classement-container");
    this.classement.className = "game-classement";
    h2.appendChild(this.classement);

    // Classement joueurs morts
    this.classementDesMort = document.createElement("div");
    this.classementDesMort.className = "classementMort";
    const container = document.querySelector("#classement-container");
    container.appendChild(this.classementDesMort);

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
    this.timerStatus();
    this.classementPlayer();
    const players = this.game.infos.players;
    for (const id in players) {
      const player = players[id];

      if (!player.isDead) {
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
    let spriteWidth = 64;
    let spriteHeight = 64;

    // Débug inversion du sens de la marche
    let actualDirection = player.direction;
    if (player.direction === 1) {
      // East devient West
      actualDirection = 3;
    } else if (player.direction === 3) {
      // West devient East
      actualDirection = 1;
    }

    const deathSpriteCol = 20;
    const walkSpriteCol = 8;
    // Variable pour trouver le sprite de l'attaque
    const nombreColonne = 18;
    // Attack = 3456

    if (player.isDying || player.deathSpriteIndex > 0) {
      spriteX = player.deathSpriteIndex * spriteWidth;
      spriteY = deathSpriteCol * spriteHeight;
    } else if (player.isAttacking || player.attackSpriteIndex > 0) {
      spriteHeight = 192;
      spriteWidth = 192;
      spriteX = player.attackSpriteIndex * spriteWidth;
      spriteY = (actualDirection + nombreColonne) * spriteHeight;
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

    // Barre de vie
    const barWidth = 50;
    const barHeight = 5;
    const hpPercent = player.hp / player.maxHp;

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      x - barWidth / 2,
      y - 35,
      barWidth * hpPercent,
      barHeight,
    );

    // Nom player
    const nameChara = player.name;
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.textAlign = "center";
    this.ctx.fillText(nameChara, x, y - 40);
    // this.ctx.strokeText(nameChara, x, y - 40);
    this.ctx.font = "14px Arial";

    //Bar Cooldown attaque
    const maxAttackBarWidth = 50;
    const attackBarHeight = 5;
    const playerAttackBar =
      maxAttackBarWidth *
      (1 - player.currentAttackCooldown / player.attackCooldown);

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      x - playerAttackBar / 2,
      y - 30,
      playerAttackBar,
      attackBarHeight,
    );
  }
  timerStatus() {
    const minutes = Math.floor(this.game.infos.timer / 60);
    const secondes = Math.floor(this.game.infos.timer % 60);
    const timeString = `${minutes}:${secondes.toString().padStart(2, "0")}`;
    this.timer.textContent = `Temps de la partie : ${timeString}`;
  }

  classementPlayer() {
    const players = this.game.infos.players;

    let playerAlive = 0;
    let totalPlayer = 0;

    let playerArrayAlive = Object.values(players);
    let playerArrayDead = Object.values(players);

    playerArrayAlive.sort((a, b) => b.lvl - a.lvl);

    let classementHtml = "<h3> Classement :</h3>";
    let classementMort = "";

    // Compte les joueurs
    playerArrayAlive.forEach((player) => {
      totalPlayer++;
      if (!player.isDead) playerAlive++;
      classementHtml += `<p> ${player.name} : Level - ${player.lvl}</p>`;
    });

    playerArrayDead.forEach((player) => {
      if (player.isDead) classementMort += `<p> ${player.name} : Mort </p>`;
    });

    const counterHtml = `<h3> Joueurs restants : ${playerAlive} / ${totalPlayer} </h3>`;
    this.livingCounter.innerHTML = counterHtml;

    this.classement.innerHTML = classementHtml;
    this.classementDesMort.innerHTML = classementMort;
  }
}
