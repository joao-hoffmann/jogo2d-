const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
const gravidade = 0.5;
let recorde = localStorage.getItem('recorde') || 0;
let pulos = 0;
let jogoAtivo = true;

document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !personagem.pulando) {
        personagem.velocidadey = 15;
        personagem.pulando = true;
        pulos++;
    }
});

const fundo = new Image();
fundo.src = 'https://img.freepik.com/fotos-premium/praia-tropical-com-palmeiras_63047-1217.jpg?semt=ais_hybrid'; // Caminho da imagem de fundo

const imgPersonagem = new Image();
imgPersonagem.src = 'https://i.pinimg.com/originals/00/e7/f4/00e7f45c3726db47bfd710c4eec72b2d.png'; // Caminho da imagem do personagem

const imgObstaculo = new Image();
imgObstaculo.src = 'https://static.vecteezy.com/system/resources/thumbnails/047/269/597/small/desert-sand-dune-png.png'; // Caminho da imagem do obstáculo

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
};

function desenharPersonagem() {
    ctx.drawImage(imgPersonagem, personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.velocidadey -= gravidade;
        personagem.y -= personagem.velocidadey;
        if (personagem.y >= canvas.height - 50) {
            personagem.velocidadey = 0;
            personagem.pulando = false;
            personagem.y = canvas.height - 50;
        }
    }
}

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadex: 7
};

function desenharObstaculo() {
    ctx.drawImage(imgObstaculo, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex;
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidadex += 0.2;
        let nova_altura = (Math.random() * 50) + 100;
        obstaculo.altura = nova_altura;
        obstaculo.y = canvas.height - nova_altura;
    }
}

function verificarColisao() {
    return (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    );
}

function exibirGameOver() {
    ctx.fillStyle = 'black';
    ctx.font = '48px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 120, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText(`Pulos: ${pulos}`, canvas.width / 2 - 60, canvas.height / 2 + 40);
    if (pulos > recorde) {
        recorde = pulos;
        localStorage.setItem('recorde', recorde);
    }
    ctx.fillText(`Recorde: ${recorde}`, canvas.width / 2 - 70, canvas.height / 2 + 80);
}

function exibirPontuacao() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Pulos: ${pulos}`, 20, 30);
    ctx.fillText(`Recorde: ${recorde}`, 20, 60);
}

function loop() {
    if (!jogoAtivo) {
        exibirGameOver();
        return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height);
    desenharPersonagem();
    desenharObstaculo();
    atualizarPersonagem();
    atualizarObstaculo();
    exibirPontuacao();
    
    if (verificarColisao()) {
        jogoAtivo = false;
    }
    
    requestAnimationFrame(loop);
}

loop();
