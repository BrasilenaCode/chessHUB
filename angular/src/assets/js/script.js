function submit(){
  var xhr = new XMLHttpRequest();
  var form = document.getElementById("form");
  var nome= form.elements["nome"].value;
  var cognome= form.elements["cognome"].value;
  var data= form.elements["data"].value;
  var nazionalita= form.elements["section1"].value;
  var url = 'http://localhost:8080/updateUtente?nome=' + nome + '&cognome=' + cognome + '&data=' + data + '&nazionalita=' + nazionalita;
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('utente_token'));
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var response = JSON.parse(xhr.responseText);
    } else {
      console.error("Errore nella richiesta. Status: " + xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error("Errore di rete durante la richiesta.");
  };
  xhr.send();
}

function submitPassword() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var form = document.getElementById("form");
    var oldPassword = form.elements["oldpwd"].value;
    var newPassword = form.elements["pwd"].value;
    var rpPassword = form.elements["rppwd"].value;
    if (newPassword !== rpPassword) {
      resolve("Le password non coincidono");
      return;
    }
    var url = 'http://localhost:8080/updatePassword?oldpwd=' + oldPassword + '&pwd=' + newPassword;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('utente_token'));
    xhr.send();
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        if(JSON.parse(xhr.responseText))
          resolve("ok");
        else
          resolve("La vecchia password non è corretta");
      } else {
        reject(xhr.status);
      }
    };
  });
}
function dammiUtenteAcceduto() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/utente", true);
  xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('utente_token'));
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var utente = JSON.parse(xhr.responseText);
      document.getElementById("nome").value = utente.nome;
      document.getElementById("cognome").value = utente.cognome;
      var data = new Date(utente.dataNascita);
      var giorno = data.getDate();
      var mese = data.getMonth() + 1;
      var anno = data.getFullYear();
      var dataFormattata = anno + '-' + (mese < 10 ? '0' + mese : mese) + '-' + (giorno < 10 ? '0' + giorno : giorno);
      document.getElementById("data").value = dataFormattata;
      var elenco = document.getElementById("section1");
      let chiavi = Array.from(nationalities.keys());
      for (var i = 0; i < nationalities.size; i++) {
        var elementoLista = document.createElement("option");
        elementoLista.text = nationalities.get(chiavi[i]);
        elementoLista.value = chiavi[i];
        if (chiavi[i] == utente.nazionalita)
          elementoLista.setAttribute("selected", "selected");
        elenco.add(elementoLista);
      }
    } else {
      console.error("Errore nella richiesta. Status: " + xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error("Errore di rete durante la richiesta.");
  };
  xhr.send();
}

var nationalities= new Map([
  ["it", "Italia",],
  ["us", "Stati Uniti"],
  ["fr", "Francia"],
  ["es", "Spagna"],
  ["de", "Germania"],
  ["gb", "Regno Unito"],
  ["ru", "Russia"],
  ["cn", "Cina"],
  ["jp", "Giappone"],
  ["br", "Brasile"],
  ["ca", "Canada"],
  ["ma", "Marocco"],
  ["au", "Australia"],
  ["in", "India"],
  ["mx", "Messico"],
  ["kr", "Corea del Sud"],
  ["nl", "Paesi Bassi"],
  ["se", "Svezia"],
  ["ch", "Svizzera"],
  ["pl", "Polonia"],
  ["at", "Austria"],
  ["be", "Belgio"],
  ["no", "Norvegia"],
  ["dk", "Danimarca"],
  ["fi", "Finlandia"],
  ["ie", "Irlanda"],
  ["gr", "Grecia"],
  ["pt", "Portogallo"],
  ["tr", "Turchia"],
  ["cz", "Repubblica Ceca"],
  ["hu", "Ungheria"],
  ["ro", "Romania"],
  ["ar", "Argentina"],
  ["co", "Colombia"],
  ["za", "Sudafrica"],
  ["cl", "Cile"],
  ["id", "Indonesia"],
  ["ua", "Ucraina"],
  ["pe", "Perù"],
  ["ph", "Filippine"],
  ["sg", "Singapore"],
  ["il", "Israele"],
  ["eg", "Egitto"],
  ["my", "Malesia"],
  ["th", "Thailandia"],
  ["sa", "Arabia Saudita"],
  ["ae", "Emirati Arabi Uniti"],
  ["vn", "Vietnam"],
  ["ng", "Nigeria"],
  ["pk", "Pakistan"],
  ["bd", "Bangladesh"],
  ["ro", "Romania"],
  ["ir", "Iran"],
  ["au", "Australia"],
  ["ca", "Canada"],
  ["cn", "Cina"],
  ["fr", "Francia"],
  ["de", "Germania"],
  ["in", "India"],
  ["id", "Indonesia"],
]);

