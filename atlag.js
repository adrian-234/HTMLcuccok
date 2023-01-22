var kezdh;
var jegyek = [];
function szamol() {
    jegyek = [];
    var be = document.getElementById("atlagbe").value.split("	");
    const pljegy = Number(document.getElementById("pljegy").value);
    const cjegy = document.getElementById("cel").value;
    if (cjegy > pljegy) {
        alert("Lehetetlen, mert a plusz jegy kisebb, mint a cél átlag!");
        return ("");
    }
    for (let i = 0; i < be.length ; i++) {
        if (be[i].slice(1) == ".0") {
            if (be[i + 3] != "módosított") {
                for (let db = 0 ; db < Number(be[i]) ; db++) {
                    if (be[i - 2] != 0) {
                        jegyek.push(Number(be[i - 2]));
                    }
                }
            }
        }
    }
    kezdh = jegyek.length;
    while (Math.round(atlag(jegyek)) != cjegy) {
        jegyek.push(pljegy);
    }
}

function atlag(jegyek) {
    var szum = 0;
    for (let i = 0; i < jegyek.length; i++) {
        szum += jegyek[i];
    }
    return (szum / jegyek.length);
}

function load() {
    document.getElementById("kiiras").style.border = "1pt solid lightgrey";
    document.getElementById("kiiras_belso").style.opacity = "25%";
    document.getElementById("loader").style.display = "block";
    document.getElementById("loader").style.animation = "forog 3.5s cubic-bezier(0.165, 0.84, 0.44, 1)";
    setTimeout(loadp2,3000);
}
function loadp2() {
    document.getElementById("kiiras").style.border = "none";
    document.getElementById("loader").style.display = "none";
    document.getElementById("kiiras_belso").style.opacity = "100%";
    document.getElementById("output").innerHTML = jegyek.length - kezdh;
    document.getElementById("vatlag").innerHTML = atlag(jegyek).toPrecision(3);
}

var allapot = "csukva";
function kinyit() {
    const titles = Array.from(
        document.getElementsByClassName('navbar_choice_title')
      );

    if (allapot == "nyitva") {
        titles.forEach(box => {
            box.style.display = "inline";
          });
        document.getElementById("navbar").style.width= "160px";
    } else {
        titles.forEach(box => {
            box.style.display = "none";
          });
        document.getElementById("navbar").style.width= "28px";
    }
    
}
// matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
function atalakul() {
    if (allapot == "csukva") {
        document.getElementById("hamburger_2").style.width = "0px";
        document.getElementById("hamburger_1").style.transform = "matrix(0.6, -0.9, 0.9, 0.6, 0, 6)";
        document.getElementById("hamburger_3").style.transform = "matrix(0.6, 0.9, -0.9, 0.6, 0, -7)";
        allapot = "nyitva";
    } else {
        document.getElementById("hamburger_1").style.transform = "translateY(0px)";
        document.getElementById("hamburger_3").style.transform = "translateY(0px)";
        document.getElementById("hamburger_2").style.width = "25px";
        allapot = "csukva";
    }
}