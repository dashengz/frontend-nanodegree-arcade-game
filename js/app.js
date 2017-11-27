// Enemies our player must avoid
var Enemy = function (row, speed, delayed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = COL_WIDTH * (delayed ? -5 : -1);
    this.y = row * ROW_HEIGHT;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > COL_WIDTH * COL_LENGTH)
        this.resetEnemy();
};
Enemy.prototype.resetEnemy = function () {
    this.x = COL_WIDTH * (-1);
    this.speed += (Math.random() * 10);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-princess-girl.png';
    this.lifeCount = 3;
    this.score = 0;
    this.highScore = 0;
    this.timeLeft = TIME_LIMIT;
    this.startCountDown();
    this.resetPlayer();
};
Player.prototype.update = function (x, y) {
    if (x >= 0 && x < COL_WIDTH * COL_LENGTH) this.x = x;
    if (y >= 0 && y < ROW_HEIGHT * ROW_LENGTH) this.y = y;
};
Player.prototype.resetPlayer = function () {
    this.x = Math.floor(COL_LENGTH / 2) * COL_WIDTH;
    this.y = (ROW_LENGTH - 1) * ROW_HEIGHT;
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            this.update(this.x - COL_WIDTH, this.y);
            break;
        case 'right':
            this.update(this.x + COL_WIDTH, this.y);
            break;
        case 'up':
            this.update(this.x, this.y - ROW_HEIGHT);
            break;
        case 'down':
            this.update(this.x, this.y + ROW_HEIGHT);
            break;
    }
};
Player.prototype.renderStatus = function () {
    ctx.save();
    ctx.font = "20px monospace";
    ctx.fillStyle = "#666666";
    ctx.fillText("Time Left: " + this.timeLeft, 0, 20);
    ctx.restore();

    ctx.save();
    ctx.font = "20px monospace";
    ctx.fillStyle = this.lifeCount ? "#666666" : "#ff0000";
    ctx.fillText("Lives: " + this.lifeCount, 0, 40);
    ctx.restore();

    ctx.save();
    ctx.font = "20px monospace";
    ctx.fillStyle = "#666666";
    ctx.textAlign = "end";
    ctx.fillText("High Score: " + this.highScore.toLocaleString("en-US", { minimumIntegerDigits: 6 }), 505, 20);
    ctx.restore();

    ctx.save();
    ctx.font = "20px monospace";
    ctx.fillStyle = "#666666";
    ctx.textAlign = "end";
    ctx.fillText("Score: " + this.score.toLocaleString("en-US", { minimumIntegerDigits: 6 }), 505, 40);
    ctx.restore();
};
Player.prototype.startCountDown = function () {
    var p = this;
    var countDown = setInterval(function () {
        if (p.timeLeft > 0) p.timeLeft --;
        else clearInterval(countDown);
    }, 1000);
};

function createEnemies() {
    return [
        new Enemy(1, 125),
        new Enemy(1, 250, true),
        new Enemy(2, 150),
        new Enemy(3, 100)
    ];
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = createEnemies();
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
