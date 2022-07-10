// koristimo commonJS modul za citanje fajlova sa kompjutera
// ovaj program sada moze da se pokrene u nodeJS-u

const { Console } = require("console");

function print1() {
  const num1 = 1;
  console.log(num1);
}

function print2() {
  function getNum2() {
    return 2;
  }

  const num2 = getNum2();
  console.log(num2);
}

function print3() {
  const fs = require("fs");

  fs.readFile("./num34.txt", "utf-8", (err, num3) => {
    try {
      if (err) throw err;
      console.log(num3);
    } catch (err) {
      console.log(err);
    }
    // print4();
  });
}

function print4() {
  const num4 = 4;
  console.log(num4);
}

print1();
print2();
print3();
// zakomentarisati ovaj poziv
// i staviti ga u callback readFile funkcije
print4();

// ako zelimo da popravimo ovo (da ide po redu),
// moramo poziv print4() funkcije staviti unutar callback-a fs.readFile() funkcije
// U tom slucaju, kada se callback izvrsi i istampa num3, poziv print4() ce se takodje uraditi
