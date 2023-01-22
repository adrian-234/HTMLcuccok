var images = ["h1.jpg","h3.jpg","h4.jpg", "h5.jpg", "h7.jpg", "h8.jpg", "h9.jpg", "h10.jpg"];
var activeImage = 0;        //az images listábán lévő kép indexe amely épp látszik 
var changeCall;
var position = "left";      //a toogle gomban a cucc helye és egyben azt is jelenti hogy aktív-e az auto play
var changeTime = 5000;
const countdown = document.getElementById("countdown");
const toogle = document.getElementById("toogle").firstElementChild;
const pasinp = document.getElementById("password");
var regbutton = document.getElementById("regbutton");
const icon = document.getElementById("theme");

if (window.localStorage.getItem("theme") != null) {
    document.body.classList.replace("light", window.localStorage.getItem("theme"));
    if (window.localStorage.getItem("theme") == "dark") {
        icon.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
    }
}

function change_image(be) {
    clearTimeout(changeCall);
    document.getElementById("circleContainer").childNodes[activeImage].style.transform = "scale(1)";
    if (activeImage + be < images.length && activeImage + be >= 0) {
        activeImage = activeImage + be;
        document.getElementById("image").src = "Css gyak/Kocsik/" + images[activeImage];
    } else if (activeImage + be < 0) {
        activeImage = images.length - 1;
        document.getElementById("image").src = "Css gyak/Kocsik/" + images[activeImage];
    } else if (activeImage + be >= images.length) {
        activeImage = 0;
        document.getElementById("image").src = "Css gyak/Kocsik/" + images[activeImage];
    }
    document.getElementById("circleContainer").childNodes[activeImage].style.transform = "scale(1.2)";
    if (position == "right") {
        changeCall = setTimeout(change_image, changeTime, 1);
        countdown.style.animationDelay = "0s";
        countdown.style.animationName = "none";
        countdown.offsetHeight;
        countdown.style.animationName = "shrink";
    }
}

// matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
function toogle_switch() {
    if (position == "left") {
        changeCall = setTimeout(change_image, changeTime + 500, 1);
        countdown.style.height = "12px";
        countdown.style.animationDelay = ".5s";
        countdown.style.animationName = "shrink";
        toogle.style.transform = "matrix(1.2, 0, 0, 1.2, 33, 0)";
        toogle.style.backgroundColor = "var(--enabled)";
        document.getElementById("toogle").style.backgroundColor = "var(--background-primary)";
        document.getElementById("circleContainer").style.display = "none";
        position = "right";
    } else {
        clearTimeout(changeCall);
        countdown.style.animationName = "none";
        countdown.style.height = "0px";
        toogle.style.transform = "translate(0px)";
        toogle.style.backgroundColor = "var(--disabled)";
        document.getElementById("toogle").style.backgroundColor = "var(--background-secondary)";
        document.getElementById("circleContainer").style.display = "flex";
        position = "left";
    }
}

function containerLoader() {
    const container = document.getElementById("circleContainer");
    for (let i = 0; i < images.length; i++) {
        let circle = document.createElement("div");
        circle.setAttribute("onclick","jumpTo(" + i +")");
        container.appendChild(circle);
    }
    document.getElementById("circleContainer").childNodes[0].style.transform = "scale(1.2)";
}

function jumpTo(be) {
    document.getElementById("circleContainer").childNodes[activeImage].style.transform = "scale(1)";
    activeImage = be;
    document.getElementById("image").src = "Css gyak/Kocsik/" + images[activeImage];
    document.getElementById("circleContainer").childNodes[activeImage].style.transform = "scale(1.2)";
}

function countdownStop() {
    if (position == "right") {
        clearTimeout(changeCall);
        countdown.style.animationPlayState = "paused";
    }
}

function countdownCont() {
    if (position == "right") {
        const speed = 800 / changeTime;
        const countdownWidth = countdown.offsetWidth;
        changeCall = setTimeout(change_image, countdownWidth / speed, 1);
        countdown.style.animationPlayState = "running";
    }
}

var allapot = "csukva";
function kinyit() {
    const titles = Array.from(
        document.getElementsByClassName('navbar_titles')
    );
    if (allapot == "nyitva") {
        titles.forEach(box => {
            box.style.display = "inline";
          });
        document.getElementById("navbar").style.width= "9rem";
    } else {
        titles.forEach(box => {
            box.style.display = "none";
          });
        document.getElementById("navbar").style.width= "2.5rem";
    }
    
}
// matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
function atalakul() {
    if (allapot == "csukva") {
        document.getElementById("hamburger_2").style.display = "none";
        document.getElementById("hamburger_1").style.transform = "matrix(1, 0.75, -0.75, 1, 0, 6)";
        document.getElementById("hamburger_3").style.transform = "matrix(1, -0.75, 0.75, 1, 0, 0)";
        document.getElementById("hamburger_2").style.width = "0px";
        allapot = "nyitva";
    } else {
        document.getElementById("hamburger_2").style.display = "block";
        document.getElementById("hamburger_1").style.transform = "translateY(0px)";
        document.getElementById("hamburger_3").style.transform = "translateY(0px)";
        document.getElementById("hamburger_2").style.width = "25px";
        allapot = "csukva";
    }
}

function changeTheme() {
    
    if (icon.innerHTML == '<i class="fa fa-sun-o" aria-hidden="true"></i>') {
        icon.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
        window.localStorage.setItem("theme", "dark");
        document.body.classList.replace("light", "dark");
    } else {
        icon.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
        window.localStorage.setItem("theme", "light");
        document.body.classList.replace("dark", "light");
    }
}

function showContent() {
    if (eyeicon.className == "fa-solid fa-eye") {
        pasinp.type = "text";
        eyeicon.className = "fa-solid fa-eye-slash";
    } else {
        pasinp.type = "password";
        eyeicon.className = "fa-solid fa-eye";
    }
}

function register() {
    if (regbutton.innerHTML == "Regisztrál") {
        regbutton.innerHTML = '<i class="fa-solid fa-check"></i>';
        regbutton.style.width = regbutton.offsetHeight;
        regbutton.style.borderRadius = "50%";
        regbutton.style.backgroundColor = "rgb(102 229 23)";
        regbutton.setAttribute("onclick", "");
        setTimeout(() => {
            regbutton.innerHTML = "Regisztrál";
            regbutton.style.width = "fit-content";
            regbutton.style.borderRadius = "6px";
            regbutton.style.backgroundColor = "var(--background-primary)";
            regbutton.setAttribute("onclick", "register()");
        }, 500);
        
    }
}

function test(be) {}