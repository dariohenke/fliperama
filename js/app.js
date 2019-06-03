// Evitar inimigos

// valores possiveis de localizacao para eixo Y para os insetos
var valueOfY = [50, 130, 210];
var counter = 0;

    // A imagem/sprite para os inimigos, this uses
    // helper para prover carregamento facil de imagens
var Enemy = function () {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;

    // selecao randomica de localicao em Y para cada inseto
    this.y = valueOfY[Math.floor(Math.random() * 3)];

    // velocidade randomica dos insetos
    this.speed = Math.floor(100 + (Math.random() * 200));
};


// Update da posição do inimigo,
// Parametro: dt, um tempo delta entre ticks
Enemy.prototype.update = function(dt) {
    // multiplicar cada movimento por parametro dt
    // que garantirá ue o jogo corra na mesma velocidade
    // para todos computadores.

    // compatibilidade de movimento
	this.x += this.speed * dt;

    // se o inimigo mover para fora do quadro, o codigo seguinte muda a velocidade 
	// do inimigo e posião em Y (linha).
    if (this.x > 505) {
        this.x = -101;
        this.y = this.y + 83;
        this.speed = Math.floor(100 + (Math.random() * 200));

        // evita quue o inimigo seja posicionado em qualquer posição Y nas linhas da grama        if (this.y > 226) {
            this.y = 60;
        }
    }

    // verifica colisao entre inimigo e jogador e incrementa contador
    checkCollision(this, player);
};

// Desenha o inimigo na tela, método requirido para o jogo.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora escreva sua propria classe de jogador
// Esta classe reqquer um update(), render() e
// um metodo handleInput() .

// setando as funcoes de propriedade do jogador
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 400;
    return this;
};

Player.prototype.update = function() {
     //movimentar jogador na direcao que o botao é pressionado
    if (this.ctrlKey === 'left' && this.x !== 0) {
        this.x = this.x - 100;
    } else if (this.ctrlKey === 'right' && this.x != 400) {
        this.x = this.x + 100;
    } else if (this.ctrlKey === 'up') {
        this.y = this.y - 83;
    } else if (this.ctrlKey === 'down' && this.y != 400) {
        this.y = this.y + 83;
    }
    // setting value of ctlKey to null will give player a hop movement
    // otherwise, player will continue to move in the one direction
    // unless, change its direction of movement
    // player will never come to a stop
    this.ctrlKey = null;

    // reset de posição do jogador
    if (this.y < 60) {
        alert('You Won!\n' + '\n' + 'Resetting Game..');
        player.reset();
    }
};

// Desenhar o jogador na tela, método reuerido para o jogo
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    this.ctrlKey = key;
};

// Reset da posição do jogador
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

var checkCollision = function(bug, you) {
    // certificar colisoes entre inimigo e jogador 
    // numero limitao de colisoes permitido para Game over
    if (!(bug.y + 83 < you.y ||
        bug.y > you.y + 83 ||
        bug.x + 100 < you.x ||
        bug.x > you.x + 100)) {
            counter = counter + 1;
            if(counter >= 5) {
                alert('Game Over!');
                counter = 0;
            }
            you.reset();
        }
};

// Colocar todos objetos inimigos em um array chamado allEnemies
// Colocar o objeto jogador numa variavel chamada player
var totalEnemies = 4;
var allEnemies = [];

for (var i = 0; i < totalEnemies; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();

// Isso "trackeia" cada tecla pressionada e envia a info para 
// o metodo Player.handleInput(). Nao é necesario modificar isso. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});