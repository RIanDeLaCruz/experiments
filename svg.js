let svg = document.querySelector('svg')

function svgHandler(evt) {
  let parts = this.querySelectorAll('[id^="head"], [id^="face"], [id^="facial"]')
  for(let part of parts) {
    let transforms = part.getAttribute('transform')
    part.dataset.transform = transforms
    part.setAttribute('transform', `rotate(10) ${transforms}`)
    part.style = 'transform-origin: 100px 90px'
  }
  svg.removeEventListener('mouseenter', svgHandler, true)
  svg.addEventListener('mouseout', svgReset)
}

function svgReset(evt) {
  let parts = this.querySelectorAll('[id^="head"], [id^="face"], [id^="facial"]')
  for(let part of parts) {
    part.setAttribute('transform', part.dataset.transform)
  }
  svg.removeEventListener('mouseout', svgReset, true)
  svg.addEventListener('mouseenter', svgHandler, true)
}

//svg.addEventListener('mouseenter', svgHandler, true)

function animateHead() {
  let parts = document.querySelectorAll('[id^="head"], [id^="face"], [id^="facial"]')

  for(let part of parts) {
    let transforms = part.getAttribute('transform')
    part.dataset.transform = transforms
    part.setAttribute('transform', `rotate(10) ${transforms}`)
    part.style = 'transform-origin: 110px 120px'
  }
  let is_moved = parts[0].getAttribute('trasform').includes('rotate')

  if(is_moved) {
    setTimeout(() => {
      window.requestAnimationFrame(resetHead)
    }, 500)
  }
}

function resetHead() {
  let parts = document.querySelectorAll('[id^="head"], [id^="face"], [id^="facial"]')

  for(let part of parts) {
    part.setAttribute('transform', part.dataset.transform)
  }

  let is_moved = parts[0].getAttribute('transform').includes('rotate')

  if(!is_moved) {
    setTimeout(() => {
      window.requestAnimationFrame(animateHead)
    }, 500)
  }
}

window.requestAnimationFrame(animateHead)
