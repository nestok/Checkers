/**
 * Created by Юрий on 07.01.2018.
 */
class Application{
    constructor(){
        this.selectedField = undefined;
    }
    init () {
        let liters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        let game = document.getElementById('game');
        game1.board = new Board();
        for (let i = 0; i < 8; i++) {
            //Добавляем буквы на поле
            let letterField = document.createElement('div');
            letterField.classList.add('letter-field');
            letterField.style.top = '625px';
            letterField.style.left = (i * 75 + 25) + 'px';
            letterField.innerHTML = liters[i];
            game.appendChild(letterField);

            //Добавляем цифры на поле
            let numberField = document.createElement('div');
            numberField.classList.add('number-field');
            let num = 8 - i;
            numberField.innerHTML = num;
            numberField.style.top = (i * 75 + 25) + 'px';
            numberField.style.left = 0;
            game.appendChild(numberField);
        }
        let fields;
        for (let i = 0; i < 8; i++) {
            fields = [];
            for (let j = 0; j < 8; j++) {
                let field = document.createElement('div');

                field.classList.add('field');
                if ((i + 1) % 2 != (j + 1) % 2) {
                    field.classList.add('black');
                    field.isBlack = true;
                    field.style.cursor = 'pointer';

                    if ((i + 1) < 4 ) {
                        Application.addCheckerBlack(field);
                        field.checkerColor = 'black';
                    }
                    if ((i + 1) > 5 ) {
                        Application.addCheckerWhite(field);
                        field.checkerColor = 'white';
                    }
                }
                else {
                    field.isBlack = false;
                }

                field.cTop = i * 75 + 25;
                field.cLeft = j * 75 + 25;
                field.style.top = field.cTop + 'px';
                field.style.left = field.cLeft + 'px';
                field.id = i + " " + j;
                field.i = i;
                field.j = j;
                fields.push(new Field(field, field.classList.hasOwnProperty('checker_white')));
                //game1.board.addField(field);

                //game.appendChild(game1.board.fields[i][j].dom);
                game.appendChild(field);
            }
            game1.board.addField(fields);
        }
        game1.bot = new Computer(game1.board.fields);
        game1.player = new Player(game1.board.fields);
        console.log(game1.board.fields);

        game.addEventListener('click', (e) => {
            function editColors(field, colorRemove, colorAdd) {
                let arr = Rules.findPossibleOptions(field.parentNode, game1.board.fields, false);
                for(let el of arr){
                    el.classList.remove(colorRemove);
                    el.classList.add(colorAdd);
                }
            }
            function removeBlue() {
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (game1.board.fields[i][j].dom.classList.contains('blue')) {
                            game1.board.fields[i][j].dom.classList.remove('blue');
                            game1.board.fields[i][j].dom.classList.add('black');
                        }
                    }
                }
            }

            var field = e.target;

            //Выбрали выделенную клетку
            if (field.classList.contains('gray')) {
                field.classList.remove('gray');
                field.classList.add('black');
                //editColors(field, 'blue', 'black')
                removeBlue();
                this.selectedField = undefined;
                return;
            }

            //Выбрали нашу шашку
            if (field.classList.contains('checker_white')) {
                //существуют выделенные клетки
                if (this.selectedField){
                    this.selectedField.classList.remove('gray');
                    this.selectedField.classList.add('black');
                    removeBlue();
                }
                field.classList.remove('black');
                field.classList.add('gray');
                this.selectedField = field;


                let playerBeats = game1.player.findVariables(game1.board);

                if (playerBeats){
                    if (playerBeats = Rules.checkCanBeatMany(this.selectedField.parentNode, game1.board.fields, 'black')){

                        for (let el of playerBeats){
                            el[2].classList.remove('black');
                            el[2].classList.add('blue');
                        }

                        // playerBeats[2].classList.remove('black');
                        // playerBeats[2].classList.add('blue');
                    }
                }
                else {
                    game1.player.playerBeat = undefined;
                    editColors(field, 'black', 'blue');
                }
            }

            //Ходим выбранной шашкой на выделенную клетку
            if (field.classList.contains('blue')) {

                Application.addCheckerWhite(field);
                let type = Field.getCheckerType(this.selectedField.parentNode, game1.board.fields);
                game1.board.addCheckerToField(field, 'white', type);
                this.selectedField.classList.remove('checker_white');
                game1.board.removeCheckerFromField(this.selectedField.parentNode);
                this.selectedField.classList.remove('gray');
                this.selectedField.classList.add('black');
                Rules.checkQueenUpgrade(field, game1.board.fields, false);
                if (game1.player.playerBeat){
                    //Попытка сделать выбор после цепочки (не работает)
                    try{
                        game1.player.playerBeat[1].dom.removeChild(game1.player.playerBeat[1].dom.lastChild);
                        game1.board.removeCheckerFromField(game1.player.playerBeat[1].dom);
                    }
                    catch(e){
                        for (let el of game1.player.playerBeat) {
                            if (field === el[2]) {
                                el[1].dom.removeChild(el[1].dom.lastChild);
                                game1.board.removeCheckerFromField(el[1].dom);
                            }
                        }
                    }
                    // if (!game1.player.playerBeat[1][2]){
                    //     game1.player.playerBeat[1].dom.removeChild(game1.player.playerBeat[1].dom.lastChild);
                    //     game1.board.removeCheckerFromField(game1.player.playerBeat[1].dom);
                    // }
                    // else {
                    //     for (let el of game1.player.playerBeat) {
                    //         if (field === el[2]) {
                    //             el[1].dom.removeChild(el[1].dom.lastChild);
                    //             game1.board.removeCheckerFromField(el[1].dom);
                    //         }
                    //     }
                    // }
                    // game1.player.playerBeat[1].dom.removeChild(game1.player.playerBeat[1].dom.lastChild);
                    // game1.board.removeCheckerFromField(game1.player.playerBeat[1].dom);
                    Rules.checkQueenUpgrade(field, game1.board.fields, false);
                    Application.isEndGame(game1.board.fields);

                    if (game1.player.playerBeat = Rules.checkCanBeatMany(field, game1.board.fields, 'black')){
                        field.classList.remove('blue');
                        field.classList.add('black');
                        this.selectedField = field.lastChild;
                        this.selectedField.classList.add('gray');
                        game1.player.beatField = field.lastChild;
                        removeBlue();
                        // game1.player.playerBeat[2].classList.remove('black');
                        // game1.player.playerBeat[2].classList.add('blue');
                        try{
                            game1.player.playerBeat[2].classList.remove('black');
                            game1.player.playerBeat[2].classList.add('blue');
                        }
                        catch (e){
                            for (let el of game1.player.playerBeat){
                                el[2].classList.remove('black');
                                el[2].classList.add('blue');
                            }
                        }
                        // if (!game1.player.playerBeat[1][2]){
                        //     game1.player.playerBeat[2].classList.remove('black');
                        //     game1.player.playerBeat[2].classList.add('blue');
                        // }
                        // else{
                        //     for (let el of game1.player.playerBeat){
                        //         el[2].classList.remove('black');
                        //         el[2].classList.add('blue');
                        //     }
                        // }
                        return;
                    }
                }

                removeBlue();
                this.selectedField = undefined;







                //Ходит бот
                let botChoice = game1.bot.makeTurn(game1.board);


                function makeTurn(){
                    let typeChecker = Field.getCheckerType(botChoice[0].dom, game1.board.fields);
                    Application.addCheckerBlack(botChoice[2]);
                    game1.board.addCheckerToField(botChoice[2], 'black', typeChecker);
                    game1.bot.botsCheckers.push(botChoice[2]);
                    botChoice[0].dom.removeChild(botChoice[0].dom.lastChild);
                    game1.board.removeCheckerFromField(botChoice[0].dom);
                    Application.isEndGame(game1.board.fields);
                    Rules.checkQueenUpgrade(botChoice[2], game1.board.fields, true);
                }
                makeTurn();
                if (botChoice[1]){
                    botChoice[1].dom.removeChild(botChoice[1].dom.lastChild);
                    game1.board.removeCheckerFromField(botChoice[1].dom);
                    while (botChoice = Rules.checkCanBeat(botChoice[2], game1.board.fields, 'white')){
                        makeTurn();
                        botChoice[1].dom.removeChild(botChoice[1].dom.lastChild);
                        game1.board.removeCheckerFromField(botChoice[1].dom);
                    }
                }
                Application.isEndGame(game1.board.fields);
            }

        });
    }
    static addCheckerBlack(field) {
        let checker = document.createElement('div');
        checker.classList.add('checker_black');
        field.appendChild(checker);
    }
    //Добавляем белую шашку
    static addCheckerWhite(field) {
        let checker = document.createElement('div');
        checker.classList.add('checker_white');
        field.appendChild(checker);
    }
    static isEndGame(fields) {
        game1.player.getCheckers(fields);
        let player = game1.player.playerCheckers;
        game1.bot.getCheckers(fields);
        let bot = game1.bot.botsCheckers;
        if (player.length === 0){
            confirm("Computer WINS!!!");
            window.addEventListener('DOMContentLoaded', app.init);
        }
        if (bot.length === 0){
            confirm("Player WINS!!!");
            window.addEventListener('DOMContentLoaded', app.init);

        }
        //this.init();
    }
}

var game1 = new Game();
let app = new Application();
window.addEventListener('DOMContentLoaded', app.init);