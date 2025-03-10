const canvas = document.getElementById('jogo2d')
const ctx = canvas.getContext('2d')
const gravidade = 0.5
let gameOver = false
let contadorPulos = 0
let pontuacao = 0
let dificuldade = 1
let musicaDeFundo = new Audio('music.mp3')
let somDePulo = new Audio('jump.mp3')
let somGameOver = new Audio('gameover.mp3')

canvas.width = 800
canvas.height = 400

// Carregar a imagem de fundo
let fundoImagem = new Image()
fundoImagem.src = 'https://thumbs.dreamstime.com/b/fundo-do-jogo-da-cidade-69543203.jpg'

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && !personagem.pulando && !gameOver){
        personagem.velocidadey = 15
        personagem.pulando = true
        contadorPulos++
        somDePulo.play()
    }
})

canvas.addEventListener('click', () => {
    if(gameOver) {
        // Resetar todas as variáveis
        gameOver = false
        contadorPulos = 0
        pontuacao = 0
        obstaculo.velocidadex = 7
        personagem.y = canvas.height - 50
        personagem.velocidadey = 0
        personagem.pulando = false
        loop() // Reiniciar o loop do jogo
        musicaDeFundo.play() // Recomeçar a música de fundo
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
        pontuacao++
        obstaculo.velocidadex += 0.2 * dificuldade
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
        gameOver = true
        somGameOver.play()
    }
}

function desenharGameOver(){
    ctx.fillStyle = 'black'
    ctx.font = '50px Arial'
    ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2)
    ctx.font = '20px Arial'
    ctx.fillText(`Sua Pontuação: ${pontuacao}`, canvas.width / 2 - 70, canvas.height / 2 + 40)
}

function desenharPulos(){
    ctx.fillStyle = 'black'
    ctx.font = '20px Arial'
    ctx.fillText(`Pulos: ${contadorPulos}`, 10, 30)
}

function desenharPontuacao(){
    ctx.fillStyle = 'black'
    ctx.font = '20px Arial'
    ctx.fillText(`Pontuação: ${pontuacao}`, canvas.width - 150, 30)
}

function loop(){
    if (gameOver) {
        desenharGameOver()
        return 
    }

    // Desenhar a imagem de fundo
    ctx.drawImage(fundoImagem, 0, 0, canvas.width, canvas.height)

    desenharPersonagem()
    desenharObstaculo()
    atualizarPersonagem()
    atualizarObstaculo()
    detectarColisao()
    desenharPulos()
    desenharPontuacao()
   
    requestAnimationFrame(loop)
}

// Iniciar a música de fundo
musicaDeFundo.loop = true
musicaDeFundo.play()

loop()
