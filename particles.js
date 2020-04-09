const canvas = document.querySelector('#view')
const context = canvas.getContext('2d')
const baseWidth = document.documentElement.clientWidth
const baseHeight = document.documentElement.clientHeight

canvas.width = baseWidth
canvas.height = baseHeight

let tick = 0
let particles = []
let canPause = false

function Particle() {
  this.x = Math.random()*baseWidth
  this.y = 0
  this.speed = 2 + Math.random() * 3
  this.radius = 5 + Math.random() * 5
  this.color = "white"
}

//console.log(Object.getOwnPropertyNames(p))
//console.log(Particle.prototype)

function createParticles() {
  if( tick % 10 == 0 ) {
    if(particles.length < 100) {
      particles.push(new Particle())
    }
  }
}

function updateParticles() {
  particles.map(particle => { particle.y += particle.speed })
}

function killParticles() {
  for(let particle of particles) {
    particle.y = (particle.y > canvas.height) ? 0 : particle.y
  }
}

function drawParticles() {
  context.fillStyle = 'black'
  context.fillRect(0,0, baseWidth, baseHeight)

  particles.forEach(particle => {
    context.beginPath()
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI*2)
    context.closePath()
    context.fillStyle = particle.color
    context.fill()
  })
}

function animationLoop() {
  window.requestAnimationFrame(animationLoop)
  if(canPause) {
    createParticles()
    updateParticles()
    killParticles()
    drawParticles()
  }
}

function mouseMoveListener(evt) {
  for(let particle of particles) {
    if (particle.x <= evt.clientX+100 && particle.x > evt.clientX-100) {
      particle.color = 'rgba(0,0,0,0)'
    } else {
      particle.color = 'white'
    }
  }
}

canPause = window.requestAnimationFrame(animationLoop)

canvas.addEventListener('click', function() {
  canPause = !canPause
})

//window.addEventListener('mousemove', mouseMoveListener)
