const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector('#scoreEl');
const startGameBtn = document.querySelector('#startGameBtn');
const container = document.querySelector('#container');
const bigScore = document.querySelector('#bigScore');





class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        c.beginPath();

        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();


    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}


class Star {
    constructor(x, y, spikes, outerRadius, innerRadius, color, velocity){
        this.x = x;
        this.y = y;
        this.spikes = randomInt(10, 20);
        this.outerRadius = randomInt(20, 30);
        this.innerRadius = randomInt(10, 20);
        this.color = getRandomColor();
        this.velocity = velocity;
    }

    draw(){
        var rot = Math.PI / 2 * 3;
        var x = this.x;
        var y = this.y;
        var	spikes = this.spikes;
        var step = Math.PI / spikes*4;
        var	outerRadius = this.outerRadius;
        var	innerRadius = this.innerRadius;

        c.beginPath();

        c.moveTo(x, y - outerRadius);
        
        for (var i = 0; i < spikes; i++) {
            x = x + Math.cos(rot) * outerRadius;
            y = y + Math.sin(rot) * outerRadius;
            c.lineTo(x, y)
            rot += step
    
            x = x + Math.cos(rot) * innerRadius;
            y = y + Math.sin(rot) * innerRadius;
            c.lineTo(x, y)
            rot += step
        }

        c.lineTo(x, y - outerRadius)
        c.fillStyle = this.color;
        c.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

const friction = 0.99;

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    
    draw(){
        c.save();
        c.globalAlpha = 0.1;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }

    update(){
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;
    }
}


const x = canvas.width / 2;
const y = canvas.height / 2;

let player = new Player(x, y, 10, 'white');
let projectiles = [];
let particles = [];
let stars = [];



function init(){
    player = new Player(x, y, 10, 'white');
    projectiles = [];
    particles = [];
    stars = [];
    score = 0;
    scoreEl.innerHTML = score;
    bigScore.innerHTML = score;
}


player.draw();

function spawnEnemies(){
    setInterval(() => {
        const radius = Math.random() * (30-4) + 4;

        let x;
        let y;

        if(Math.random() < 0.5){

            x = Math.random() <0.5? 0-radius: canvas.width+radius;
            y = Math.random()*canvas.height;
            
        }
        else {
            x = Math.random() * canvas.width;
            y = Math.random() <0.5? 0-radius: canvas.height+radius;

        }


        const color = 'green';
        const angle = Math.atan2(canvas.height/2 - y, canvas.width / 2 - x);
     
     const velocity = {
         x: Math.cos(angle),
         y: Math.sin(angle)
     }

        stars.push(new Star(x, y, randomInt(5, 20), 30, radius, color, velocity));

    }, 1000)
}

let animationId;
let score = 0;

function animate(){
    animationId = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();



    particles.forEach((particle, index) => {

        //make particle disappear after it fades out
        if(particle.alpha <= 0){
            particles.splice(index, 1);
        }else {//keep update
            particle.update();
        }

    })

    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update();

    //remove from edges of screen
    if(projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height) {
        setTimeout(() => {
            projectiles.splice(projectileIndex, 1);                    
        }, 0);
    }
})
    stars.forEach((star, index) => {
        
        star.update();
        
            //distance between player and an star
            const dist = Math.hypot(player.x - star.x, player.y - star.y);

            //end game
            if(dist - star.outerRadius - player.radius < 1) {
                cancelAnimationFrame(animationId);
                container.style.display = 'flex';
                bigScore.innerHTML = score;
            }

        projectiles.forEach((projectile, projectileIndex) => {

            //distance between projectiles and an star
            const dist = Math.hypot(projectile.x - star.x, projectile.y - star.y);
            
            //when projectile touches a star
            if(dist - star.outerRadius - projectile.radius < 1) {


                for(let i = 0; i< star.outerRadius; i++){
                    particles.push(
                        new Particle(projectile.x, 
                        projectile.y, Math.random() *2, star.color, {
                        x: (Math.random() - 0.5) * (Math.random() * 6), 
                        y: (Math.random() - 0.5) * (Math.random() * 6)}))
                }

                if(star.outerRadius-10 > 10 || star.innerRadius-10 > 10){
                    
                    //increase score
                    score +=100;
                    scoreEl.innerHTML = score;

                    star.outerRadius -=10;
                    star.innerRadius -=10;
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1);                    
                    }, 0);
                } else{//remove from the scene altogether

                    //increase score
                    score +=250;
                    scoreEl.innerHTML = score;

                setTimeout(() => {
                    stars.splice(index, 1);
                    projectiles.splice(projectileIndex, 1);                    
                }, 0);
            }
            }
        })
    })
}



addEventListener('click', (event) => {
     const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width / 2);
     
     const velocity = {
         x: Math.cos(angle) * 5,
         y: Math.sin(angle) * 5
     }


    projectiles.push(new Projectile(
        canvas.width/2, canvas.height/2, 5, 'white', velocity
    ));


});



startGameBtn.addEventListener('click', () => {
    init();
    animate();
    spawnEnemies;
    container.style.display = 'none';
});





function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  



  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

animate();
spawnEnemies();