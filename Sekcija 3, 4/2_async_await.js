// async / await je sintaksa JS-a koja nam omogucava da asinhrone funkcije budu struktuirane (pisane) kao sinhrone
// async funkcije UVEK vracaju Promise
// Ako vrednost nije Promise, bice wrapovana oko Promise-a i vracena kao resolved Promise
async function hello() {
  return "Hello, Hal3000 :)";
}

console.log(hello());

// Ako je vrednost vec Promise, JS nece vrsiti nikakve transformacije nad vrednoscu
async function hello() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(5000), 5000);
  });
}

let var1 = hello();
// posle 5 sekundi
console.log(var1);

// Mozemo i dobiti rejected Promise, ako ga napravimo
async function hello() {
  return Promise.reject(404);
}

console.log(hello());

//==================================================================
//==================================================================

// await je deo async / await sintakse koja suspenduje izvrsavanje funkcije
// na tom mestu, dok se Promise ne resolvuje (rejected ili fulfilled)
function getSpecificNum() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(42), 2000);
  });
}

async function f() {
  const specNum = await getSpecificNum();
  console.log(specNum);
}

f();

// A mozemo i napisati funkciju sintaksom Promise-a
// Output ce biti identican
function f() {
  getSpecificNum.then((specNum) => console.log(specNum));
}

f();
