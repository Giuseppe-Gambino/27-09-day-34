const striveUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiStriveKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzBlYjc5YzQ1ZjAwMTU2OWI0ZDQiLCJpYXQiOjE3Mjc0MjY3OTUsImV4cCI6MTcyODYzNjM5NX0.mNpmImp6UkNpaYq6NtNYgQ2diWZDVfah6CE1uF9kYZM";

const addressBarContent = new URLSearchParams(location.search);

const prodId = addressBarContent.get("prodId");
console.log(prodId);

const loadProd = function () {
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
    .then((products) => {
      console.log("Dati ricevuti", products);
      const container = document.getElementById("conD");
      console.log(container);

      const card = document.createElement("div");
      card.classList.add("card");
      card.style = "max-width: 45rem";

      card.innerHTML = `
        <img src="${products.imageUrl}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${products.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong class="pe-2">Price:</strong>${products.price}$</li>
              <li class="list-group-item"><strong class="pe-2">Modello:</strong>${products.brand}</li>
              <li class="list-group-item">
                <strong class="pe-2">Dettagli:</strong> ${products.description}
              </li>
            </ul>
            <div class="card-body">
              <a href="#" class="btn btn-primary buy">Buy</a>
              <a href="#" class="btn btn-warning buy">Add to Cart</a>
            </div>
        `;

      container.appendChild(card);
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

loadProd();
