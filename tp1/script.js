// Partie 1

const classe = "B1A";
let eleves = 27;
let ouverte = true;

console.log(classe);
console.log(eleves);
console.log(ouverte);

// Partie 2

let eleve1 = {
    prenom: "Jeremy",
    note_maths: 14,
    note_francais: 16
}

console.log(eleve1.prenom);

// Partie 3

let students = [
    {
        prenom: "Jeremy",
        note_maths: 14,
        note_francais: 16
    },

    {
        prenom: "Tom",
        note_maths: 15,
        note_francais: 12
    },

    {
        prenom: "Thomas",
        note_maths: 12,
        note_francais: 10
    }
]


for (i = 0; i < students.length; i++) {
    console.log(students[i].prenom);
}

// Partie 4

for (i = 0; i < students.length; i++) {
    let moyenne = (students[i].note_francais + students[i].note_maths) / 2;
    console.log(students[i].prenom, moyenne);
}

// Partie 5

for (i = 0; i < students.length; i++) {
    if ((students[i].note_francais + students[i].note_maths) / 2 < 10) {
    console.log(students[i].prenom, ": Refusé");
    } 
    else {
    console.log(students[i].prenom, ": Admis");
    }
}

// Partie 6

for (i = 0; i < students.length; i++) {
    if ((students[i].note_francais + students[i].note_maths) / 2 >= 16) {
    console.log(students[i].prenom, ": Très bien");
    } 
    else if ((students[i].note_francais + students[i].note_maths) / 2 >= 14)  {
    console.log(students[i].prenom, ": Bien");
    }
    else if ((students[i].note_francais + students[i].note_maths) / 2 >= 12)  {
    console.log(students[i].prenom, ": Assez Bien");
    }
    else if ((students[i].note_francais + students[i].note_maths) / 2 >= 10)  {
    console.log(students[i].prenom, ": Passable");
    }
    else if ((students[i].note_francais + students[i].note_maths) / 2 < 10)  {
    console.log(students[i].prenom, ": Insuffisant");
    }
}

// Partie 7

let count = 0;
let n = 0;
while (n < students.length) {
    if ((students[n].note_francais + students[n].note_maths) / 2 >= 10) {
        count++;
        console.log(count, " élèves sont admis.");
    }
    n++; // En dehors de la boucle pour bien commencer au premier élément
}

// Bonus
let moyenne_classe = 0;
for (i = 0; i < students.length; i++) {
    let moyenne_eleve = (students[i].note_francais + students[i].note_maths) / 2;
    moyenne_classe += moyenne_eleve;
}
console.log(moyenne_classe / i); // Division par i pour calculer la moyenne

// Bonus 2

students.push({prenom: "Antoine", note_maths: 16, note_francais: 17 });
nombre_eleve = 0;
for (i = 0; i < students.length; i++) {
    nombre_eleve++;
}

console.log("Il y a ", nombre_eleve, " élèves");

// Bonus 3

compteur = 0;
for (i = 0; i < students.length; i++) {
    if ((students[i].note_francais + students[i].note_maths) / 2 >= 10) {
        compteur++;
    }
}
if (compteur === students.length) {
    console.log("Félicitations tout le monde est passé !"); 
} 
