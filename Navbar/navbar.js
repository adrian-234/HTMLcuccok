const icon = document.getElementById("theme");

if (window.localStorage.getItem("theme") != null) {
    document.body.classList.replace("light", window.localStorage.getItem("theme"));
    if (window.localStorage.getItem("theme") == "dark") {
        icon.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
    }
}

var allapot = "csukva";
function kinyit() {
    let navbar = document.getElementById("navbar");
    if (navbar.getAttribute("class") == null) {
        navbar.setAttribute("class", "open");
        allapot = "nyitva";
    } else {
        navbar.removeAttribute("class");
        allapot = "csukva";
    }
}

function changeTheme() {
    if (icon.innerHTML == '<i class="fa fa-sun-o" aria-hidden="true"></i>') { /*!!!!!*/
        icon.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
        window.localStorage.setItem("theme", "dark");
        document.body.classList.replace("light", "dark");
    } else {
        icon.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>'; /*!!!!!*/
        window.localStorage.setItem("theme", "light");
        document.body.classList.replace("dark", "light");
    }
}