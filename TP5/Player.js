class Player {
  constructor(nom, seDeplace, attaque, mort, positionX, positionY, skin) {
    this.nom = nom;
    this.seDeplace = seDeplace;
    this.attaque = attaque;
    this.mort = mort;
    this.positionX = positionX;
    this.positionY = positionY;
    this.skin = skin;
  }
  updatePlayer(updateData) {
    this.seDeplace = updateData.seDeplace;
    this.attaque = updateData.attaque;
    this.mort = updateData.mort;
    this.positionX = updateData.positionX;
    this.positionY = updateData.positionY;
    this.currentHp = updateData.currentHp;
    this.attaque = updateData.attaque;
    this.level = updateData.level;
    this.cooldown = updateData.cooldown;
    this.vitesseDepla = updateData.vitesseDepla;
    this.regen = updateData.regen;
  }
}

const p1 = new Player("Jeremy", 1, false, false, false, 100, 100, "skin");

// document.addEventListener("keydown", function (event) {
//   if ((event.key = "s")) {
//     console.log("La touche S a été touché");
//   }
// });
