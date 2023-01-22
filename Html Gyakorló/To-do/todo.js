var inputfield = "hidden";
var localS;
var itemCount;
var items;

function loadItems() {
    localS = window.localStorage;
    items = [];
    if (localS.getItem("todoList") != null) {
        items = localS.getItem("todoList").split("|");
    }
    
    let wrapper = document.getElementById("list_items_wrapper");
    wrapper.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        items[i] = items[i].split("$");
        let listItem = document.createElement("div");
        listItem.setAttribute("class", "list_items");
        for (let x = 0; x < items[i].length; x++) {
            let div = document.createElement("input");
            div.setAttribute("readonly", true);
            div.setAttribute("value", items[i][x])
            listItem.appendChild(div);
        }
        listItem.childNodes[0].setAttribute("type", "datetime-local");

        //törlés gomb
        let div = document.createElement("div");
        let ie = document.createElement("i");
        ie.setAttribute("class", "fa-solid fa-xmark");
        ie.setAttribute("onclick", "deleteItem(" + i + ", this)");
        div.appendChild(ie);

        //edit gomb
        ie = document.createElement("i");
        ie.setAttribute("class", "fa-solid fa-pencil");
        ie.setAttribute("onclick", "editItem(" + i + ", this)");
        div.appendChild(ie);
        listItem.appendChild(div);
        wrapper.appendChild(listItem)
    }
}

function changeMenu() {
    if (inputfield == "hidden") {
        document.getElementById("inputfield").style.height = "23px";
        document.getElementById("inputfield").style.transform = "translateY(0px)";
        document.getElementById("add_item_btn").style.fontSize = "23px";
        document.getElementById("add_item_btn").innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
        document.getElementById("cancel_item_btn").style.left = 'calc(100% - 68px)';
        inputfield = "active";
    } else {
        let time = document.getElementById("time").value;
        let place = document.getElementById("location").value;
        let job = document.getElementById("job").value;
        if (time == ""|| job == "") {
            if (time == "") {
                document.getElementById("time").style.boxShadow = "0px 0px 4px 2px var(--warning)";
            } 
            if (job == "") {
                document.getElementById("job").style.boxShadow = "0px 0px 4px 2px var(--warning)";
            }
            alert("Nincs minden adat megadva!");
        } else {
            document.getElementById("time").style.boxShadow = "none";
            document.getElementById("job").style.boxShadow = "none";
            addItem(time, place, job);
            closeMenu();
        }
    }
}

function addItem(time, place, job) {
    if (localS.getItem("todoList") == null) {
        localS.setItem("todoList", time + "$" + place + "$" + job);
    } else {
        localS.setItem("todoList", localS.getItem("todoList") + "|" + time + "$" + place + "$" + job);
    }
    loadItems();
}

function closeMenu() {
    document.getElementById("inputfield").style.height = "0px";
    document.getElementById("inputfield").style.transform = "translateY(-36px)";
    document.getElementById("add_item_btn").style.fontSize = "27px";
    document.getElementById("add_item_btn").innerHTML = '<i class="fa-solid fa-plus"></i>';
    document.getElementById("cancel_item_btn").style.left = 'calc(100% - 32px)';
    document.getElementById("time").value = ""
    document.getElementById("location").value = "";
    document.getElementById("job").value = "";
    inputfield = "hidden";
}

function deleteItem(id, obj) {
    let item = document.getElementById("list_items_wrapper").childNodes[id];
    let childs = item.childNodes;
    if (childs[0].getAttribute("readonly") != null) {     //kitörli  a local storageból a megadott bejegyzést
        items.splice(id, 1);
        items = items.join("|");
        items = items.replace(/,/g, "$");
        if (items == '') {
            localS.removeItem("todoList");
        } else {
            localS.setItem("todoList", items);
        }
        loadItems();
    } else {    //canceleli a felülírást
        for (let i = 0; i < 3; i++) {
            childs[i].setAttribute("readonly", true);
            childs[i].value = items[id][i];
        }
        childs[0].style.boxShadow = "none";
        childs[2].style.boxShadow = "none";
        item.lastChild.lastChild.setAttribute("class", "fa-solid fa-pencil");
    }
}

function editItem(id, obj) {
    let item = document.getElementById("list_items_wrapper").childNodes[id];
    let childs = item.childNodes;
    if (obj.getAttribute("class") == "fa-solid fa-pencil") {
        for (let i = 0; i < 3; i++) {
            childs[i].removeAttribute("readonly");
        }

        obj.setAttribute("class", "fa-solid fa-floppy-disk");
    } else if (childs[0].value == ""|| childs[2].value == "") {
        if (childs[0].value == "") {
            childs[0].style.boxShadow = "0px 0px 4px 1px var(--warning)";
        } 
        if (childs[2].value == "") {
            childs[2].style.boxShadow = "0px 0px 4px 1px var(--warning)";
        }
        alert("Nincs minden adat megadva!");
    } else {
        for (let i = 0; i < 3; i++) {
            childs[i].setAttribute("readonly", true);
        }

        obj.setAttribute("class", "fa-solid fa-pencil");

        childs[0].style.boxShadow = "none";
        childs[2].style.boxShadow = "none";

        let newItem = childs[0].value + "$" + childs[1].value + "$" + childs[2].value;
        items[id] = newItem;
        items = items.join("|");
        items = items.replace(/,/g, "$");
        localS.setItem("todoList", items);
        loadItems();
    }
}