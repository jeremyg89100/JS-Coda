class Game {
  constructor() {
    this.isRunning = false;
    this.isOver = false;
    this.timer = 0;
    this.players = {};
  }
  update(gameStateFromServer) {
    this.timer = gameStateFromServer.timer;

    // Set assemble toutes les clés
    const id = new Set(Object.keys(gameStateFromServer.players));

    // Parcours tous les ids
    for (const playerId of id) {
      const playerData = gameStateFromServer.players[playerId];

      // Si le joueur existe, update les données du joueur
      if (this.players[playerId]) {
        this.players[playerId].update(playerData);
      } // Si il n'existe pas, crée le joueur
      else {
        this.players[playerId] = new Player(
          playerData.name,
          playerData.skinPath,
          playerData.position,
          playerId
        );
      }
    }
    // Parcours tous les ids des joueurs contenuent dans l'objet joueur
    for (const playerId of Object.keys(this.players)) {
      // Supprime le joueur si l'ensemble des Id n'a pas l'id du joueur
      if (!id.has(playerId)) {
        delete this.players[playerId];
      }
    }
  }
}

// Création d'un nouveau perso
const testCode = {
  isRunning: true,
  isOver: false,
  timer: 5,
  players: {
    "test-uuid-123": {
      name: "Gnieh",
      skinPath: "./assets/3.png",
      position: [0.5, 0.5],
      lvl: 2,
      hp: 80,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.25,
      direction: directions.east,
      isAttacking: false,
      isWalking: true,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
  },
};

// --------Test du code -------------

// Instance le jeu
const game = new Game();

// Mise à jour et création du joueur
game.update(testCode);

// Récupération du joueur
const gnieh = game.players["test-uuid-123"];

console.log("Le perso : ", gnieh);
console.log("Nom : ", gnieh.name);
console.log("Direction :", gnieh.direction);

for (let i = 0; i < 40; i++) {
  gnieh.animate();
  gnieh.isWalking = true;
  console.log("Walk Sprite Index", gnieh.walkSpriteIndex);
}
gnieh.isWalking = false;
for (let i = 0; i < 5; i++) {
  gnieh.animate();
  gnieh.isAttacking = true;
  console.log("Attack Sprite Index", gnieh.attackSpriteIndex);
}
testCode.players["test-uuid-123"].isWalking = false;
testCode.players["test-uuid-123"].isAttacking = true;
game.update(testCode);
console.log(testCode.players["test-uuid-123"].isWalking);
console.log(testCode.players["test-uuid-123"].isAttacking);
