const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width = 1024;
// canvas.height = 576;

// Collision detection
const collisionsMap = [];
for (let i = 0; i < collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}   

class Boundary {
    static width = 66
    static height = 66
    constructor({position}){
        this.position = position;
        this.width = 66;
        this.height = 66;
    }

    draw(){
        c.fillStyle = 'rgba(0, 0, 0, 0.0)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

}

const boundaries = [];
const offset = {
    x: -1205,
    y: -900
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025){
        boundaries.push(new Boundary({position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}));
    }
    })
})

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
    constructor({position, velocity, image, frames = {max: 1}}) {
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.image.onload = () => {
            this.width = this.image.width/this.frames.max;
            this.height = this.image.height;
            
        }
    }

    draw() {
      
        c.drawImage(this.image, 
            0,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height)
    }
};

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4/2,
        y: canvas.height/2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {x: offset.x, y: offset.y},
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

const movables = [background, ...boundaries];

function rectangularCollision({rectangle1, rectangle2}){

    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)

}
function animate(){
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw()
        
    });
    player.draw();

   
    let moving = true
    if(keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i< boundaries.length; i++) {
            const boundary = boundaries[i];
            if(
                rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y + 3}}}) ){
                
                moving = false
                break
            }
        }
        if (moving){
        movables.forEach((movable) => {
            movable.position.y += 3;
        })
        }

    }
    else if(keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i< boundaries.length; i++) {
            const boundary = boundaries[i];
            if(
                rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x+3, y: boundary.position.y}}}) ){
             
                moving = false
                break
            }
        }
        if (moving){
        movables.forEach((movable) => {
            movable.position.x += 3;
        })
        }
    }
    else if(keys.s.pressed && lastKey === 's') {
        for (let i = 0; i< boundaries.length; i++) {
            const boundary = boundaries[i];
            if(
                rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y - 3}}}) ){
                
                moving = false
                break
            }
        }
        if (moving){
        movables.forEach((movable) => {
            movable.position.y -= 3;
        })
        }
    
    }
    else if(keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i< boundaries.length; i++) {
            const boundary = boundaries[i];
            if(
                rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x-3, y: boundary.position.y}}}) ){
              
                moving = false
                break
            }
        }
        if (moving){
        movables.forEach((movable) => {
            movable.position.x -= 3;
        })
    }
    }
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
