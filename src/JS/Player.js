/**
 * Created by Юрий on 31.12.2017.
 */
class Player {
    constructor(fields) {
        this.playerCheckers = [];
        this.getCheckers(fields);
        this.playerBeat;
        this.beatField;
    }

    getCheckers(fields){
        this.playerCheckers = [];
        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 8; j++){
                if ((fields[i][j].checker) && (fields[i][j].checker.color === 'white')){
                    this.playerCheckers.push(fields[i][j]);
                }
            }
    }

    findVariables(board){
        this.getCheckers(board.fields);
        let chechers3;
        for (let i = 0; i < this.playerCheckers.length; i++){
            if (chechers3 = Rules.checkCanBeat(this.playerCheckers[i].dom, game1.board.fields, 'black')){
                this.playerBeat = chechers3;
                return chechers3;
            }
        }
        return chechers3;
    }
}