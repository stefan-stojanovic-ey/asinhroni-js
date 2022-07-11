// Callback je funkcija koja je prosledjena kao argument drugoj funkciji
// i onda se ta cb funkcija poziva unutar prve funkcije
// primeri cb-ova su setTimeout(), addEventLitener(), forEach(), ...

// Callback funkcije se mogu koristiti u sinhronim i asinhronim funkcijama:

// sinhrona funkcija
function print(cb) {
  // asinhroni setTimeout
  setTimeout(() => cb(), 0);
}

print(() => console.log("This will print now")); // (2)
console.log("Hi there"); // (1)

//==================================================================

// sinhrona funkcija
function f(cb) {
  // sinhroni poziv cb
  cb();
}

f(() => console.log("This will print now")); // (1)
console.log("Hi there"); // (2)

//==================================================================
//==================================================================

// Hvatanje gresaka u asinhronim funkcijama

// Se ne radi na obican, sinhroni nacin
// Zato sto ce se "try, catch" blok izvrsiti pre nego sto se poziv iz asinhrone funkcije vrati
// I time, propusticemo priliku da handlujemo error:
function calcSquare(num, cb) {
  setTimeout(() => {
    if (typeof num !== "number") {
      throw new Error("First argument of type 'number' expected.");
    }

    const result = num * num;
    cb(result);
  }, 1000);
}

try {
  calcSquare("a string", (result) => console.log(result));
} catch (err) {
  console.log(`Caught error: ${err.message}`);
}

//==================================================================

// Da bi ovo radilo, mi bi smo unutar same cb funkcije morali da stavimo "try, catch"
// Jer se cb funkcija posle poziva, kada se timeout zavrsi i Call Stack je prazan
// Odnosno, kada je izvrsavanje celog naseg fajla gotovo:
function calcSquare(num, cb) {
  setTimeout(() => {
    try {
      if (typeof num !== "number") {
        throw new Error("First argument of type 'number' expected.");
      }
      const result = num * num;
      cb(result);
    } catch (err) {
      console.log(`Caught error: ${err.message}`);
    }
  }, 1000);
}

calcSquare("a string", (result) => console.log(result));

//==================================================================

// U kursu se pominje "error-first" callback
// Sada cemo napisati kod i ovako:

// callSquare funkcija prima "num" i "cb" funkciju
// CB(err, rez) funkcija handluje error ili daje rezultat
//  ako u setTimeout-u (asinhronom delu) dodje do error-a, cb se poziva sa err objektom i porukom
//      === err !== null, rez === undefined ===
//  ako nema errora, cb se poziva sa praznim errorom i rezultatom koji prikazuje
//      === err === null, rez !== undefined ===
function calcSquare(num, cb) {
  setTimeout(() => {
    if (typeof num !== "number") {
      cb(new Error("First argument of type 'number' expected."));
      return;
    }

    const result = num * num;
    cb(null, result);
  }, 1000);
}

calcSquare("a string", (err, result) => {
  if (err !== null) {
    console.warn(`Caught error: ${err.message}`);
    return;
  }

  console.log(result);
});

//==================================================================
//==================================================================

// Callback funkcije nisu citljive (callback hell)
// Ovo su samo 2 poziva sa GET requestom, gde trazimo ceo niz rasa pasa, a onda saljemo zahtev za jednu sliku specificne rase
// Samo da zamislimo 5, 10, ...

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://dog.ceo/api/breeds/list/all");
xhr.onreadystatechange = function () {
  if (this.readyState === this.DONE) {
    const res = JSON.parse(this.responseText);
    const breeds = Object.keys(res.message);
    const firstBreedOnList = breeds[0];

    const xhrDogPic = new XMLHttpRequest();

    xhrDogPic.open(
      "GET",
      `https://dog.ceo/api/breed/${firstBreedOnList}/images/random`
    );
    xhrDogPic.onreadystatechange = function () {
      if (this.readyState == this.DONE) {
        console.log(this.responseText);
      }
    };
    xhrDogPic.send(null);
  }
};
xhr.send(null);

//==================================================================

// callback hell sa ciltjivijim primerom
