class Player {
  constructor(nom, positionX, positionY, skin) {
    this.nom = nom;
    this.positionX = positionX;
    this.positionY = positionY;
    this.skin = skin;
  }

  isWalking = true;
  walkSpriteDuration = 2;
  walkSpriteIndex = 0;
  walkSpriteNumber = 9;
  currentWalkSpriteStep = 0;
  attackingSpriteDuration = 2;
  attackingSpriteIndex = 0;
  attackingSpriteNumber = 6;
  currentAttackingSpriteStep = 0;
  currentDyingSpriteStep = 0;
  dyingSpriteDuration = 2;
  dyingSpriteIndex = 0;
  dyingSpriteNumber = 6;
  isAttacking = false;
  isDying = false;

  updatePlayer(updateData) {
    this.isWalking = updateData.isWalking;
    this.isAttacking = updateData.isAttacking;
    this.isDying = updateData.isDying;
    this.positionX = updateData.positionX;
    this.positionY = updateData.positionY;
    this.currentHp = updateData.currentHp;
    this.attaque = updateData.attaque;
    this.level = updateData.level;
    this.cooldown = updateData.cooldown;
    this.vitesseDepla = updateData.vitesseDepla;
    this.regen = updateData.regen;
  }
  deplacement() {
    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "s") {
        console.log("La touche S a été touché");
      } else if (event.key.toLowerCase() === "d") {
        console.log("La touche D a été touché");
      } else if (event.key.toLowerCase() === "q") {
        console.log("La touche Q a été touché");
      } else if (event.key.toLowerCase() === "z") {
        console.log("La touche Z a été touché");
      }
    });
  }
  // SpriteDuration = temps que le sprite va rester à l'écran, on veut 2 frames
  animate() {
    if (this.isWalking) {
      this.currentWalkSpriteStep++;
      if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
        this.currentWalkSpriteStep = 0;
        this.walkSpriteIndex++;
      }
      if (this.walkSpriteIndex >= this.walkSpriteNumber) {
        this.walkSpriteIndex = 0;
      }
    } else if (this.isAttacking) {
      this.currentAttackingSpriteStep++;
      if (this.currentAttackingSpriteStep >= this.attackingSpriteDuration) {
        this.currentAttackingSpriteStep = 0;
        this.attackingSpriteIndex++;
      }
      if (this.attackingSpriteIndex >= this.attackingSpriteNumber) {
        this.walkSpriteIndex = 0;
      }
    } else if (this.isDying) {
      this.currentDyingSpriteStep++;
      if (this.currentDyingSpriteStep >= this.dyingSpriteDuration) {
        this.currentDyingSpriteStep = 0;
        this.dyingSpriteIndex++;
      }
    } else {
      this.walkSpriteIndex = 0;
    }
    console.log("isWalking animation \n");
    console.log("isWalking = ", this.isWalking);
    console.log(
      "walkingSpriteIndex =",
      this.walkSpriteIndex,
      "/",
      this.walkSpriteNumber
    );
    console.log(
      "WalkingSpriteStep =",
      this.currentWalkSpriteStep,
      "/",
      this.walkSpriteDuration
    );
  }
}

const p1 = new Player("Jeremy", 0, 0, 1);

for (let i = 0; i < 10; i++) {
  p1.animate();
}

// Direction à définir pour le sprite de la marche
// walkSpriteDuration = 2 (le sprite se fait en 2 frames)
// WalkSpriteIndex = 0; s'update quand le perso marche
// WalkSpriteNumber = 9; (seulement pour la marche), à changer pour les autres animations
