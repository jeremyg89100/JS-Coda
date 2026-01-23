class GameController {
  constructor() {
    this.name = localStorage.getItem("name");
    this.serverUrl = localStorage.getItem("url");
    this.skinPath = localStorage.getItem("click");
    this.infos = new Game();
    this.gameView = new GameView(this);
    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    this.socket = new WebSocket(this.serverUrl);
    this.initInput();
    this.initSocket();

    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    // Variables pour calculer alpha
    this.lastServerUpdate = performance.now(); // Timestamp de la dernière mise à jour du serveur

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);
  }

  // === Main render loop ===
  loop(timestamp) {
    // Alpha se trouve entre 0 et 1, il avance entre deux ticks serveur
    let alpha = Math.min(
      (timestamp - this.lastServerUpdate) / this.SERVER_INTERVAL,
      1,
    );

    // Interpolation de tous les joueurs
    for (const id in this.infos.players) {
      const player = this.infos.players[id];
      player.interpolate(alpha);
    }

    // Request the next frame
    this.gameView.render();
    requestAnimationFrame(this.loop);
  }

  initSocket() {
    this.socket.onopen = () => {
      console.log("Connected to server");

      this.socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        this.infos.update(data);
        this.lastServerUpdate = performance.now();
        // console.log(data);
      };

      this.socket.send(
        JSON.stringify({ name: this.name, skinPath: this.skinPath }),
      );
      this.startInputSender();
    };
    // this.startInputSender();
  }

  initInput() {
    // Si les touches sont appuyées
    document.addEventListener("keydown", (event) => {
      if (event.key === "z") this.inputState.up = true;
      if (event.key === "s") this.inputState.down = true;
      if (event.key === "q") this.inputState.left = true;
      if (event.key === "d") this.inputState.right = true;
      if (event.key === "e") this.inputState.attack = true;
    });
    // Si les touches ne sont pas appuyées
    document.addEventListener("keyup", (event) => {
      if (event.key === "z") this.inputState.up = false;
      if (event.key === "s") this.inputState.down = false;
      if (event.key === "q") this.inputState.left = false;
      if (event.key === "d") this.inputState.right = false;
      if (event.key === "e") this.inputState.attack = false;
    });
  }

  startInputSender() {
    setInterval(() => {
      if (this.socket.readyState !== WebSocket.OPEN) return;

      // Initialisation de l'envoi d'un message au serveur si une touche est touchée
      const sendMessage = {
        type: "input",
        input: this.inputState,
      };

      // console.log("Envoi vers serveur:", structuredClone(sendMessage)); Ligne de débug

      // Envoi de la variable qui contient les event listener des touches
      this.socket.send(JSON.stringify(sendMessage));
    }, this.SERVER_INTERVAL);
  }
}

// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
new GameController();
