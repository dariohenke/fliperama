/* Engine.js

var Engine = (function(global) {
    /* Predefinir as variaveis que usaremos no escopo do projeto,
     * criar o elemento canvas, inserir o contexto 2D context para o canvas
     * setar os elementos do canvas altura e comprimento e adicionar ao DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* Esta funcao serve como kickoff para o jogo. 
     */
    function main() {
        /* Capturar a informaão de tempo delta que é requirida se o jogo
         * requer uma animação mais suave!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* 
         */
        update(dt);
        render();

        /* 
         */
        lastTime = now;

        /* 
         */
        win.requestAnimationFrame(main);
    };

    /* 
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* 
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* 
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* Esta função desenha inicialmente "game level", e depois chama 
     * a funcao renderEntities. Lembrar, esta função é camada a todo
     * tick do jogo (ou loop do engine do jogo) porque é assim que o jgo funciona -
     */
    function render() {
        /* Este array tem a URL relativa da imagem usada
         * para essa linha em particular do nivel do jogos.
         */
        var rowImages = [
                'images/water-block.png',   // Linha de topo é Rio
                'images/stone-block.png',   // Linha 1 de 3 para pedra
                'images/stone-block.png',   // Linha 2 de 3 para pedra
                'images/stone-block.png',   // Linha 3 de 3 para pedra
                'images/grass-block.png',   // Linha 1 de 2 para grama
                'images/grass-block.png'    // Linha 2 de 2 para grama
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop através do numero de linhas e colunas que deinido acima 
         * e usar o array rowImages, desenhar a imagem correta para aquela
         * porção do grid.
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* A funcao drawImage do canvas' context element
                 * requer 3 parametros: a imagem pra desenhar, a coordenada x
                 * para iniciar o desenho e a coordenada y para iniciar o desenho.
               */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    /* Essa funcao é chamada pela funcao render e é chamada para cada clique do jogo.
     * A proposta é entao chamar a funcao render que foi definida defined
     * nas entidades do inimigo e jogador dentro do arquivo app.js
     */
    function renderEntities() {
        /* Faca Loop em todos os objetos dentro da array de allEnemies array e chame 
         * a funcao render qu foi definida.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }
    /* carregamento de todas as imagens necessarias para desenhar o ambiente 
     * do jogo. Depois setar o init com o metodo callback, para quando 
     * todas imagens estiverem carregadas apropriadamente o ogo inicie.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-horn-girl.png'
    ]);
    Resources.onReady(init);

    /* Assinalar o objeto de contexto canvas' para a variavel global (o objeto janela
	* no browser) para o desencolvedor poder usar mais facilmente 
    * a partir do aquivo app.js.
     */
    global.ctx = ctx;
})(this);
