const game = document.querySelector('.game')
const ctx = game.getContext('2d')
const catimg = document.querySelector('#cat')
const cactusimg = document.querySelector('#cactus')
const count = document.querySelector(".count")
const button = document.querySelector(".button")
//Получаем значение из локального хранилища
let highestCountt = localStorage.getItem('highestCount')
const leaderBoard = document.querySelector(".Score")
button.classList.add('hide')
leaderBoard.innerHTML = "Your score: " + highestCountt
ctx.fillStyle = 'rgb(228,164,87)'
let interval
let interval2
let timeCount = 0
const cat = {
    x: 100,
    y: 200,
    width: 100,
    height: 100,
    dy: 2,
    jumping: false,
    maksJump: false,
}
const cactus = {
    x: 680,
    y: 220,
    width: 80,
    height: 80,
}
function clearGame() {
    ctx.clearRect(0, 0, game.width, game.height)
}
function renderCat(cat) {
    ctx.drawImage(catimg, cat.x, cat.y, cat.width, cat.height)
}
function renderCatus(cactus) {
    ctx.drawImage(cactusimg, cactus.x, cactus.y, cactus.width, cactus.height)
}
function jump() {
    if ((cat.jumping === true) && (cat.y >= 100) && (cat.maksJump === false)) {
        cat.y -= cat.dy
    }
    //Движение вниз
    else if ((cat.y < 200)) {
        cat.maksJump = true
        cat.y += cat.dy
    } else {
        cat.maksJump = false
        cat.jumping = false
    }
}
console.log(cat.y)
function runGame() {
    if (cactus.x > -50) {
        cactus.x -= 5
    } else {
        cactus.x = 700
    }
}
function colision() {
    if ((cat.x + 50 === cactus.x) && (cat.y + cat.height >= cactus.y)) {
        timeCount = 0
        button.classList.remove('hide')
        clearInterval(interval)
        clearInterval(interval2)
    }
    console.log(cat.y, cactus.y, cat.height, cactus.height)
    // console.log(cat.y)
    // console.log(cactus.x)
    // console.log(cactus.y)
}
function time() {
    timeCount += 1
    count.innerHTML = "Count: " + timeCount
    console.log(timeCount)
    if(timeCount > highestCountt){
        highestCountt = timeCount
    }
}
function saveScore(){
    localStorage.setItem('highestCount', highestCountt )
    }
document.addEventListener('keydown', (event) => {
    cat.jumping = true
})
button.addEventListener('click', (event) =>{
location.reload()
})





function loop() {
    //Записываем все функции
    clearGame()
    renderCat(cat)
    renderCatus(cactus)
    runGame()
    jump()
    colision()
    saveScore()
}
interval2 = setInterval(time, 300)
interval = setInterval(loop, 1000 / 160)