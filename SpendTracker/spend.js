var local = localStorage; // ezt majd le kell váltani szimpla localStorag-re
var types;
var spent;
var firstTime = true;
var canvas = document.querySelector("canvas").getContext("2d");
var budget = Number(local.budget);
var end;

function loadData() {
    if (firstTime) {
        //dátum nézés és reset ha kell
        var date = Date().slice(4,7);
        if (localStorage.lastLogin != undefined && localStorage.lastLogin != date) {
            for(let i = 0; types.length; i++) {
                localStorage.setItem(types[i], "0");
            }
        }
        localStorage.lastLogin = date;
    }

    if (localStorage.types == undefined) {
        types = ["Étel", "Szórakozás", "Számlák"]; //a kölönböző alpértelmezett kategóriák neve
    } else {
        types = localStorage.types.split(",");
    }
    spent = 0;
    //spent számítás
    //nagyon csúnya csak lusta voltam
    document.getElementById("categories").innerHTML = "";
    document.getElementById("selection").innerHTML = '<option value="error">Kategória</option>';
    for(let i = 0; i < types.length; i++) {
        spent += Number(localStorage.getItem(types[i]));
        document.getElementById("categories").innerHTML += '<p>' + types[i]+': <span id=' + types[i] +'>'+formatNumber(localStorage.getItem(types[i]))+'</span> Ft <button class="BTN delete" onclick="delet('+i+')"><i class="fa-solid fa-xmark"></i></button></p>';
        document.getElementById("selection").innerHTML +='<option value='+ types[i]+'>'+types[i]+'</option>';
    }
    document.getElementById("categories").innerHTML += '<input id="newcategory" type="text" placeholder="Új kategória">';

    var moneyleft = budget - spent;
    document.getElementById("moneyleftSpan").innerHTML = formatNumber(moneyleft.toString());

    if (firstTime) {
        firstTime = false;
        loadCanvas(spent);
        document.getElementById("budgetSpan").value = budget;
    }
    
    
}

document.getElementById("newSpend").addEventListener("click", function openForm() {
    document.getElementById("btn_form").style.marginLeft = "0px";
    document.getElementById("btn_form").style.width = "100%";

    if (screen.width >= 450) {
        document.getElementById("btn_form").style.height = "48px";
    } else { //telefonra
        document.getElementById("btn_form").style.height = "100px";
        document.getElementById("saveBTN").style.top = "58px";
        document.getElementById("cancelBTN").style.top = "58px";
    }

    document.getElementById("btn_form").style.boxShadow = "0px 0px 0px 0px black";
    document.getElementById("btn_form").style.transform = "translateY(3px)";

    document.getElementById("newSpend").style.display = "none";

    document.getElementById("form").style.display = "flex";
})
function closeForm() {
    document.getElementById("selection").value = "error";
    document.getElementById("moneyinput").value = "";
    document.getElementById("btn_form").style.marginLeft = "calc(100% - 110px)";
    document.getElementById("btn_form").style.width = "110px";
    if (screen.width >= 450) {
        document.getElementById("btn_form").style.height = "37px";
    } else { //telefon
        document.getElementById("btn_form").style.height = "37px";
        document.getElementById("saveBTN").style.top = "9px";
        document.getElementById("cancelBTN").style.top = "9px";
    }
    document.getElementById("btn_form").style.boxShadow = "0px 6px 0px 0px black";
    document.getElementById("btn_form").style.transform = "translateY(0px)";
    document.getElementById("newSpend").style.display = "block";
    document.getElementById("form").style.display = "none";
}

document.getElementById("cancelBTN").addEventListener("click", closeForm)
document.getElementById("saveBTN").addEventListener("click", function save() {
    let type = document.getElementById("selection").value;
    let amount = Number(document.getElementById("moneyinput").value);
    if (type == "error") {
        alert("Nincs kiválasztva semilyen kategória sem.")
    } else if(amount == 0) {
        alert("Nem költöttél semmit?");
    } else if (amount < 0) {
        alert("Te kaptál pénzt?");
    } else{
        if (localStorage.getItem(type) != undefined) {
            localStorage.setItem(type, Number(localStorage.getItem(type)) + amount);
        } else {
            localStorage.setItem(type, amount);
        }
        document.getElementById(type).innerHTML = formatNumber(localStorage.getItem(type));
        moneyleft = budget - (spent+amount);
        document.getElementById("moneyleftSpan").innerHTML = formatNumber(moneyleft.toString());
        closeForm();
        updateCanvas(spent, spent+amount);
    }
})


