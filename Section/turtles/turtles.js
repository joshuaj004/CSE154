/*
You will need to add a new turtle to the bottom of the page every time the user scrolls to the bottom. To add a turtle, append to document.body a new div with the class of turtle. (See next slide for more implementation details.)
 
 USE:
 document.onscroll:
    An event that occurs when the user moves the scrollbar.
document.body.scrollHeight:
    The height of the entire web page.
window.scrollY:
    The number of pixels that we have currently scrolled down from the top of the page.
window.innerHeight:
    The height of the visible area of the page currently on-screen.
*/

// on load of the page
window.onload = function() {
    // calls the turtle function
    document.onscroll = turtles;
    turtles(); // in case window height is initially taller than animals
};

function turtles() {
    while (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        var div = document.createElement("div");
        div.className = "turtle";
        document.body.appendChild(div);
    }
};