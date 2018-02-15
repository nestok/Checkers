/**
 * Created by Юрий on 07.01.2018.
 */
class Computer{
    constructor(fields){
        this.botsCheckers = [];
        this.getCheckers(fields);
    }

    getCheckers(fields){
        this.botsCheckers = [];
        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 8; j++){
                if ((fields[i][j]['checker'] != null) && (fields[i][j].checker.color === 'black')){
                    this.botsCheckers.push(fields[i][j]);
                }
            }
    }

    makeTurn(board){
        this.getCheckers(board.fields);
        let chechers3;
        for (let i = 0; i < this.botsCheckers.length; i++){
            if (chechers3 = Rules.checkCanBeat(this.botsCheckers[i].dom, board.fields, 'white')){
                return chechers3;
            }
        }
        let suitableChecker = this.findSuitableChecker(board);
        // let suitableChecker = this.botsCheckers[0];
        // for (let i = 1; i < this.botsCheckers.length; i++){
        //     if (suitableChecker.position[0] < this.botsCheckers[i].position[0])
        //         suitableChecker = this.botsCheckers[i];
        // }

        let arr = Rules.findPossibleOptions(suitableChecker.dom, board.fields, true);
        let nextField = arr[Math.floor(Math.random() * arr.length)];
        return [suitableChecker, undefined, nextField];
    }

    findSuitableChecker(board){
        let suitableChecker = this.botsCheckers[0];
        let arr;
        for (let i = 1; i < this.botsCheckers.length; i++){
            arr = Rules.findPossibleOptions(suitableChecker.dom, board.fields, true)
            if (arr.length === 0)
                suitableChecker = this.botsCheckers[i];
        }
        return suitableChecker;
    }
}