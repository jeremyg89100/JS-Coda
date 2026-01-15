const liste = document.querySelector("#choixPerso");
const taille = 64;
const cols = 20;
let skinPath;

for (let i = 1; i <= 29; i++) {
  const img = new Image();
  img.src = `assets/${i}.png`;

  // const label = document.createElement("label"); // Création label
  // const check = document.createElement("input"); // Création de l'input
  // check.type = "checkbox";

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
      canvas.height
    );
    // ctx.drawImage(img, coordonée x du coin supérieur gauche, coordonnée y du coin supérieur gauche,
    // largeur de la zone de l'image, hauteur de la zone de l'image, coordonnée x où coller l'image,
    //  coordonnée y où coller l'image, largeur de l'image, hauteur de l'image)
    canvas.append(img);
    liste.appendChild(canvas);

    canvas.addEventListener("click", function () {
      skinPath = `assets/${i}.png`;

      // Récupère tous les skins dans la variable getSkins
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
  const form = document.getElementById("skins");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // empêche le rechargement de la page

    const pseudo = document.getElementById("name").value.trim();
    const serverUrl = document.getElementById("url").value.trim();

    if (pseudo === "" || serverUrl === "" || skinPath === null) {
      alert("Erreur: information(s) manquante(s)");
    }

    let monStockage = localStorage;
    monStockage.setItem("name", pseudo); // Stock pseudo dans le storage
    monStockage.setItem("url", serverUrl);
    monStockage.setItem("click", skinPath);

    console.log(monStockage, pseudo, serverUrl, skinPath);
  });
});
