// Current y-value of the ball
var ballY = 0;
// Current speed of the ball
var ballVelocity = 0;

// load the javascript window
window.onload = function() {
  // get the ball
  var ball = document.getElementById("ball");
  // put the ball at the top
  ball.style.top = ballY + "px";
  // center the ball in the box
  // 600/2 for the width, 40/2 for the size of the ball
  ball.style.left = 600/2 - 40/2 + "px";
  // call setInterval every 20 ms
  setInterval(update, 20);
};

// function updates the ball position
function update() {
  // gets the ball
  var ball = document.getElementById("ball");
  // puts the ball at whatever y height the ballY has
  ball.style.top = ballY + "px";
  //Chooses the minimum out of ballY+ballVelocity and 360
  ballY = Math.min(ballY + ballVelocity, 360);
  // Increase ball velocity by 1
  ballVelocity += 1;

  // detection for collision of bottom
  if (ballY >= 360) {
    // gives the ball 3/4 of the speed to bounce back up
    ballVelocity = parseInt(-3 * ballVelocity / 4);
  }
}