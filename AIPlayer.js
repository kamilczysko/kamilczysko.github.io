class AIPlayer {

    constructor(player, opponent, depth) {
        this.player = player
        this.opponent = opponent
        if(depth) {
            this.depth = depth
        } else {
            this.depth = 3
        }
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
            const score = this.minimax(newBoard, this.depth, false)
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