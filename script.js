const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

const btn = Array.from(document.getElementsByClassName('btn'));

const red = document.querySelector('.red')
const green = document.querySelector('.green')
const blue = document.querySelector('.blue')
const black = document.querySelector('.black')
const clear = document.getElementById('clear')
const plus = document.querySelector('.plus')
const minus = document.querySelector('.minus')
const eraser = document.getElementById('eraser')
const downloadBtn = document.getElementById('download')

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 250
c.fillStyle = 'white'
c.fillRect(0,0, canvas.width, canvas.height)

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth - 100
    canvas.height = window.innerHeight - 250
})


let isPainting = false

let brushSize = 10

function startPainting(e) {
    isPainting = true
    draw(e)
    console.log(isPainting)
}

function finishPainting() {
    isPainting = false
    c.beginPath()
    console.log(isPainting)
}

function draw(e) {


    if (!isPainting) return;
    c.fillStyle = 'red'
    c.lineWidth = brushSize
    c.lineCap = 'round'

    c.lineTo(e.clientX -50, e.clientY -60 )
    c.moveTo(e.clientX -50, e.clientY -60)
    c.stroke()
}

//Desktop Controls
canvas.addEventListener('mousedown', startPainting)
canvas.addEventListener('mouseup', finishPainting)
canvas.addEventListener('mousemove', draw)


//Mobile Controls
canvas.addEventListener('touchstart', startPainting)
canvas.addEventListener('touchend', finishPainting)
canvas.addEventListener('touchmove', (e) => {

    if (!isPainting) return;
    c.fillStyle = 'red'
    c.lineWidth = brushSize
    c.lineCap = 'round'

    c.lineTo(e.touches[0].clientX - 50, e.touches[0].clientY -60)
    c.moveTo(e.touches[0].clientX - 50, e.touches[0].clientY -60)
    c.stroke()

})

red.addEventListener('click', () => {
    c.strokeStyle = 'red'
})


blue.addEventListener('click', () => {
    c.strokeStyle = 'blue'
})


green.addEventListener('click', () => {
    c.strokeStyle = 'green'
})

black.addEventListener('click', () => {
    c.strokeStyle = 'black'
})

plus.addEventListener('click', () => {
    brushSize += 5
    if (brushSize >= 55) brushSize = 50;
    console.log('brush is now' + brushSize + ' pixel big')
})

minus.addEventListener('click', () => {
    brushSize -= 5
    if (brushSize <= 1) brushSize = 1;
    console.log('brush is now' + brushSize + ' pixel big')
})

eraser.addEventListener('click', () => {
    c.strokeStyle = 'white'
})

function clearCanvas() {
    c.clearRect(0, 0, canvas.width, canvas.height)
}
clear.addEventListener('click', clearCanvas)



btn.forEach(button => {
    button.addEventListener('mouseover', () => {
        new Audio('assets/pop.mp3').play()
    })
})

downloadBtn.addEventListener('click', () => {
    let a = document.createElement('a')
    let URL = canvas.toDataURL()
    a.setAttribute('download', 'myPainting.jpg')
    a.setAttribute('href', `${URL}`)
    a.click()
})

