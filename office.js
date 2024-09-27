const striveUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiStriveKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzBlYjc5YzQ1ZjAwMTU2OWI0ZDQiLCJpYXQiOjE3Mjc0MjY3OTUsImV4cCI6MTcyODYzNjM5NX0.mNpmImp6UkNpaYq6NtNYgQ2diWZDVfah6CE1uF9kYZM";

const form = document.querySelector("form");

const addressBarContent = new URLSearchParams(location.search);

const prodId = addressBarContent.get("prodId");
console.log(prodId);

const inputName = document.getElementById("nameP");
const inputDescription = document.getElementById("description");
const inputBrandModel = document.getElementById("brandModel");
const inputImg = document.getElementById("img");
const inputPrice = document.getElementById("price");

// modifico i value
const loadValue = function () {
  fetch(striveUrl + "/" + prodId, {
    headers: {
      Authorization: `Bearer ${apiStriveKey}`,
    },
  })
    .then((response) => {
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }
      return response.json();
    })
    .then((product) => {
      console.log("Dati ricevuti", product);
      imgPrev = product.imageUrl;
      inputName.value = product.name;
      inputDescription.value = product.description;
      inputBrandModel.value = product.brand;
      inputImg.value = product.imageUrl;
      inputPrice.value = product.price;
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

let metodo = "POST";
let urlCustom = striveUrl;

if (prodId) {
  metodo = "PUT";
  urlCustom = striveUrl + "/" + prodId;
  loadValue();
}

console.log(inputName.value);

console.log(metodo);

// modifico o creo il prod
const loadProd = function (test) {
  fetch(urlCustom, {
    method: metodo,
    body: JSON.stringify(test),
    headers: {
      Authorization: `Bearer ${apiStriveKey}`,
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }
      return response.json();
    })
    .then((product) => {
      console.log("Dati ricevuti", product);
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

// classe del prodotto
class productClass {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const preName = inputName.value;
  const preDescription = inputDescription.value;
  const preBrandModel = inputBrandModel.value;
  const preImg = inputImg.value;
  const prePrice = inputPrice.value;
  console.log(preName);

  const test = new productClass(preName, preDescription, preBrandModel, preImg, prePrice);
  console.log(test);

  loadProd(test);
  if (!prodId) {
    form.reset();
  }
});

const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", () => {
  form.reset();
});

// mi serve per eliminare oggetti dal array nel server

const elimina = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${prodId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiStriveKey}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Oggetto eliminato con successo.");
      } else {
        console.log("Errore durante l'eliminazione dell'oggetto.");
      }
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", (e) => {
  elimina();
});
