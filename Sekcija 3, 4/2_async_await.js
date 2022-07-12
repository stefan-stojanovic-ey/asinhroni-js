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

//==================================================================
//==================================================================

//
// koristeci fetch API
function getRndDogPic() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((value) => console.log(value.message));
}

getRndDogPic(); // url slike
//

// koristeci async / await
async function getRndDogPic2() {
  // // ovako
  // const res = await fetch("https://dog.ceo/api/breeds/image/random")
  //   .then((response) => response.json())
  //   .then((value) => console.log(value.message));

  // ili ovako
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const value = await res.json();

  console.log(value.message);

  return res;
}

getRndDogPic2(); // url slike

//==================================================================
//==================================================================

// Handlovanje error-a unutar async / await funkcija

async function someFn() {
  // mozemo "try.. catch"
  try {
    const response = await fetch("https://some-site.com/wrong-url");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

someFn();

// posto async / await vraca promise, mozemo i .then() i .catch(),
// umesto "try..catch" bloka
async function someFn2() {
  return await fetch("https://some-site.com/wrong-url");
}

someFn2().catch((err) => console.log(err));

//==================================================================
//==================================================================

// Paralelno i sekvencijalno izvrsavanje funkcija sa async / await

function fnOne() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("1 is done");
      resolve(1);
    }, 1000);
  });
}

function fnTwo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("2 is done");
      resolve(2);
    }, 1000);
  });
}

// SEKVENCIJALNO
// console.log() ce sekvencijalno vratiti poruke, posle 1 sek za svaki poziv
// await ceka razresenje promise-a pre nego sto krene dalje
// funkcija je suspendovana na await-u koji ceka promise
async function sekvencijalno() {
  const num1 = await fnOne();
  const num2 = await fnTwo();

  console.log(num1, num2);
}

sekvencijalno();

// PARALELNO
async function paralelno() {
  const num1 = fnOne();
  const num2 = fnTwo();

  console.log(await num1, await num2);
}

paralelno();
