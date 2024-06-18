class Ocena {
    constructor(przedmiot, wartosc) {
      this.przedmiot = przedmiot;
      this.wartosc = wartosc;
    }
  }
  
  class Student {
    constructor(imie, nazwisko) {
      this.imie = imie;
      this.nazwisko = nazwisko;
      this._oceny = [];  
      this.sredniaOcen = 0;
    }
  
    hello() {
      return `Witaj ${this.imie} ${this.nazwisko}, Twoja średnia ocen to: ${this.sredniaOcen}`;
    }
  
    set ocena(ocena) {
      if (!(ocena instanceof Ocena)) {
        throw new Error("Nieprawidłowy typ danych. Oczekiwano obiektu klasy Ocena.");
      }
      this._oceny.push(ocena); 
      this.obliczSrednia();
    }
  
    get oceny() {
      if (this._oceny.length === 0) { 
        return "Brak ocen.";
      }
  
      return this._oceny.map(ocena => `Przedmiot: ${ocena.przedmiot} - ocena ${ocena.wartosc}`).join("\n");
    }
  
    obliczSrednia() {
      if (this._oceny.length === 0) {
        this.sredniaOcen = 0;
        return;
      }
  
      const sumaOcen = this._oceny.reduce((suma, ocena) => suma + ocena.wartosc, 0); 
      this.sredniaOcen = (sumaOcen / this._oceny.length).toFixed(2); 
    }
  }
    document.addEventListener('DOMContentLoaded', (event) => {
        const janKowalski = new Student("Jan", "Kowalski");
        janKowalski.ocena = new Ocena("Matematyka", 2);
        janKowalski.ocena = new Ocena("Język polski", 2);
        janKowalski.ocena = new Ocena("Historia", 3);
        janKowalski.ocena = new Ocena("Biologia", 3);
        janKowalski.ocena = new Ocena("Chemia", 3);
        janKowalski.ocena = new Ocena("Fizyka", 5);
        janKowalski.ocena = new Ocena("Geografia", 3);
        janKowalski.ocena = new Ocena("Angielski", 6);
    
      const studentInfoContainer = document.getElementById("student-info");
      const ocenyLista = document.getElementById("oceny-lista");
    
      if (studentInfoContainer && ocenyLista) { 
        const studentInfo = document.createElement("p");
        studentInfo.textContent = janKowalski.hello();
        studentInfoContainer.appendChild(studentInfo);
    
        janKowalski._oceny.forEach(ocena => { 
          const ocenaElement = document.createElement("li");
          ocenaElement.textContent = `Przedmiot: ${ocena.przedmiot} - ocena ${ocena.wartosc}`;
          ocenyLista.appendChild(ocenaElement);
        });
      } else {
        console.error("Nie znaleziono kontenera na informacje o studencie lub listę ocen.");
      }
    });
  