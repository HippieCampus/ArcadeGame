// Enemies our player must avoid
var Enemy = function(yPosition, speed) {
    this.x = -101;
    this.sprite = 'images/enemy-bug.png';
    this.xStep = 101;
    this.yStep = 60;
    this.y = yPosition + 55;
    this.rightBoundary = this.xStep * 5;
    this.restartPos = -this.xStep;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter which will
    // ensure the game runs at the same speed for all computers.
    if (this.x < this.rightBoundary) {
      this.x += this.speed * dt;
    } else {
      this.x = this.restartPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Random generator function
// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const enemy1 = new Enemy(0, getRandomInt(150, 300));
const enemy2 = new Enemy(83, getRandomInt(230, 320));
const enemy3 = new Enemy(166, getRandomInt(180, 205));

allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Player-related Code

class Player {
  constructor() {
    this.xStep = 101; // value to be used when moving on x-axis
    this.yStep = 83;  // vlaue to be used when moving on y-axis
    this.startPositionX = this.xStep * 2;
    this.startPositionY = (this.yStep * 4) + 55;
    this.x = this.startPositionX; // starting x coordinate
    this.y = this.startPositionY; // starting y coordinate
    this.sprite = 'images/char-boy.png';  // load sprite
    this.complete = false; //Win condition set to a default of false
  }

  // logPos() {
  //   console.log(this.x, this.y);
  // }

  // Everytime a key is pressed, update a variable. Add or subtract value
  // according to which key is pressed.
  // If value is exceeded, do not allow handleInput to increment or decrement position

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(input) {
    const rightBoundary = this.xStep * 4;
    const leftBoundary = 0;
    const topBoundary = 0;
    const bottomBoundary = this.yStep * 4;
    switch (input) {
      case 'ArrowRight':
        if (this.x < rightBoundary) {
          this.x += this.xStep;
        }
        break;
      case 'ArrowLeft':
        if (this.x > leftBoundary) {
          this.x -= this.xStep;
        }
        break;
      case 'ArrowUp':
      if (this.y > topBoundary) {
        this.y -= this.yStep;
      }
        break;
      case 'ArrowDown':
      if (this.y < bottomBoundary) {
        this.y += this.yStep;
      }

        break
    }
  }

  update() {
    for (let enemy of allEnemies) {

      if (this.y == enemy.y && this.x < enemy.x + enemy.xStep/1.5 &&
        this.x + this.xStep/1.5 > enemy.x) {
        this.reset();
      }
      if (this.y < 55) {
        this.complete = true;
      }
    }
  }

  reset() {
    this.x = this.startPositionX;
    this.y = this.startPositionY;
  }
}

// if (rect1.x < rect2.x + rect2.width &&
//    rect1.x + rect1.width > rect2.x

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();

// Event listeners


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        'ArrowLeft': 'ArrowLeft',
        'ArrowUp': 'ArrowUp',
        'ArrowRight': 'ArrowRight',
        'ArrowDown': 'ArrowDown'
    };
    // player.logPos();

    player.handleInput(allowedKeys[e.code]);
});
