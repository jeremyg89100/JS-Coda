const liste = document.querySelector("#choixPerso");

// Initialisation de skinPath
let skinPath;

// Boucle qui parcoure toutes les images présentes dans assets
for (let i = 1; i <= 29; i++) {
  const img = new Image();
  img.src = `assets/${i}.png`;

  const canvas = document.createElement("canvas"); // Création canvas

  img.onload = () => {
    canvas.width = 64;
    canvas.height = 64;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      0,
      128,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    // ctx.drawImage(img, coordonée x du coin supérieur gauche, coordonnée y du coin supérieur gauche,
    // largeur de la zone de l'image, hauteur de la zone de l'image, coordonnée x où coller l'image,
    //  coordonnée y où coller l'image, largeur de l'image, hauteur de l'image)

    canvas.appendChild(img);
    liste.appendChild(canvas);

    // Ecouteur placé pour récupérer le skin au clic
    canvas.addEventListener("click", function () {
      skinPath = `assets/${i}.png`;

      // Initialisation de la variable qui va récupérer tous les skins
      const getSkins = liste.querySelectorAll("canvas");

      // Boucle tous les skins et retire le css .sélection lors d'un clic
      getSkins.forEach(function (skins) {
        skins.classList.remove("selected");
      });

      // Ajoute le css .selected lors d'un clic
      canvas.classList.add("selected");
    });
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#skins");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // empêche le rechargement de la page

    // Récupère les valeurs, trim permet de retirer les espaces
    const pseudo = document.querySelector("#name").value.trim();
    const serverUrl = document.querySelector("#url").value.trim();

    // Message d'alerte si une ou plusieurs données ne sont pas présentes
    if (pseudo === "" || serverUrl === "" || skinPath === null) {
      const joinButton = document.querySelector("#joinButton");
      const alert = document.createElement("p");
      alert.textContent = "Erreur : information(s) manquante(s)";
      form.insertBefore(alert, joinButton);
      return;
    } else {
      window.location = "game.html";
    }

    let monStockage = localStorage;
    monStockage.setItem("name", pseudo); // Stock pseudo dans le storage
    monStockage.setItem("url", serverUrl);
    monStockage.setItem("click", skinPath);

    console.log(pseudo, serverUrl, skinPath);
  });
});
