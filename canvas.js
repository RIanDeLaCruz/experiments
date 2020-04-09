const canvas = document.querySelector('#view')
const context = canvas.getContext('2d')
const baseWidth = document.documentElement.clientWidth
const baseHeight = document.documentElement.clientHeight
let scale = 0
let t = null

canvas.width = baseWidth
canvas.height = baseHeight

let data = [ 25, 25, 25, 25 ]
let colors = [ 'red', 'blue', 'yellow', 'green', 'black']
let total = data.reduce((sum, el) => sum+el)

function toRadians(deg) {
  return (deg * Math.PI) / 180
}

function drawSection(ctx, previousAngle, target, angleStop, currentIndex) {
  //let currentAngle = previousAngle
  ctx.fillStyle = colors[currentIndex]
  ctx.strokeStyle = colors[currentIndex]

  if(previousAngle < target) {
    console.group(colors[currentIndex])
    console.log(previousAngle)
    console.log(target)
    console.log(angleStop)
    console.groupEnd()
    ctx.beginPath()
    ctx.moveTo( ctx.canvas.width/4, ctx.canvas.width/4 )
    ctx.arc( ctx.canvas.width/4, ctx.canvas.width/4, 100, toRadians(previousAngle), toRadians(previousAngle+angleStop), false)

    //ctx.arc( ctx.canvas.width/4, ctx.canvas.width/4, 100, currentAngle, target, false)

    ctx.lineTo( ctx.canvas.width/4, ctx.canvas.width/4 )

    ctx.fill()
    ctx.stroke()
    window.requestAnimationFrame(() => {
      drawSection(ctx, previousAngle+angleStop, target, angleStop, currentIndex)
    })
  }
}

function drawPieChart() {
  let ctx = context
  let previousAngle = 0
  for(let i = 0; i < data.length; i++){
    let datum = data[i]
    let targetAngle = previousAngle + datum/total * 360
    let p = previousAngle
    let angleStop = (targetAngle - previousAngle)/6

    setTimeout(() => {window.requestAnimationFrame(() => {
        drawSection(ctx, p, targetAngle, angleStop, i)
      })
    }, i * 500)
    previousAngle = targetAngle
  }
}

let lineData = [25, 52, 69, 93, 75]
function drawLineChart(ctx) {
  let xAxis = 50
  let diff = Math.max(...lineData) - Math.min(...lineData)
  // draw axis
  ctx.fillStyle = 'black'
  ctx.lineWidth = 2.0
  ctx.beginPath()
  ctx.moveTo(xAxis, 10)
  ctx.lineTo(xAxis, 115)
  ctx.lineTo((lineData.length * 20) + 50, 115)
  ctx.stroke()

  ctx.lineWidth = 1.0
  ctx.moveTo(xAxis+20, 115 - lineData[0])
  lineData.forEach((datum, idx) => {
    let x = xAxis+(20*(idx+1))
    let y = 115 - datum
    if(idx > 0) {
      ctx.lineTo(x, y)
    }
    ctx.arc(x+1, y, 2, 0, 2 * Math.PI)
    let width = ctx.measureText(datum).width
    ctx.font = `normal 6pt serif`
    ctx.fillText(datum.toString(), x - width, y)
  })
  for(let i = 0; i <= 100; i = i+20) {
    ctx.fillStyle = 'black'
    let width = ctx.measureText(i).width
    ctx.font = `normal 6pt serif`
    ctx.fillText(i.toString(), xAxis - width-10, 115 - i)
    ctx.moveTo(xAxis, 115-i)
    ctx.lineTo(xAxis + (lineData.length *  20), 115-i)
    ctx.fillStyle = 'gray'
    ctx.stroke()
  }

  ctx.stroke()
}

let side = 200/canvas.width

function draw(ctx) {
  ctx.fillStyle = 'lightblue'
  ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height)
  //ctx.fillStyle = 'blue'
  //ctx.fillRect(10,10, ctx.canvas.width/4, ctx.canvas.width/4)

  //ctx.fillStyle = 'black'
  //let fontSize = (scale > 0) ? 96 * scale : 96
  //ctx.font = `normal ${fontSize}pt serif`
  //let textLeft = ctx.canvas.width*(100/baseWidth)
  //let textTop = ctx.canvas.width*(100/baseWidth)
  //ctx.fillText('Hello World', textLeft, textTop)

  //window.requestAnimationFrame(drawPieChart)
  //drawLineChart(ctx)
}

draw(context)

window.onresize = function() {
  if (t) {
    window.cancelAnimationFrame(t)
  }
  t = window.requestAnimationFrame(() => {
    scale = document.documentElement.clientWidth/baseWidth
    context.scale(scale, scale)

    context.canvas.width = document.documentElement.clientWidth
    context.canvas.height = document.documentElement.clientHeight

    draw(context)
  })
}

canvas.addEventListener('click', (evt) => {
  console.log(evt)
})
