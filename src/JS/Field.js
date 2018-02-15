/**
 * Created by Юрий on 06.01.2018.
 */
class Field {
    constructor(field, checker){
        this.dom = field;
        this.position = [field.i, field.j];
        if (field.checkerColor)
            this.checker = new Checker(this.dom, field.checkerColor);
        else
            this.checker = undefined;
    }
    static getCheckerType(field, fields){
        return fields[field.i][field.j].checker.type;
    }
}