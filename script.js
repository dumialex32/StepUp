document.addEventListener("DOMContentLoaded", () => {
  const aggiungiBtn = document.getElementById("aggiungi");
  const totale = document.getElementById("totale");

  let prezzoTotale = 0;

  aggiungiBtn.addEventListener("click", (e) => {
    e.preventDefault();

    aggiungi();

    cancellaValoriInput();
  });

  class Scarpa {
    constructor(marca, modello, prezzo, url, quantita) {
      this.marca = marca;
      this.modello = modello;
      this.prezzo = +prezzo;
      this.url = url;
      this.quantita = quantita;
    }

    vizualizza() {
      return `La scarpa ${this.modello} di ${this.marca} costa €${this.prezzo}, ed è disponibile in ${this.quantita} pezzi.`;
    }
  }

  let listaScarpe = [
    new Scarpa("Nike", "Air Max", 120.0, "assets/img/airmax.jpeg", 10),
    new Scarpa("Adidas", "Ultraboost", 150.0, "assets/img/ultraboost.jpg", 5),
    new Scarpa("Puma", "Suede Classic", 80.0, "assets/img/puma.jpg", 20),
    new Scarpa("Reebok", "Classic Leather", 70.0, "assets/img/reebok.jpg", 15),
  ];

  function createCard(scarpa) {
    const card = document.createElement("div");
    card.className = "col-2";

    card.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${scarpa.url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${scarpa.modello}</h5>
          <p class="card-text">${scarpa.vizualizza()}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${scarpa.marca}</li>
          <li class="list-group-item">${scarpa.modello}</li>
          <li class="list-group-item">${scarpa.prezzo}€</li>
        </ul>
        <div class="card-body">
                  <p class="lead">Quantita: ${scarpa.quantita} ${
      quantita === 1 ? "pezzo" : "pezzi"
    }</p>
                  <a href="#" class="card-link">www.${scarpa.modello}.com</a>
                  <div>
                  <button class="btn btn-primary mt-2" id="acquista">Aggiungi</button>
                  </div>
        </div>
      </div>
    `;

    const button = card.querySelector(".btn-primary");
    button.addEventListener("click", (e) => {
      e.preventDefault();

      scegli(scarpa.prezzo);
    });

    return card;
  }

  function scegli(prezzoScarpa) {
    const totale = document.getElementById("totale");

    prezzoTotale += prezzoScarpa;

    totale.innerHTML =
      prezzoTotale > 0 ? `Il prezzo totale: ${prezzoTotale}` : "";
  }

  function stampa() {
    const scarpe = document.getElementById("scarpe");
    scarpe.innerHTML = "";
    listaScarpe.forEach((scarpa) => {
      const card = createCard(scarpa);

      scarpe.appendChild(card);
    });
  }

  document.querySelectorAll(".acquista-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("ok");
      e.preventDefault();
      aggiungiAlCarrello(e.target.dataset.modello);
    });
  });

  function prendiValoriInput() {
    const marca = document.getElementById("marca").value;
    const modello = document.getElementById("modello").value;
    const prezzo = +document.getElementById("prezzo").value;
    const url = document.getElementById("url").value;
    const quantita = document.getElementById("quantita").value;

    console.log(prezzo);
    return { marca, modello, prezzo, url, quantita };
  }

  function cancellaValoriInput() {
    document.getElementById("marca").value = "";
    document.getElementById("modello").value = "";
    document.getElementById("prezzo").value = "";
    document.getElementById("url").value = "";
    document.getElementById("quantita").value = "";
  }

  function aggiungi() {
    const { marca, modello, prezzo, url, quantita } = prendiValoriInput();
    console.log(marca, modello, prezzo, url);

    if (marca && modello && prezzo && url) {
      const scarpaNuova = new Scarpa(
        marca,
        modello,
        parseFloat(prezzo),
        url,
        quantita
      );
      console.log(scarpaNuova);

      listaScarpe.push(scarpaNuova);

      salva();
      stampa();
    }
  }

  function salva() {
    localStorage.setItem("scarpe", JSON.stringify(listaScarpe));
  }

  function prendiScarpe() {
    const data = localStorage.getItem("scarpe");

    if (data) {
      const parseListaScarpe = JSON.parse(data);

      listaScarpe = parseListaScarpe.map((scarpa) => {
        return new Scarpa(
          scarpa.marca,
          scarpa.modello,
          scarpa.prezzo,
          scarpa.url,
          scarpa.quantita
        );
      });
    }
  }

  prendiScarpe();
  stampa();
});
