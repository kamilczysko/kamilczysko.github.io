let player = "x"
let computer = "o"
let start = player
let won = null

let game = null
let ai = null

Array.from(document.getElementsByClassName('field')).forEach((element, idx) => {
    element.onclick = () => {
        if (!game.select(idx, player)) { return }
        game.select(ai.move(game), computer)
        drawBoard()
        if (game.isWinner()) {
            const winner = game.getWinner();
            if (winner == 'n') {
                document.getElementById('popup').classList.remove('invisible')
                document.getElementById('popup-message').innerText = "Nobody won! Both losers!"
                won = player //let it be
            } else {
                if (winner == player) {
                    document.getElementById('popup-message').innerText = "Congrats! You won. Impossible!"
                    won = player
                }
                else {
                    document.getElementById('popup-message').innerText = "Sadly, you are a loser!"
                    won = computer
                }
                let results = game.getResult()
                document.getElementById(results[0]).childNodes[0].classList.add('mark')
                document.getElementById(results[1]).childNodes[0].classList.add('mark')
                document.getElementById(results[2]).childNodes[0].classList.add('mark')

                document.getElementById('popup').classList.remove('invisible')
                document.getElementById('hint').classList.add('invisible')
            }

        }
    }
})

function drawBoard() {
    Array.from(game.getBoard()).forEach((cell, idx) => {
        if (cell != null) {
            const element = document.getElementById(idx)
            element.innerHTML = ''
            element.appendChild(getSign(cell))
        }
    })
}

document.getElementById('popup-button-x').onclick = (element) => {
    won == player ? start = 'x' : start = 'o'
    player = 'x'
    computer = 'o'
    initGame()
}


document.getElementById('popup-button-o').onclick = (element) => {
    won == player ? start = 'o' : start = 'x'
    player = 'o'
    computer = 'x'
    initGame()
}

function initGame() {
    let depthLevel = document.getElementById('depth-level').value
    console.log(depthLevel)
    game = new GameState()
    if (depthLevel < 0) {
        depthLevel = 5
    }
    ai = new AIPlayer(computer, player, depthLevel)
    document.getElementById('popup').classList.add("invisible")
    Array.from(document.getElementsByClassName('field')).forEach(element => {
        element.classList.remove('mark')
        element.innerHTML = ''
    })
    if (start == computer) {
        game.select(ai.move(game), computer)
        drawBoard()
    }
    document.getElementById('hint').classList.remove('invisible')
    document.getElementById('user-sign').innerHTML = ''
    document.getElementById('user-sign').appendChild(getSign(player))
    document.getElementById('depth-leve-info').innerText = depthLevel
}

function getSign(sign) {
    const element = document.createElement("img")
    element.classList.add("sign")
    if (sign == "x") {
        element.src = 'cross.svg'
    } else {
        element.src = 'circle.svg'
    }

    return element
}