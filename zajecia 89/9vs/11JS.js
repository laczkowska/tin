
function Auto(nazwa, rok, przebieg, cena_wyjsciowa) {
  this.nazwa = nazwa;
  this.rok = rok;
  this.przebieg = przebieg;
  this.cena_wyjsciowa = cena_wyjsciowa;

  this.obliczCeneKoncowa = function() {
    let cena = this.cena_wyjsciowa;
    const wiek = new Date().getFullYear() - this.rok;
    cena -= wiek * 1000;
    cena -= Math.floor(this.przebieg / 100000) * 10000;
    return cena;
  };

  this.cena_koncowa = this.obliczCeneKoncowa(); 

  this.zwiekszCene = function() {
    this.cena_wyjsciowa += 1000;
    this.przeliczCene();
  };

  this.obnizCeneZaRok = function() {
    const wiek = new Date().getFullYear() - this.rok;
    this.cena_koncowa -= wiek * 1000;
    this.aktualizujWiersz();
  };

  this.obnizCeneZaPrzebieg = function() {
    this.cena_koncowa -= Math.floor(this.przebieg / 100000) * 10000;
    this.aktualizujWiersz();
  };

  this.dopisujeDane = function(nowyPrzebieg, nowyRok) {
    this.przebieg = nowyPrzebieg;
    this.rok = nowyRok;
    this.przeliczCene();
  };

  this.przeliczCene = function() {
    this.cena_koncowa = this.obliczCeneKoncowa();
    this.aktualizujWiersz();
  };

  this.aktualizujWiersz = function() {
    const wiersz = document.getElementById(`wiersz-${this.nazwa}`);
    if (wiersz) {
      wiersz.cells[3].textContent = this.cena_wyjsciowa;
      wiersz.cells[4].textContent = this.cena_koncowa;
    }
  };
}

const samochody = [
  new Auto("Audi A4", 2020, 80000, 50000),
  new Auto("BMW 320i", 2018, 120000, 40000),
  new Auto("Mercedes C200", 2022, 30000, 65000),
  new Auto("Ford Focus", 2015, 180000, 25000),
  new Auto("Toyota Corolla", 2019, 95000, 48000),
  new Auto("Honda Civic", 2021, 5000, 72000),
  new Auto("Volkswagen Passat", 2017, 150000, 32000),
  new Auto("Volvo XC60", 2023, 10000, 80000),
];

function dodajSamochod() {
  console.log("Kliknięto przycisk Dodaj"); 

  const nazwa = document.getElementById("nazwa").value;
  const rok = parseInt(document.getElementById("rok").value);
  const przebieg = parseInt(document.getElementById("przebieg").value);
  const cena = parseInt(document.getElementById("cena").value);

  console.log("Pobrane wartości:", nazwa, rok, przebieg, cena); 

  const nowySamochod = new Auto(nazwa, rok, przebieg, cena);

  console.log("Cena końcowa:", nowySamochod.cena_koncowa); 

  if (nowySamochod.cena_koncowa > 10000) {
    samochody.push(nowySamochod);
    wyswietlTabele();
  } else {
    alert("Cena samochodu musi być większa niż 10000.");
  }
}

function wyswietlTabele() {
  const tabelaBody = document.getElementById("tabela-samochodow").getElementsByTagName('tbody')[0];
  tabelaBody.innerHTML = ''; 

  samochody.forEach((auto, index) => {
    const wiersz = tabelaBody.insertRow();
    wiersz.id = `wiersz-${auto.nazwa}`;

    wiersz.insertCell().textContent = auto.nazwa;
    wiersz.insertCell().textContent = auto.rok;
    wiersz.insertCell().textContent = auto.przebieg;
    wiersz.insertCell().textContent = auto.cena_wyjsciowa;
    wiersz.insertCell().textContent = auto.cena_koncowa;

    const komorkaPrzyciskow = wiersz.insertCell();
    komorkaPrzyciskow.innerHTML = `
      <button onclick="samochody[${index}].zwiekszCene()">Zwiększ cenę</button>
      <button onclick="samochody[${index}].obnizCeneZaRok()">Obniż za rok</button>
      <button onclick="samochody[${index}].obnizCeneZaPrzebieg()">Obniż za przebieg</button>
      <button onclick="pokazFormularzAktualizacji(${index})">Aktualizuj dane</button>
    `;
  });
}

function pokazFormularzAktualizacji(index) {
  const auto = samochody[index];
  const formularz = document.createElement('div');
  formularz.id = `formularz-${auto.nazwa}`;
  formularz.innerHTML = `
    <h3>Aktualizacja danych dla ${auto.nazwa}</h3>
    <label for="nowyPrzebieg-${index}">Nowy przebieg:</label>
    <input type="number" id="nowyPrzebieg-${index}" value="${auto.przebieg}"><br><br>
    <label for="nowyRok-${index}">Nowy rok:</label>
    <input type="number" id="nowyRok-${index}" value="${auto.rok}"><br><br>
    <button onclick="aktualizujDane(${index})">Zapisz</button>
  `;
  document.body.appendChild(formularz);
}

function zwiekszRokWszystkich() {
  samochody.forEach(auto => auto.rok++);
  samochody.forEach(auto => auto.przeliczCene());
  wyswietlTabele(); 
}

function aktualizujDane(index) {
  const auto = samochody[index];
  const nowyPrzebieg = parseInt(document.getElementById(`nowyPrzebieg-${index}`).value);
  const nowyRok = parseInt(document.getElementById(`nowyRok-${index}`).value);

  auto.dopisujeDane(nowyPrzebieg, nowyRok);
  wyswietlTabele(); 

  const formularz = document.getElementById(`formularz-${auto.nazwa}`);
  if (formularz) {
    document.body.removeChild(formularz);
  }
}

window.onload = wyswietlTabele;
