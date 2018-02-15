/**
 * Created by Юрий on 07.01.2018.
 */
class Rules {
    static findPossibleOptions(field, fields, isBot){
        let i = field.i;
        let j = field.j;
        let possible = [];
        let coefi = -1;
        if (isBot)
            coefi = 1;


        if (fields[i][j].checker.type === 'common'){
            if (fields[i + coefi][j + 1])
                if (!fields[i + coefi][j + 1].checker) {//.color === 'white')){
                possible.push(fields[i + coefi][j + 1].dom);
            }
            if (fields[i + coefi][j - 1])
                if (!fields[i + coefi][j - 1].checker) {//.color === 'white')){
                possible.push(fields[i + coefi][j - 1].dom);
            }
        }
        if (fields[i][j].checker.type === 'queen'){
            function findPath(coef1, coef2){
                let i = field.i;
                let j = field.j;
                while ((fields[i + coef1] && fields[i + coef1][j + coef2]) && (!fields[i + coef1][j + coef2].checker)){
                    possible.push(fields[i + coef1][j + coef2].dom);
                    i += coef1;
                    j += coef2;
                }
            }
            findPath(-1, -1);
            findPath(1, 1);
            findPath(-1, 1);
            findPath(1, -1);
        }

        return possible;
    }

    static checkCanBeat(field, fields, color){
        let i = field.i;
        let j = field.j;
        let output;
        let checkerType = fields[i][j].checker.type;
        if (checkerType === "common")
            return check(checkingCommon);
        if (checkerType === "queen")
            return check(checkingQueen);

        function checkingCommon(coef1, coef2){
            if ((fields[i + coef1] && fields[i + coef1][j + coef2]) &&
                (fields[i + coef1][j + coef2].checker) &&
                (fields[i + coef1][j + coef2].checker.color === color) &&
                (fields[i + coef1 + coef1] && fields[i + coef1 + coef1][j + coef2 + coef2]) &&
                (!fields[i + coef1 + coef1][j + coef2 + coef2].checker))
            //1 параметр - наша шашка
            //2 - шашка врага
            //3 - на какое поле попадём после битья
                return [fields[i][j], fields[i + coef1][j + coef2], fields[i + coef1 + coef1][j + coef2 + coef2].dom];

        }

        function checkingQueen(coef1, coef2){
            let i = field.i;
            let j = field.j;
            while (fields[i + coef1] && fields[i + coef1][j + coef2]){
                if ((fields[i + coef1] && fields[i + coef1][j + coef2]) &&
                    (fields[i + coef1][j + coef2].checker) &&
                    (fields[i + coef1][j + coef2].checker.color === color) &&
                    (fields[i + coef1 + coef1] && fields[i + coef1 + coef1][j + coef2 + coef2]) &&
                    (!fields[i + coef1 + coef1][j + coef2 + coef2].checker)) {
                    //1 параметр - наша шашка
                    //2 - шашка врага
                    //3 - на какое поле попадём после битья
                    return [fields[field.i][field.j], fields[i + coef1][j + coef2], fields[i + coef1 + coef1][j + coef2 + coef2].dom];
                }

                i += coef1;
                j += coef2;
            }
        }

        function check(check){
            if (output = check(1, 1))
                return output;
            if (output = check(-1, -1))
                return output;
            if (output = check(1, -1))
                return output;
            if (output = check(-1, 1))
                return output;
            return output;
        }

    }

    //Возврат возможностей ходов битья
    static checkCanBeatMany(field, fields, color){
        let i = field.i;
        let j = field.j;
        let output = [];
        function checking(coef1, coef2){
            if ((fields[i + coef1] && fields[i + coef1][j + coef2]) &&
                (fields[i + coef1][j + coef2].checker) &&
                (fields[i + coef1][j + coef2].checker.color === color) &&
                (fields[i + coef1 + coef1][j + coef2 + coef2]) &&
                (!fields[i + coef1 + coef1][j + coef2 + coef2].checker))
                //1 параметр - наша шашка
                //2 - шашка врага
                //3 - на какое поле попадём после битья
                output.push([fields[i][j], fields[i + coef1][j + coef2], fields[i + coef1 + coef1][j + coef2 + coef2].dom]);
        }
        checking(1, 1);
        checking(-1, -1);
        checking(1, -1);
        checking(-1, 1);
        if (output.length === 0)
            return undefined;
        return output;
    }

    static checkQueenUpgrade(field, fields, isBot){
        let i = field.i;
        let j = field.j;
        let border = 0;
        if (isBot)
            border = 7;
        if (field.i === border){
            fields[i][j].checker.type = 'queen';
        }
    }
}