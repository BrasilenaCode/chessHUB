function submit(){
  var xhr = new XMLHttpRequest();
  var form = document.getElementById("form");
  var nome= form.elements["nome"].value;
  var cognome= form.elements["cognome"].value;
  var date= form.elements["data"].value;
  var nazionalita= form.elements["section1"].value;
  var url = 'http://localhost:8080/updateUtente';
  xhr.open("POST", url, true);
  var data = {
    key1: nome,
    key2: cognome,
    key3: date,
    key4: nazionalita
  };
  var jsonData = JSON.stringify(data);
  xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('utente_token'));
  xhr.setRequestHeader("Content-Type", "application/json");
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
  xhr.send(jsonData);
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
    var url = 'http://localhost:8080/updatePassword';
    xhr.open("POST", url, true);
    var data = {
        key1: oldPassword,
        key2: newPassword
    };
    var jsonData = JSON.stringify(data);
    xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('utente_token'));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        if(JSON.parse(xhr.responseText)) {
          resolve("ok");
        } else
          resolve("La vecchia password non è corretta");
      } else {
        reject(xhr.status);
      }
    };
    xhr.onerror = function () {
      reject("Errore di rete durante la richiesta");
    };
    xhr.send(jsonData);
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
  ["it", "Italia"],
  ["ad", "Andorra"],
  ["ae", "Emirati Arabi Uniti"],
  ["af", "Afghanistan"],
  ["ag", "Antigua e Barbuda"],
  ["ai", "Anguilla"],
  ["al", "Albania"],
  ["am", "Armenia"],
  ["ao", "Angola"],
  ["aq", "Antartide"],
  ["ar", "Argentina"],
  ["as", "Samoa Americane"],
  ["at", "Austria"],
  ["au", "Australia"],
  ["aw", "Aruba"],
  ["ax", "Isole Åland"],
  ["az", "Azerbaigian"],
  ["ba", "Bosnia ed Erzegovina"],
  ["bb", "Barbados"],
  ["bd", "Bangladesh"],
  ["be", "Belgio"],
  ["bf", "Burkina Faso"],
  ["bg", "Bulgaria"],
  ["bh", "Bahrein"],
  ["bi", "Burundi"],
  ["bj", "Benin"],
  ["bl", "Saint-Barthélemy"],
  ["bm", "Bermuda"],
  ["bn", "Brunei"],
  ["bo", "Bolivia"],
  ["bq", "Bonaire, Sint Eustatius e Saba"],
  ["br", "Brasile"],
  ["bs", "Bahamas"],
  ["bt", "Bhutan"],
  ["bv", "Isola Bouvet"],
  ["bw", "Botswana"],
  ["by", "Bielorussia"],
  ["bz", "Belize"],
  ["ca", "Canada"],
  ["cc", "Isole Cocos"],
  ["cd", "Repubblica Democratica del Congo"],
  ["cf", "Repubblica Centrafricana"],
  ["cg", "Congo"],
  ["ch", "Svizzera"],
  ["ci", "Costa d'Avorio"],
  ["ck", "Isole Cook"],
  ["cl", "Cile"],
  ["cm", "Camerun"],
  ["cn", "Cina"],
  ["co", "Colombia"],
  ["cr", "Costa Rica"],
  ["cu", "Cuba"],
  ["cv", "Capo Verde"],
  ["cw", "Curaçao"],
  ["cx", "Isola Christmas"],
  ["cy", "Cipro"],
  ["cz", "Repubblica Ceca"],
  ["de", "Germania"],
  ["dj", "Gibuti"],
  ["dk", "Danimarca"],
  ["dm", "Dominica"],
  ["do", "Repubblica Dominicana"],
  ["dz", "Algeria"],
  ["ec", "Ecuador"],
  ["ee", "Estonia"],
  ["eg", "Egitto"],
  ["eh", "Sahara Occidentale"],
  ["er", "Eritrea"],
  ["es", "Spagna"],
  ["et", "Etiopia"],
  ["fi", "Finlandia"],
  ["fj", "Figi"],
  ["fk", "Isole Falkland"],
  ["fm", "Micronesia"],
  ["fo", "Isole Fær Øer"],
  ["fr", "Francia"],
  ["ga", "Gabon"],
  ["gb", "Regno Unito"],
  ["gd", "Grenada"],
  ["ge", "Georgia"],
  ["gf", "Guyana Francese"],
  ["gg", "Guernsey"],
  ["gh", "Ghana"],
  ["gi", "Gibilterra"],
  ["gl", "Groenlandia"],
  ["gm", "Gambia"],
  ["gn", "Guinea"],
  ["gp", "Guadalupa"],
  ["gq", "Guinea Equatoriale"],
  ["gr", "Grecia"],
  ["gs", "Georgia del Sud e Isole Sandwich del Sud"],
  ["gt", "Guatemala"],
  ["gu", "Guam"],
  ["gw", "Guinea-Bissau"],
  ["gy", "Guyana"],
  ["hk", "Hong Kong"],
  ["hm", "Isole Heard e McDonald"],
  ["hn", "Honduras"],
  ["hr", "Croazia"],
  ["ht", "Haiti"],
  ["hu", "Ungheria"],
  ["id", "Indonesia"],
  ["ie", "Irlanda"],
  ["il", "Israele"],
  ["im", "Isola di Man"],
  ["in", "India"],
  ["io", "Territorio Britannico dell'Oceano Indiano"],
  ["iq", "Iraq"],
  ["ir", "Iran"],
  ["is", "Islanda"],
  ["je", "Jersey"],
  ["jm", "Giamaica"],
  ["jo", "Giordania"],
  ["jp", "Giappone"],
  ["ke", "Kenya"],
  ["kg", "Kirghizistan"],
  ["kh", "Cambogia"],
  ["ki", "Kiribati"],
  ["km", "Comore"],
  ["kn", "Saint Kitts e Nevis"],
  ["kp", "Corea del Nord"],
  ["kr", "Corea del Sud"],
  ["kw", "Kuwait"],
  ["ky", "Isole Cayman"],
  ["kz", "Kazakistan"],
  ["la", "Laos"],
  ["lb", "Libano"],
  ["lc", "Santa Lucia"],
  ["li", "Liechtenstein"],
  ["lk", "Sri Lanka"],
  ["lr", "Liberia"],
  ["ls", "Lesotho"],
  ["lt", "Lituania"],
  ["lu", "Lussemburgo"],
  ["lv", "Lettonia"],
  ["ly", "Libia"],
  ["ma", "Marocco"],
  ["mc", "Monaco"],
  ["md", "Moldavia"],
  ["me", "Montenegro"],
  ["mf", "Saint Martin"],
  ["mg", "Madagascar"],
  ["mh", "Isole Marshall"],
  ["mk", "Macedonia del Nord"],
  ["ml", "Mali"],
  ["mm", "Myanmar"],
  ["mn", "Mongolia"],
  ["mo", "Macao"],
  ["mp", "Isole Marianne Settentrionali"],
  ["mq", "Martinica"],
  ["mr", "Mauritania"],
  ["ms", "Montserrat"],
  ["mt", "Malta"],
  ["mu", "Mauritius"],
  ["mv", "Maldive"],
  ["mw", "Malawi"],
  ["mx", "Messico"],
  ["my", "Malesia"],
  ["mz", "Mozambico"],
  ["na", "Namibia"],
  ["nc", "Nuova Caledonia"],
  ["ne", "Niger"],
  ["nf", "Isola Norfolk"],
  ["ng", "Nigeria"],
  ["ni", "Nicaragua"],
  ["nl", "Paesi Bassi"],
  ["no", "Norvegia"],
  ["np", "Nepal"],
  ["nr", "Nauru"],
  ["nu", "Niue"],
  ["nz", "Nuova Zelanda"],
  ["om", "Oman"],
  ["pa", "Panama"],
  ["pe", "Perù"],
  ["pf", "Polinesia Francese"],
  ["pg", "Papua Nuova Guinea"],
  ["ph", "Filippine"],
  ["pk", "Pakistan"],
  ["pl", "Polonia"],
  ["pm", "Saint-Pierre e Miquelon"],
  ["pn", "Isole Pitcairn"],
  ["pr", "Porto Rico"],
  ["ps", "Territori Palestinesi"],
  ["pt", "Portogallo"],
  ["pw", "Palau"],
  ["py", "Paraguay"],
  ["qa", "Qatar"],
  ["re", "Réunion"],
  ["ro", "Romania"],
  ["rs", "Serbia"],
  ["ru", "Russia"],
  ["rw", "Ruanda"],
  ["sa", "Arabia Saudita"],
  ["sb", "Isole Solomon"],
  ["sc", "Seychelles"],
  ["sd", "Sudan"],
  ["se", "Svezia"],
  ["sg", "Singapore"],
  ["sh", "Sant'Elena, Ascensione e Tristan da Cunha"],
  ["si", "Slovenia"],
  ["sj", "Svalbard e Jan Mayen"],
  ["sk", "Slovacchia"],
  ["sl", "Sierra Leone"],
  ["sm", "San Marino"],
  ["sn", "Senegal"],
  ["so", "Somalia"],
  ["sr", "Suriname"],
  ["ss", "Sud Sudan"],
  ["st", "São Tomé e Príncipe"],
  ["sv", "El Salvador"],
  ["sx", "Sint Maarten"],
  ["sy", "Siria"],
  ["sz", "Swaziland"],
  ["tc", "Isole Turks e Caicos"],
  ["td", "Ciad"],
  ["tf", "Territori Francesi del Sud"],
  ["tg", "Togo"],
  ["th", "Thailandia"],
  ["tj", "Tagikistan"],
  ["tk", "Tokelau"],
  ["tl", "Timor Est"],
  ["tm", "Turkmenistan"],
  ["tn", "Tunisia"],
  ["to", "Tonga"],
  ["tr", "Turchia"],
  ["tt", "Trinidad e Tobago"],
  ["tv", "Tuvalu"],
  ["tw", "Taiwan"],
  ["tz", "Tanzania"],
  ["ua", "Ucraina"],
  ["ug", "Uganda"],
  ["um", "Isole minori esterne degli Stati Uniti d'America"],
  ["us", "Stati Uniti"],
  ["uy", "Uruguay"],
  ["uz", "Uzbekistan"],
  ["va", "Città del Vaticano"],
  ["vc", "Saint Vincent e Grenadine"],
  ["ve", "Venezuela"],
  ["vg", "Isole Vergini Britanniche"],
  ["vi", "Isole Vergini Americane"],
  ["vn", "Vietnam"],
  ["vu", "Vanuatu"],
  ["wf", "Wallis e Futuna"],
  ["ws", "Samoa"],
  ["ye", "Yemen"],
  ["yt", "Mayotte"],
  ["za", "Sudafrica"],
  ["zm", "Zambia"],
  ["zw", "Zimbabwe"]
]);

