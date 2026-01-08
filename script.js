let count = 1;
console.log(count);
count = 2;
console.log(count);

// const user = {name : "Alice"};
// console.log(user);
// user.name = "Bob";
// console.log(user);

console.log(5 == "5");
console.log(5 === "5");

// Déclaration d'un objet

let user = {
    name: "Alice",
    age: 30,
    isAdmin: false
}

console.log(user);
console.log(user.name);

let fruits_array = ["lemon", "apple", "banana"];
for (let i = 0; i < fruits_array.length; i++) {
    console.log(fruits_array[i]);
}

fruits_array.forEach(function(fruit) {
    console.log(fruit);
});