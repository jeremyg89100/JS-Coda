// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let eleves_minimum = 7;
let eleves_maximum = 10;
let taille = Math.floor(Math.random() * (eleves_maximum - eleves_minimum + 1)) + eleves_minimum;

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
    "Alexis"
]

// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;
compteurEleve = 0;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
    // Générer une note aléatoire entre 0 et note_maximum (inclus)
    let eleve = {
        prenom: " ",
        notesMaths: 0,
        notesFrancais: 0,
        notesHistoire: 0,
        moyenne: 0
    }
    const index = Math.floor(Math.random() * (nomEleves.length));
        eleve.prenom = nomEleves[index];
        eleve.notesMaths = Math.floor(Math.random() * (note_maximum + 1));
        eleve.notesFrancais = Math.floor(Math.random() * (note_maximum + 1));
        eleve.notesHistoire = Math.floor(Math.random() * (note_maximum + 1));
        moyenne = ((eleve.notesFrancais + eleve.notesMaths + eleve.notesHistoire) / 3);
        eleve.moyenne = moyenne;


    // Ajouter la note générée au tableau
    nombreEleves.push(eleve);
    console.log(eleve.prenom , "-" ,eleve.moyenne);
}

// Partie 2

let min = nombreEleves[0].moyenne;
let moyenne_maximale = nombreEleves[0].moyenne;
let indexMin = 0;
for (let i = 1; i < taille; i++) {
    //Calcul de la note minimale
    if (min > nombreEleves[i].moyenne) {
        min = nombreEleves[i].moyenne
        indexMin = i;
    }
    // Calcul de la note maximale
    if (moyenne_maximale < nombreEleves[i].moyenne) {
        moyenne_maximale = nombreEleves[i].moyenne;
    }
}

console.log("Nombre d'élèves : ",taille);
console.log("moyenne minimale : ",min);
console.log("moyenne maximale : ",moyenne_maximale);

// Partie 3

console.log("Prénom :", nombreEleves[indexMin].prenom, "Moyenne minimale :", min ,"Index :", indexMin);

// Partie 4

console.log("Partie 4");

let stockage = 0;
eleve_min = nombreEleves[indexMin];

stockage = nombreEleves[0];
nombreEleves[0] = eleve_min;
nombreEleves[indexMin] = stockage;
    

console.log("L'index 0 est : ",nombreEleves[0]);

// Partie 5

let copie = [];
for (let i = 0; i < taille; i++){
    let student = {
        prenom: nombreEleves[i].prenom,
        notesMaths: nombreEleves[i].notesMaths,
        notesFrancais: nombreEleves[i].notesFrancais,
        notesHistoire: nombreEleves[i].notesHistoire,
        moyenne: nombreEleves[i].moyenne,
    }

    copie.push(student);
}

console.log("Partie 5");

let compteur_verification = 0;
let compteur_echange = 0;
console.log("Avant : ", nombreEleves);
for (let i = 0; i < taille; i++) {
    let min_index = i;
    // Cherche la note la plus petite
    for (let j = i + 1 ; j < taille ; j++) {
        if (copie[j].moyenne < copie[min_index].moyenne) {
            min_index = j;
        }
    }
    //  Tri dans l'ordre croissant et incrémente le compteur d'échanges
    if (min_index !== i) {
        stockage = copie[i];
        copie[i] = copie[min_index];
        copie[min_index] = stockage;
        // Bonus 1
        compteur_echange++;
        // console.log(nomEleves);
    }
    compteur_verification++;
}
console.log("Après : ", copie);

// Partie 6
console.log("Partie 6");
console.log("Nombre vérification :",compteur_verification);
console.log("Nombre d'échanges :",compteur_echange);