function loadCanvas(spent) {
    end = 0.8 + 1.4 * (clamp(spent/budget,0,1));


    canvas.clearRect(0,0,300,300);


    canvas.lineWidth = 20;
    canvas.lineCap = "round";

    canvas.strokeStyle = "#c2c2c2";
    canvas.beginPath();
    canvas.arc(150, 150, 100, 0.80 * Math.PI, 0.20 * Math.PI);
    canvas.stroke();

    canvas.strokeStyle = "limegreen";
    canvas.beginPath();
    canvas.arc(150, 150, 100, 0.80 * Math.PI, end * Math.PI);
    canvas.stroke();
}

function updateCanvas(oldspent, newspent) {
    var increase = setInterval(() => {
        oldspent += budget / 100;
        if (oldspent >= newspent) {
            oldspent = newspent
            loadCanvas(oldspent);
            clearInterval(increase);
        }
        loadCanvas(oldspent)
    }, 20);
    spent = newspent;
}

document.getElementById("budgetSpan").addEventListener("dblclick", function readonlyToNot() {
    document.getElementById("budgetSpan").removeAttribute("readonly");
})

function budgetSave(key) {
    if(key == "Enter" && document.getElementById("budgetSpan").getAttribute("readonly") == null) {
        if (document.getElementById("budgetSpan").value > 0) {
            localStorage.setItem("budget", document.getElementById("budgetSpan").value);
            budget = localStorage.budget
            moneyleft = budget - spent;
            document.getElementById("moneyleftSpan").innerHTML = formatNumber(moneyleft.toString());
            loadCanvas(spent);
            document.getElementById("budgetSpan").setAttribute("readonly", true);
        } else {
            alert("Hogy negatív a havi limited?");
        }
        
    }
}

var editOn = false;
var gombok;
document.getElementById("editBTN").addEventListener("click", function editCategories() {
    gombok = document.getElementsByClassName("delete");
    if (!editOn) {
        editOn = true;
        document.getElementById("editBTN").innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
        document.getElementById("newcategory").style.display = "block";
        document.getElementById("newcategory").offsetHeight;
        document.getElementById("newcategory").style.transform = "scaleY(1)";
        for (let i= 0; i < gombok.length; i++) {
            gombok[i].style.display = "inline-block";
            gombok[i].offsetHeight;
            gombok[i].style.transform = "scale(1)";
        }
    } else {
        editOn = false;
        document.getElementById("editBTN").innerHTML = '<i class="fa-solid fa-pen"></i>';
        document.getElementById("newcategory").style.transform = "scaleY(0)";
        setTimeout(() => {
            document.getElementById("newcategory").style.display = "none";
        }, 500);
        for (let i= 0; i < gombok.length; i++) {
            gombok[i].style.transform = "scale(0)";
            setTimeout(() => {
                gombok[i].style.display = "none";
            }, 500);
        }

        //mentés rész
        if (document.getElementById("newcategory").value != "") {
            localStorage.setItem(document.getElementById("newcategory").value, "0");
            localStorage.setItem("types", types.concat(document.getElementById("newcategory").value));
            loadData();
        }
    }
    
})

function delet(inp) {
    localStorage.removeItem(types[inp]);
    types.splice(inp,1);
    localStorage.setItem("types", types);
    loadData();

    document.getElementById("newcategory").style.display = "block";
    document.getElementById("newcategory").offsetHeight;
    document.getElementById("newcategory").style.transform = "scaleY(1)";
    gombok = document.getElementsByClassName("delete");
    for (let i= 0; i < gombok.length; i++) {
        gombok[i].style.display = "inline-block";
        gombok[i].offsetHeight;
        gombok[i].style.transform = "scale(1)";
    }


    // editOn = false;
}


function formatNumber(number) {
    if (number != undefined) {
        for (let i = number.length-3; i > 0; i -= 3) {
            number = number.slice(0,i).concat(" ".concat(number.slice(i, number.length)));
        }
        return number;
    } else {
        return 0;
    }
    
}
function clamp(number, min, max) {
    if (number < min) {
        return min;
    } else if (number > max) {
        return max;
    } else {
        return number;
    }

}
