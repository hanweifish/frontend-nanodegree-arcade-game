// Enemies our player must avoid
var random_y = function() {
    var y_ayyays = [60, 140, 220];
    var index = Math.floor((Math.random() * 3));
    randomy = y_ayyays[index];
    return randomy;
}

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = random_y();
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var speed = 100;
    this.x = this.x + dt * speed;
    if ((this.x < player.x + 70) && (this.x > player.x - 70) && (this.y == player.y)) {
        player = new Player;
        if (score.win > 0) {
            score.win--;
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function() {
    this.x = 200;
    this.y = 380; //140 or 220
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(keys) {
    //player reach the river
    if (this.y <= 0) {
        player = new Player;
        score.win++;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keys) {
    switch(keys) {
    case "up":
        if (this.y >= 60) {
            this.y = this.y - 80;
        }
        break;
    case "down":
        if (this.y < 320) {
            this.y = this.y + 80;
        }
        break;
    case "left":
        if (this.x > 0) {
            this.x = this.x - 100;
        }
        break;
    case "right":
        if (this.x < 400) {
            this.x = this.x + 100;
        }
        break;
    }
}


//Update the Score
var Score = function() {
    this.win = 0;
    this.lose = 0;
    this.name = "Wei Han";
}



Score.prototype.render = function() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.name,420,490);
    ctx.fillText("Win: " + this.win,420,515);
    ctx.fillText("Lose: " + this.lose,420,540);
}

var score = new Score;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var genallEnemies = function() {
    var enemy = new Enemy;
    allEnemies.push(enemy);
}


var updatedallEnemies = function() {
    if (allEnemies.length < 5) {
        genallEnemies();
        // console.log("array lenth" + allEnemies.length);
    }
    for (index = 0; index < allEnemies.length; index++) {
            // console.log(allEnemies[index].x);
            if (allEnemies[index].x > 500) {
                allEnemies[index].x = allEnemies[index].x - 600;
                allEnemies[index].y = random_y();;
            }
    }
};


setInterval(updatedallEnemies, 1000);


var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
