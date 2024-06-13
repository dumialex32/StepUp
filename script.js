document.addEventListener("DOMContentLoaded", () => {
  const carello = {
    scarpeAggiunte: [],
    totalePrezzo: 0,
  };

  const aggiungiBtn = document.getElementById("aggiungi");
  const acquistaBtn = document.getElementById("acquista");

  aggiungiBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("e");

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

    calcolaPrezzoTotale(quantitaAquistitata) {
      return this.prezzo * quantitaAquistitata;
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
                  <button class="btn btn-primary mt-2">Aggiungi</button>
                  </div>
        </div>
      </div>
    `;

    return card;
  }

  function stampa() {
    const scarpe = document.getElementById("scarpe");
    scarpe.innerHTML = "";
    listaScarpe.forEach((scarpa) => {
      card = createCard(scarpa);

      scarpe.appendChild(card);
    });
  }

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
    const { marca, modello, prezzo, url } = prendiValoriInput();
    console.log(marca, modello, prezzo, url);

    if (marca && modello && prezzo && url) {
      const scarpaNuova = new Scarpa(marca, parseFloat(modello), +prezzo, url);
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
          scarpa.url
        );
      });
    }
  }

  prendiScarpe();
  stampa();
});
