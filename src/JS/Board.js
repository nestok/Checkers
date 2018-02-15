/**
 * Created by Юрий on 06.01.2018.
 */
class Board {
    constructor(){
        this.fields = [];//new Array(8).fill([]);
    }
    addField(arr){
        this.fields.push(arr);
    }
    addCheckerToField(field, color, type){
        this.fields[field.i][field.j].checker = new Checker(field, color, type);
    }
    removeCheckerFromField(field){
        this.fields[field.i][field.j].checker = undefined;
    }
}