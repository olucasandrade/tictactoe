// Declaring variables
let fields = document.querySelectorAll('td');
let plays1 = 0;
let plays2 = 0;
let casa1 = document.getElementById('1');
let casa2 = document.getElementById('2');
let casa3 = document.getElementById('3');
let casa4 = document.getElementById('4');
let casa5 = document.getElementById('5');
let casa6 = document.getElementById('6');
let casa7 = document.getElementById('7');
let casa8 = document.getElementById('8');
let casa9 = document.getElementById('9');
let message = document.getElementById('gameover');
let endgame = document.getElementById('endgame');
let menu = document.getElementById('menu');
let menuImg = document.getElementById('menuImg');
let hash = document.getElementById('hash');
let counter = 0;



// Start The Game Function
function start(gameMode) {
    menu.style.display = 'none';
    menuImg.style.display = 'none';
    hash.style.display = 'block';
    if (gameMode == 'single') {
        replay('multi');
        singleMode();
    } else if (gameMode == 'multi') {
        replay('single');
        pvp();
    }
}


// Single Player Mode
function singleMode() {
    for (i = 0; i < fields.length; i++) {
        fields[i].addEventListener('click', singlePlayerFunction)
    }
}

// Single Player Function
function cpuPlay() {
    if (!checkWin()) {
        let random;
        do {
            random = Math.floor(Math.random() * 9);
        } while (fields[random].innerText != '');

        for (i = 0; i < fields.length; i++) {
            fields[random].innerText = 'O';
            plays2++;
            for (i = 0; i < fields.length; i++) {
                fields[i].addEventListener('click', singleMode());
            }
        }
    }
}

// Event Listener Function Single Player
let singlePlayerFunction = function jogada1() {
    let filled;
    if (this.innerText == '') {
        filled = false;
    } else {
        filled = true;
    }
    if (checkWin()) {
        filled = true;
    }
    if (!filled) {
        // filling the field after verifying which turn is
        counter++;
        if (plays1 == plays2 && plays1 != 4) {
            this.innerText = 'X';
            plays1++;
            cpuPlay()
        } else if (plays2 == 4) {
            this.innerText = 'X'
            counter = 9
        }
    }
    checkWin();
}


// Two Players Function
function pvp() {
    // Adding click in each field
    for (i = 0; i < fields.length; i++) {
        fields[i].addEventListener('click', multiPlayerFunction);
    }
}

// Event Listener Function Multi Player
let multiPlayerFunction = function jogada2() {
    // Verifying if the field is filled
    let filled;
    if (this.innerText == '') {
        filled = false;
    } else {
        filled = true;
    }
    if (checkWin()) {
        filled = true;
    }
    if (!filled) {
        // filling the field after verifying which turn is
        counter++;
        if (plays1 == plays2) {
            this.innerText = 'X';
            plays1++;
        } else {
            this.innerText = 'O'
            plays2++
        }
    }
    checkWin();
}


// function for check possible winner
function checkWin() {
    if (
        casa1.innerText == 'X' && casa2.innerText == 'X' && casa3.innerText == 'X' ||
        casa4.innerText == 'X' && casa5.innerText == 'X' && casa6.innerText == 'X' ||
        casa7.innerText == 'X' && casa8.innerText == 'X' && casa9.innerText == 'X' ||
        casa1.innerText == 'X' && casa4.innerText == 'X' && casa7.innerText == 'X' ||
        casa2.innerText == 'X' && casa5.innerText == 'X' && casa8.innerText == 'X' ||
        casa3.innerText == 'X' && casa6.innerText == 'X' && casa9.innerText == 'X' ||
        casa1.innerText == 'X' && casa5.innerText == 'X' && casa9.innerText == 'X' ||
        casa3.innerText == 'X' && casa5.innerText == 'X' && casa7.innerText == 'X'
    ) {
        setTimeout(function() {
            gameOver('X');
        }, 250)
        return true;
    } else if (
        casa1.innerText == 'O' && casa2.innerText == 'O' && casa3.innerText == 'O' ||
        casa4.innerText == 'O' && casa5.innerText == 'O' && casa6.innerText == 'O' ||
        casa7.innerText == 'O' && casa8.innerText == 'O' && casa9.innerText == 'O' ||
        casa1.innerText == 'O' && casa4.innerText == 'O' && casa7.innerText == 'O' ||
        casa2.innerText == 'O' && casa5.innerText == 'O' && casa8.innerText == 'O' ||
        casa3.innerText == 'O' && casa6.innerText == 'O' && casa9.innerText == 'O' ||
        casa1.innerText == 'O' && casa5.innerText == 'O' && casa9.innerText == 'O' ||
        casa3.innerText == 'O' && casa5.innerText == 'O' && casa7.innerText == 'O') {
        setTimeout(function() {
            gameOver('O');
        }, 250)
        return true;
    } else if (counter == 9) {
        gameOver();
    }
}


// Game Over Function
function gameOver(winner) {
    counter = 0;
    endgame.style.display = 'block';
    if (winner == 'X') {
        message.innerText = 'GAME OVER \n X VENCEU';
    } else if (winner == 'O') {
        message.innerText = 'GAME OVER \n O VENCEU';
    } else {
        message.innerText = 'GAME OVER \n DEU VELHA';
    }
}

// Replay Button
function replay(menu) {
    counter = 0;
    for (i = 0; i < fields.length; i++) {
        fields[i].innerText = '';
    }
    endgame.style.display = 'none';
    plays1 = plays2 = 0;

    if (menu == 'single') {
        for (i = 0; i < fields.length; i++) {
            fields[i].removeEventListener('click', multiPlayerFunction);
        }
    } else if (menu == 'multi') {
        for (i = 0; i < fields.length; i++) {
            fields[i].removeEventListener('click', singlePlayerFunction);
        }
    } else if (menu == 'menu') {
        for (i = 0; i < fields.length; i++) {
            fields[i].removeEventListener('click', multiPlayerFunction);
        }
        for (i = 0; i < fields.length; i++) {
            fields[i].removeEventListener('click', singlePlayerFunction);
        }
    }
}

// Return to menu function
function mainMenu() {
    menu.style.display = 'block';
    menuImg.style.display = 'block';
    hash.style.display = 'none';
    replay('menu');
}