const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width = 1024;
// canvas.height = 576;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./img/Pellet Town.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

image.onload = () => {
    animate();
};

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position;
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
};

const background = new Sprite({
    position: {x: -1205, y: -900},
    image: image
});

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },

    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

function animate(){
    window.requestAnimationFrame(animate);
    background.draw();
    c.drawImage(playerImage, 
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width / 4)/2, canvas.height/2 - playerImage.height / 2,
        playerImage.width/4,
        playerImage.height)

    if(keys.w.pressed && lastKey === 'w') background.position.y+= 2;
    else if(keys.a.pressed && lastKey === 'a') background.position.x+=2;
    else if(keys.s.pressed && lastKey === 's') background.position.y-=2;
    else if(keys.d.pressed && lastKey === 'd') background.position.x-=2;
}
animate()

let lastKey = '';

window.addEventListener('keydown', (e) => {
  
    switch(e.key){
        case "Up":
        case "ArrowUp":
        case "w":
        case "W":
            keys.w.pressed = true;
            lastKey = 'w';
            break
        case "Down":
        case "ArrowDown":
        case "s":
        case "S":
            keys.s.pressed = true;
            lastKey = 's';
            break
        case "Left":
        case "ArrowLeft":
        case "a":
        case "A":
            keys.a.pressed = true;
            lastKey = 'a';
            break
        case "Right":
        case "ArrowRight":
        case "d":
        case "D":
            keys.d.pressed = true;
            lastKey = 'd';
            break
    }

});

window.addEventListener('keyup', (e) => {
  
    switch(e.key){
        case "Up":
        case "ArrowUp":
        case "w":
        case "W":
            keys.w.pressed = false;
            break
        case "Down":
        case "ArrowDown":
        case "s":
        case "S":
            keys.s.pressed = false;
            break
        case "Left":
        case "ArrowLeft":
        case "a":
        case "A":
            keys.a.pressed = false;
            break
        case "Right":
        case "ArrowRight":
        case "d":
        case "D":
            keys.d.pressed = false;
            break
    }

});
