class GameController {
  constructor() {
    this.name = localStorage.getItem("name");
    this.serverUrl = localStorage.getItem("url");
    this.skinPath = localStorage.getItem("click");
    this.infos = new Game();
    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    this.socket = new WebSocket(this.serverUrl);
    this.initSocket();
    this.initInput();

    this.startInputSender;

    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);
  }

  // === Main render loop ===
  loop(timestamp) {
    // Request the next frame
    requestAnimationFrame(this.loop);
  }

  initSocket() {
    this.socket.onopen = () => {
      console.log("Connected to server");

      this.socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        this.infos.update(data);
      };

      this.socket.send(
        JSON.stringify({ name: this.pseudo, skinPath: this.skinPath }),
      );

      this.startInputSender();
    };
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
