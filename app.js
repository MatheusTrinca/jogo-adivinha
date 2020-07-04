/*
 REGRAS DO JOGO
- Jogador escolhe entre um valor maximo e minimo
- Jogadores tem certo número de tentativas
- Notificar jogador tentativas restantes
- Mostrar a resposta correta se o jogador perder
- Deixar o jogador jogar novamente
 */

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNumber = document.querySelector('.min-num'),
      maxNumber = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      
// Assign min and max num;
minNumber.textContent = min;
maxNumber.textContent = max;

// play again eventListener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
        guessInput.value = '';
    }
})

// listen for guess
guessBtn.addEventListener('click', function(){
    message.style.display = 'none';
    let guess = parseInt(guessInput.value);
    //Validar input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Por gentileza escolha um valor entre ${min} e ${max}`, 'red');
    }

    // Check if won
    if(guess === winningNum){
        gameOver(true, `${winningNum} está certo! Você GANHOU!!`);
    }else{
        // Numero Errado
        guessesLeft -= 1;
        if(guessesLeft === 0){
            gameOver(false, `Você perdeu!! O número correto era ${winningNum}`);
        }else{
            // Dizer que o numero está errado
            guessInput.value = '';
            guessInput.style.border = '2px solid red';
            setMessage(`${guess} está errado!! Você ainda possui ${guessesLeft} tentativas`, 'red');
        }
    }
});

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
    message.style.display = 'block';
}

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disabel input
    guessInput.disabled = true;
    // mudar borda para verde
    guessInput.style.border = `2px solid ${color}`;
    // set winning message
    setMessage(msg, color);

    // Jogar novamente
    guessBtn.value = 'JOGAR DE NOVO?';
    // Como a classe play-again foi adicionada depois da pagina ser carregada, temos que addEvenListener no parente -> Delegar
    // neste caso o #game
    guessBtn.className += 'play-again';
}

function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}