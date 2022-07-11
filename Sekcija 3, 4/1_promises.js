// Promise je specijalni JS objekat koji predstavlja eventualni rezultat (razresenje) neke asinhrone akcije
// Promise se ponasa kao "placeholder" za taj rezultat (kao obicna vrednost u JS-u)

// Promise ima 2 INTERNA svojstva:
//      PromiseStatus - status request-a (pending, fulfilled, rejected)
//      PromiseValue  - ako se uspesno izvrsi, ovde cemo dobiti rezultat

//      Promise status: pending
//          Ni rejected, ni fulfilled
//          PromiseValue ce biti undefined

//      Promise status: fulfilled
//          Request je izvrsen, rezultat je vracen, nema gresaka
//          PromiseValue: rezultar requesta

//      Promise status: rejected
//          Request je odbijen, rezultat sadrzi razlog
//          PromiseValue: razlog zasto je request odbijen (string)

//==================================================================
//==================================================================

// Pravljenje Promise-a u JS (i NodeJS-u)

// Promise se pravi pomocu "Promise" konstruktora, sa operatorom "new"
// Promise prihvata jedana argumenat, sto je executor funkcija koja prima 2 argumenta: resolve, reject
// Resolve i reject argumenti su same funkcije po sebi, i ako ih izvrsimo:
//         reslove("some value")    -->     PromiseStatus: fulfilled
//                                          PromiseValue:  "some value"

//         reject("some reason")    -->     PromiseStatus: rejected
//                                          PromiseValue: "some reason"
//                                          UncaughtError in Promise

// Kada se promise resi na jedan od 2 finalna statusa (resolved ili rejected), status mu se vise ne moze menjati
// Mozemo pozvati samo resolve ili reject jednom da razresimo status promise-a
// Pozivanje vise ovih funkcija ce biti ignorisano osim prve koja je promenila status promise-a
const smolPromise = new Promise((resolve, reject) => {
  // resolve("value");
  // reject("reason");
});

console.log(smolPromise);

//==================================================================
//==================================================================

// Citanje PromiseValue internog svojstva iz Promise-a

//  Interna svojstva znace da nisu kao svojstva obicnih objekata
//  Ne mozemo im direktno pristupiti, za to postoje metode Promise-a koje to rade (.then)

//  Promise je "then-able" objekat, sto znaci da ima metodu .then()
//  .then(onFulfilled, onRejected) prima 2 argumenta (2 callback funkcije):
//      onFulfilled(value)     -->     callback f-ja koja prima jedan argumenat, odnosno vrednost Promise-a
//      onRejected(reason)     -->     callback f-ja koja prima jedan argumenat, odnosno razlog odbijenog Promise-a
const bigPromise = new Promise((resolve, reject) => {
  // resolve("value"); // (val) => console.log(val));
  reject("reason"); // null, (reason) => console.log(reason)
});

bigPromise.then(null, (val) => console.log(val));

//==================================================================
//==================================================================

// Pisanje calculateSquare funkcije pomocu Promise-a

// Posto radimo sa promise-ima, ne pisemo cb funkciju
function calcSquare(num) {
  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof num !== "number") {
        reject(new Error("Expected first argument to be of type 'number'"));
      }

      const result = num * num;
      resolve(result);
    }, 1000);
  });
  return prom;
}

calcSquare(2).then((val) => console.log(`Success: ${val}`));
calcSquare("string").then(null, (val) => console.log(`Success: ${val}`));

//==================================================================
//==================================================================

// Kako da bilo koja funkcija u JS-u vraca Promise
// (Promissification)

function capitalizeWords(word) {
  return new Promise((resolve, reject) => {
    if (typeof word !== "string") {
      return reject(new Error("Argument must be of type `string`."));
    }

    console.log("It goes through here");
    const res = `${word[0].toUpperCase()}${word.substring(1)}`;
    console.log("it got here, too");
    return resolve(res);
  });
}

const cb = (val) => console.log(val);
capitalizeWords(1).then(null, cb);
capitalizeWords("what?").then(cb);

//==================================================================
//==================================================================

// Lancanje .then() metoda
