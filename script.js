const canvas = document.getElementById('jogo2d')
const ctx = canvas.getContext('2d')
const gravidade = 0.5
let gameOver = false
let contadorPulos = 0

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando == false && !gameOver){
        personagem.velocidadey = 15
        personagem.pulando = true
        contadorPulos++
        console.log("PULOU", contadorPulos)
    }
})

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
}

function desenharPersonagem(){
    ctx.fillStyle = 'blue'
    ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura)
}

function atualizarPersonagem(){
    if(personagem.pulando){
        personagem.velocidadey -= gravidade
        personagem.y -= personagem.velocidadey
        if(personagem.y >= canvas.height - 50){
            personagem.velocidadey = 0
            personagem.pulando = false
            personagem.y = canvas.height - 50
        }
    }
}

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadex: 7
}

function desenharObstaculo(){
    ctx.fillStyle = 'green'
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarObstaculo(){
    obstaculo.x -= obstaculo.velocidadex
    if(obstaculo.x <= 0 - obstaculo.largura){
        obstaculo.x = canvas.width
        obstaculo.velocidadex += 0.2
        let nova_altura = (Math.random() * 50) + 100
        obstaculo.altura = nova_altura
        obstaculo.y = canvas.height - nova_altura
    }
}

function detectarColisao(){
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        console.log("GAME OVER")
        gameOver = true
    }
}

function desenharGameOver(){
    ctx.fillStyle = 'black'
    ctx.font = '50px Arial'
    ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2)
}

function desenharPulos(){
    ctx.fillStyle = 'black'
    ctx.font = '20px Arial'
    ctx.fillText(`Pulos: ${contadorPulos}`, 10, 30)
}

function loop(){
    if (gameOver) {
        desenharGameOver()
        return 
    }
   
    ctx.clearRect(0, 0, canvas.width, canvas.height)
   
    desenharPersonagem()
    desenharObstaculo()
    atualizarPersonagem()
    atualizarObstaculo()
    detectarColisao()
    desenharPulos()
   
    requestAnimationFrame(loop)
}

loop()