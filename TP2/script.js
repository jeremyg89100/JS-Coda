// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
    // Générer une note aléatoire entre 0 et note_maximum (inclus)
    let note = Math.floor(Math.random() * (note_maximum + 1));
    // Ajouter la note générée au tableau
    notes.push(note);
}

// Partie 1
note_minimal = notes[0];
note_maximale = notes[0];
for (let i = 0; i < taille; i++) {
    console.log(notes[i]);
    //Calcul de la note minimale
    if (note_minimal > notes[i]) {
        note_minimal = notes[i]
    }
    // Calcul de la note maximale
    if (note_maximale < notes[i]) {
        note_maximale = notes[i];
    }
}
console.log( "La taille du tableau est : ", taille);
console.log("La note minimale est : ", note_minimal);
console.log("La note maximale est : ", note_maximale);

// Partie 2
console.log("Partie 2");
note_minimal = notes[0];
index = 0;
for (let i = 0; i < taille; i++) {
    console.log(notes[i]);
    //Calcul de la note minimale et son index
    if (note_minimal > notes[i]) {
        note_minimal = notes[i];
        index = i;
    }
}

console.log("Index : ",index,"Note minimale = " ,note_minimal);

// Partie 3

console.log("Partie 3");

note_minimal = notes[0];
stockage = 0;
for (let i = 0; i < taille; i++) {
    console.log(notes[i]);
    if (note_minimal > notes[i]) {
        note_minimal = notes[i];
        // Echange de la note minimale avec la note de l'index 0
        stockage = notes[0];
        notes[0] = note_minimal;
        notes[i] = stockage;
    }
}

console.log("La note minimale est : ",note_minimal);
console.log("L'index 0 est : ",notes[0]);

// Partie 4 et 5, trier du plus petit au plus grand
let compteur_verification = 0;
let compteur_echange = 0;
console.log("Partie 4 et 5");
stockage = 0;
console.log("Avant : ", notes)
for (let i = 0; i < taille; i++) {
    let min_index = i;
    // Cherche la note la plus petite
    for (let j = i + 1 ; j < taille ; j++) {
        if (notes[j] < notes[min_index]) {
            min_index = j;
        }
    }
    //  Tri dans l'ordre croissant et incrémente le compteur d'échanges
    if (min_index !== i) {
        stockage = notes[i];
        notes[i] = notes[min_index];
        notes[min_index] = stockage;
        // Bonus 1
        compteur_echange++;
        console.log(notes);
    }
    compteur_verification++;
}
console.log("Après : ", notes);
// Bonus 2
console.log("Nombre de vérifications : ", compteur_verification);
console.log("Nombre d'échanges : ", compteur_echange);

// Bonus 3 tri du plus grand au plus petit
console.log("Bonus 3");
let compteur_verification_bonus = 0;
let compteur_echange_bonus = 0;
console.log("Avant : ", notes)
for (let i = 0; i < taille; i++) {
    let min_index = i;
    // Cherche la note la plus grande
    for (let j = i ; j < taille ; j++) {
        if (notes[j] > notes[min_index]) {
            min_index = j;
        }
    }
    // Tri dans l'ordre décroissant et incrémente le compteur d'échanges
    if (min_index !== i) {
        stockage = notes[i];
        notes[i] = notes[min_index];
        notes[min_index] = stockage;
        // Bonus 1
        compteur_echange_bonus++;
        console.log(notes);
    }
    compteur_verification_bonus++;
}
console.log("Après : ", notes);
// Bonus 2
console.log("Nombre de vérifications : ", compteur_verification_bonus);
console.log("Nombre d'échanges : ", compteur_echange_bonus);









