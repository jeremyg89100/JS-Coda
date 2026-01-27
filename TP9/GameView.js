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

    // Classement joueurs vivants
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
    console.log(this.game.infos.isOver);
    this.clear();
    this.drawBackground();
    this.timerStatus();
    this.classementPlayer();
    const players = this.game.infos.players;

    if (this.game.infos.isOver === true) {
      // Afficher uniquement le gagnant (le joueur encore vivant)
      for (const id in players) {
        const player = players[id];
        this.drawWinner(player);
      }
    } else {
      // Partie en cours : afficher tous les joueurs
      for (const id in players) {
        const player = players[id];
        player.animate();
        this.drawPlayer(player);
      }
    }
  }

  drawPlayer(player) {
    let skinPath = player.skinPath;
    let maudit = [26, 29, 24, 21, 18, 13, 7];
    const skinNumber = Number(player.skinPath.replace(/\D/g, ""));

    if (!skinPath.startsWith("./") && !skinPath.startsWith("http")) {
      // Débug du skinPath
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

    // let deathSpriteCol = 19;
    let walkSpriteCol = 8;
    // Variable pour trouver le sprite de l'attaque à 192px
    let nombreColonne = 18;

    if (player.isDying || player.deathSpriteIndex > 0 || player.hp <= 0) {
      spriteX = player.deathSpriteIndex * spriteWidth;
      spriteY = 20 * spriteHeight;
    } else if (player.isAttacking || player.attackSpriteIndex > 0) {
      if (maudit.includes(skinNumber)) {
        spriteWidth = 128;
        spriteHeight = 128;
        nombreColonne = 27;
      } else {
        spriteHeight = 192;
        spriteWidth = 192;
      }
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

    // Barre de vie (ne pas afficher si le joueur est mort)
    if (!player.isDying) {
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
      const levelChara = player.lvl;
      this.ctx.fillStyle = "white";
      this.ctx.lineWidth = 1;
      this.ctx.textAlign = "center";
      this.ctx.fillText(nameChara + "  Lvl " + levelChara, x, y - 40);
      this.ctx.font = "10px Arial";

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
  }
  timerStatus() {
    const minutes = Math.floor(this.game.infos.timer / 60);
    const secondes = Math.floor(this.game.infos.timer % 60);
    const timeString = `${minutes}:${secondes.toString().padStart(2, "0")}`;
    this.timer.textContent = `Temps de la partie : ${timeString}`;
  }

  classementPlayer() {
    const players = this.game.infos.players;

    let allPlayers = Object.values(players);

    // Séparer vivants et morts
    let playerArrayAlive = allPlayers.filter((player) => !player.isDying);
    let playerArrayDead = allPlayers.filter((player) => player.isDying);

    // Classe les joueurs par lvl (du plus grand au plus petit)
    playerArrayAlive.sort((a, b) => b.lvl - a.lvl);

    playerArrayDead.forEach((player) => {
      if (!player.deathTimestamp) {
        const minutes = Math.floor(this.game.infos.timer / 60);
        const secondes = Math.floor(this.game.infos.timer % 60);
        player.deathTimestamp = minutes * 60 + secondes; // Converti en secondes total
        player.playerTimer = `${minutes}:${secondes.toString().padStart(2, "0")}`;
      }
    });

    playerArrayDead.sort((a, b) => b.deathTimestamp - a.deathTimestamp);

    let classementHtml = "<h3> Classement :</h3>";
    let classementMort = "";

    // Compte tous les joueurs
    let totalPlayer = allPlayers.length;
    let playerAlive = playerArrayAlive.length;

    // Affiche seulement les vivants
    playerArrayAlive.forEach((player) => {
      classementHtml += `<p> ${player.name} : Level - ${player.lvl}</p>`;
    });

    // Affiche seulement les morts
    playerArrayDead.forEach((player) => {
      classementMort += `<p> ${player.name} : Mort ${player.playerTimer}</p>`;
    });

    const counterHtml = `<h3> Joueurs restants : ${playerAlive} / ${totalPlayer} </h3>`;
    this.livingCounter.innerHTML = counterHtml;

    this.classement.innerHTML = classementHtml;
    this.classementDesMort.innerHTML = classementMort;
  }

  drawWinner(player) {
    let skinPath = player.skinPath;

    // Correction du chemin si nécessaire
    if (!skinPath.startsWith("./") && !skinPath.startsWith("http")) {
      skinPath = "./" + skinPath;
    }

    // Chargement du skin si pas encore chargé
    if (!this.playerSkin[skinPath]) {
      this.playerSkin[skinPath] = new Image();
      this.playerSkin[skinPath].src = skinPath;
      return;
    }

    const skin = this.playerSkin[skinPath];

    // Position fixe à l'écran
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Sprite agrandi
    const spriteSize = 64;
    const scale = 8;
    const displayWidth = spriteSize * scale;
    const displayHeight = spriteSize * scale;

    const spriteX = 0;
    const spriteY = 128;

    // Dessin du personnage centré
    this.ctx.drawImage(
      skin,
      spriteX,
      spriteY,
      spriteSize,
      spriteSize,
      centerX - displayWidth / 2,
      centerY - displayHeight / 2,
      displayWidth,
      displayHeight,
    );

    // Texte victoire
    const victoire = "VICTOIRE !";
    this.ctx.fillStyle = "#FFD700";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 3;
    this.ctx.textAlign = "center";
    this.ctx.font = "bold 60px Arial";

    // Ombre sur texte victoire
    this.ctx.fillText(victoire, centerX, centerY - displayHeight / 2);
    this.ctx.strokeText(victoire, centerX, centerY - displayHeight / 2);

    // Nom du joueur
    const nameChara = player.name;
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 40px Arial";
    this.ctx.fillText(nameChara, centerX, centerY + displayHeight / 2 + 50);
    this.ctx.strokeText(nameChara, centerX, centerY + displayHeight / 2 + 50);
  }
}
