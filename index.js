const striveUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiStriveKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzBlYjc5YzQ1ZjAwMTU2OWI0ZDQiLCJpYXQiOjE3Mjc0MjY3OTUsImV4cCI6MTcyODYzNjM5NX0.mNpmImp6UkNpaYq6NtNYgQ2diWZDVfah6CE1uF9kYZM";

const loadProd = function () {
  fetch(striveUrl, {
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
      const rowp = document.querySelector(".row");
      console.log(rowp);

      products.forEach((prod) => {
        const colCard = document.createElement("div");
        colCard.classList.add("col");
        colCard.style = "cursor: pointer";

        colCard.innerHTML = `
        <div class="card h-100 shadow">
                <img src="${prod.imageUrl}" class="card-img-top object-fit-md-cover object-fit-none" style="height: 12rem" />
                <div class="card-body d-flex flex-column justify-content-between">
                  <h5 class="card-title">${prod.name}</h5>
                  <div>
                      <p class="card-text">Price: ${prod.price} $</p>
                      <a href="#" class="btn btn-primary buy">Buy</a>
                      <a href="backoffice.html?prodId=${prod._id}" class="btn btn-warning edit">Edit</a>
                  </div>
                </div>
              </div>
        `;

        colCard.addEventListener("click", function () {
          window.location.href = `details.html?prodId=${prod._id}`;
        });

        rowp.appendChild(colCard);
      });
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

loadProd();
