/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/


let poleReceptu = document.getElementById('recepty');

generovaniReceptu()

function vytvorRecept(i) {
    let recept = document.createElement('div');
    recept.classList.add('recept');

    let receptObrazek = document.createElement('div');
    receptObrazek.classList.add('recept-obrazek');

    let foto = document.createElement('img');
    foto.src = recepty[i].img;

    let receptInfo = document.createElement('div');
    receptInfo.classList.add('recept-info');

    let receptNazev = document.createElement('h3');
    receptNazev.textContent = recepty[i].nadpis;

    poleReceptu.appendChild(recept);
    recept.appendChild(receptObrazek);
    receptObrazek.appendChild(foto);
    recept.appendChild(receptInfo);
    receptInfo.appendChild(receptNazev);

    recept.addEventListener('click', () => {
        zobrazDetailReceptu(i);
    })
}

function generovaniReceptu() {
    for (i = 0; i < recepty.length; i++) {
        vytvorRecept(i);
    }
}

// vyhledávání
let vyhledavani = document.getElementById('hledat');

hledat.addEventListener("input", (e) => {
    let zadanyText = e.target.value.toLowerCase();
    poleReceptu.innerHTML = '';

    for (let i = 0; i < recepty.length; i++) {
        if (recepty[i].nadpis.toLowerCase().includes(zadanyText)) {
            vytvorRecept(i);
        }
    }
})

//filtrování podle kategorie jídla
let filterKategorie = document.getElementById('kategorie');

filterKategorie.addEventListener("input", (e) => {
    let vybranaKategorie = e.target.value;
    poleReceptu.innerHTML = '';

    for (let i = 0; i < recepty.length; i++) {
        if (recepty[i].kategorie.includes(vybranaKategorie)) {
            vytvorRecept(i);
        }
    }
})

//filtrování podle hodnocení
let filterHodnoceni = document.getElementById('razeni');

filterHodnoceni.addEventListener('input', (e) => {
    let vybraneHodnoceni = e.target.value;
    poleReceptu.innerHTML = '';

    if (vybraneHodnoceni == 1) {
        recepty.sort(function (a, b) {
            return b.hodnoceni - a.hodnoceni;
        })
        generovaniReceptu();
    }
    if (vybraneHodnoceni == 2) {
        recepty.sort(function (a, b) {
            return a.hodnoceni - b.hodnoceni;
        })
        generovaniReceptu();
    }
    if (vybraneHodnoceni == "") {
        generovaniReceptu();
    }
})

function zobrazDetailReceptu(i) {
    document.getElementById('recept-foto').src = recepty[i].img;
    document.getElementById('recept-foto').alt = 'Foto receptu';
    document.getElementById('recept-kategorie').innerHTML = recepty[i].kategorie;
    document.getElementById('recept-hodnoceni').innerHTML = recepty[i].hodnoceni;
    document.getElementById('recept-nazev').innerHTML = recepty[i].nadpis;
    document.getElementById('recept-popis').innerHTML = recepty[i].popis;
};
