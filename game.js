class GameState {

    constructor(board) {
        if (board) {
            this.board = Array.from(board)
        } else {
            this.board = [null, null, null, null, null, null, null, null, null]
        }
        this.result = null
        this.winner = null

    }

    printBoard() {
        console.log(this.board[0] + " " + this.board[1] + " " + this.board[2] + "\n" +
            this.board[3] + " " + this.board[4] + " " + this.board[5] + "\n" +
            this.board[6] + " " + this.board[7] + " " + this.board[8] + "\n")
    }

    select(i, player) {
        if (this.board[i] != null) { return false }
        this.board[i] = player
        this.check()
        return true
    }

    getFreeMoves() {
        const freeMoves = []
        Array.from(this.board).forEach((cell, i) => {
            if (cell == null) {
                freeMoves.push(i)
            }
        })
        return freeMoves
    }

    check() {
        //rows
        if (this.board[0] == this.board[1] && this.board[0] == this.board[2] && this.board[0] != null) {
            this.winner = this.board[0]
            this.result = [0, 1, 2]
        }
        else if (this.board[3] == this.board[4] && this.board[3] == this.board[5] && this.board[3] != null) {
            this.winner = this.board[3]
            this.result = [3, 4, 5]
        }
        else if (this.board[6] == this.board[7] && this.board[6] == this.board[8] && this.board[6] != null) {
            this.winner = this.board[6]
            this.result = [6, 7, 8]
        }
        //cols
        else if (this.board[0] == this.board[3] && this.board[0] == this.board[6] && this.board[0] != null) {
            this.winner = this.board[0]
            this.result = [0, 3, 6]
        }
        else if (this.board[1] == this.board[4] && this.board[1] == this.board[7] && this.board[1] != null) {
            this.winner = this.board[1]
            this.result = [1, 4, 7]
        }
        else if (this.board[2] == this.board[5] && this.board[2] == this.board[8] && this.board[2] != null) {
            this.winner = this.board[2]
            this.result = [2, 5, 8]
        }
        //diags
        else if (this.board[0] == this.board[4] && this.board[0] == this.board[8] && this.board[8] != null) {
            this.winner = this.board[8]
            this.result = [0, 4, 8]
        }
        else if (this.board[2] == this.board[4] && this.board[2] == this.board[6] && this.board[2] != null) {
            this.winner = this.board[2]
            this.result = [2, 4, 6]
        } else if (Array.from(this.board).every(cell => cell != null)) {
            this.winner = 'n'
        }
    }

    getWinner() { return this.winner }

    isWinner() {
        return this.winner != null
    }

    getBoard() { return this.board }

    getResult() { return this.result }
}

class AIPlayer {

    constructor(player, opponent) {
        this.player = player
        this.opponent = opponent
    }

    move(board) {
        let perfectMove = 0
        let bestScore = -Infinity
        Array.from(board.getFreeMoves()).forEach(move => {
            let newBoard = new GameState(board.getBoard())
            newBoard.select(move, this.player)
            if (newBoard.isWinner() && newBoard.getWinner == this.player) {
                return move
            }
            const score = this.minimax(newBoard, 3, false)
            if (bestScore < score) {
                perfectMove = move
                bestScore = score
            }
        })
        return perfectMove
    }

    minimax(board, depth, miximizingPlayer) {
        if (board.isWinner() || depth <= 0) {
            return this.getScore(board.getWinner())
        }
        if (miximizingPlayer) {
            let bestScore = -Infinity
            Array.from(board.getFreeMoves()).forEach(move => {
                let newBoard = new GameState(board.getBoard())
                newBoard.select(move, this.player)
                const score = this.minimax(newBoard, depth - 1, false)
                bestScore = Math.max(score, bestScore)
            })
            return bestScore
        } else {
            let bestScore = Infinity
            Array.from(board.getFreeMoves()).forEach(move => {
                let newBoard = new GameState(board.getBoard())
                newBoard.select(move, this.opponent)
                const score = this.minimax(newBoard, depth - 1, true)
                bestScore = Math.min(score, bestScore)
            })
            return bestScore
        }
    }

    getScore(winner) {
        if (winner == this.player) { return 1 }
        if (winner == this.opponent) { return -1 }
        return 0
    }

}

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
                won = 'n'
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
    won == player? start = 'x': start = 'o'
    player = 'x'
    computer = 'o'
    initGame()
}


document.getElementById('popup-button-o').onclick = (element) => {
    won == player? start = 'o': start = 'x'
    player = 'o'
    computer = 'x'
    initGame()
}

function initGame() {
    game = new GameState()
    ai = new AIPlayer(computer, player)
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