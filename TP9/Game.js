// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
  isRunning: true,
  isOver: false,
  timer: 190.6000000000091,
  players: {
    "3cd71bbb-6a6b-4d4e-80e3-107130328a27": {
      name: "blabla",
      skinPath: "./spritesheets/3.png",
      position: [0.5600000000000003, 0.17999999999999977],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 3,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
    "28ead291-fcea-4b41-a596-d3c876c49a53": {
      name: "bloublou",
      skinPath: "./spritesheets/4.png",
      position: [0.44, 0.19],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 0,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
  },
};

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

      // Ligne de débug du skinPath
      if (playerData.skinPath && !playerData.skinPath.startsWith("./")) {
        playerData.skinPath = "./" + playerData.skinPath;
      }

      // Si le joueur existe, update les données du joueur
      if (this.players[playerId]) {
        this.players[playerId].update(playerData);
      } // Si il n'existe pas, crée le joueur
      else {
        this.players[playerId] = new Player(
          playerId,
          playerData.name,
          playerData.skinPath,
          playerData.position || [0, 0],
        );
      }
    }
    // Parcours tous les ids des joueurs contenuent dans l'objet joueur
    for (const playerId of Object.keys(this.players)) {
      // Supprime le joueur si l'ensemble des Id n'a pas l'id du joueur
      if (!id.has(playerId)) {
        delete this.players[playerId];
      }
      // Ajout d'un joueur et test
      testCode.players["test-uuid-123"] = backendData.players[playerId];
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

// Récupération du joueur
const gnieh = game.players["test-uuid-123"];
