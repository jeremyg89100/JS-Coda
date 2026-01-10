let eleves_minimum = 7;
let eleves_maximum = 10;
let taille =
  Math.floor(Math.random() * (eleves_maximum - eleves_minimum + 1)) +
  eleves_minimum;

// Déclarer le tableau pour stocker les notes
let nombreEleves = [];
let nomEleves = [
  "Jeremy",
  "Maxime",
  "Enzo",
  "Kenzo",
  "Johan",
  "Alice",
  "Marine",
  "Theo",
  "Thomas",
  "Alexis",
];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

function genererEleves() {
  // Génération d'élèves dans la boucle
  for (let i = 0; i < taille; i++) {
    let eleve = {
      prenom: " ",
      notesMaths: 0,
      notesFrancais: 0,
      notesHistoire: 0,
      moyenne: 0,
    };
    // Génération de note aléatoire entre 0 et 20
    const index = Math.floor(Math.random() * nomEleves.length);
    eleve.prenom = nomEleves[index];
    eleve.notesMaths = Math.floor(Math.random() * (note_maximum + 1));
    eleve.notesFrancais = Math.floor(Math.random() * (note_maximum + 1));
    eleve.notesHistoire = Math.floor(Math.random() * (note_maximum + 1));
    moyenne =
      (eleve.notesFrancais + eleve.notesMaths + eleve.notesHistoire) / 3;
    eleve.moyenne = moyenne;

    // Ajouter la note générée au tableau
    nombreEleves.push(eleve);
  }
  return nombreEleves;
}

// Stock le return dans nombre_classe
nombre_classe = genererEleves();

// Partie 2

function afficherEleves(tableau) {
  console.log("Avant tri :");
  let compteurEleve = 0;
  for (let i = 0; i < nombreEleves.length; i++) {
    console.log(nombreEleves[i].prenom, "-", nombreEleves[i].moyenne);
    compteurEleve++;
  }
  console.log("Nombre d'élèves:", compteurEleve);
}

// Partie 3

function trouverMoyenneMin(tableau, indexDepart) {
  let min = nombreEleves[indexDepart].moyenne;
  let index_min = indexDepart;
  for (let j = indexDepart + 1; j < taille; j++) {
    //Calcul de la note minimale
    if (min > nombreEleves[j].moyenne) {
      min = nombreEleves[j].moyenne;
      index_min = j;
    }
  }
  return index_min;
}

// Partie 4

function afficherMoyenneMin(tableau) {
  let moyenne_min = nombreEleves[0].moyenne;
  for (let i = 1; i < taille; i++) {
    //Calcul de la note minimale
    if (moyenne_min > nombreEleves[i].moyenne) {
      moyenne_min = nombreEleves[i].moyenne;
    }
  }
  console.log("Moyenne min:", moyenne_min);
}

function trouverMoyenneMax(tableau) {
  let moyenne_maximale = nombreEleves[0].moyenne;
  for (let i = 1; i < taille; i++) {
    //Calcul de la note minimale
    if (moyenne_maximale < nombreEleves[i].moyenne) {
      moyenne_maximale = nombreEleves[i].moyenne;
    }
  }
  console.log("Moyenne max:", moyenne_maximale);
  return moyenne_maximale;
}

function afficherDonnees(tableau) {
  afficherEleves(nombre_classe);
  afficherMoyenneMin(nombre_classe);
  trouverMoyenneMax(nombre_classe);
  triParSelection(nombre_classe);
}

// Partie 5

function swap(tableau, indexA, indexB) {
  let stockage = 0;
  eleve_min = nombreEleves[indexB];

  stockage = nombreEleves[indexA];
  nombreEleves[indexA] = eleve_min;
  nombreEleves[indexB] = stockage;
}

// Partie 6

function triParSelection(tableau) {
  let compteur_verification = 0;
  let compteur_echange = 0;
  console.log("Après tri :");
  for (let i = 0; i < taille; i++) {
    // Renvoie l'index de la moyenne minimum
    index_min = trouverMoyenneMin(nombre_classe, i);
    if (index_min !== i) {
      // Echange la valeur minimale
      swap(nombre_classe, i, index_min);
      compteur_echange++;
    }
    compteur_verification++;
    // Affichage des prénoms des élèves et leurs moyennes après tri
    console.log(nombreEleves[i].prenom, "-", nombreEleves[i].moyenne);
  }
  console.log("Nombre vérification :", compteur_verification);
  console.log("Nombre d'échanges :", compteur_echange);
}
// Partie 7

afficherDonnees(nombre_classe);
