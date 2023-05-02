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