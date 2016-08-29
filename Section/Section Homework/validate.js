 function checkFilled() {
    var aI = document.querySelectorAll("input");
    for (var i = 0; i < aI.length; i++) {
        aI[i].value == "" ? aI[i].style.backgroundColor = "red" : aI[i].style.backgroundColor = "";
    }
}

window.onload = function() {
    document.getElementById("validate").onclick = checkFilled;
};