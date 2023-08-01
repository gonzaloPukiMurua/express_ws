const reader = require('xlsx');
const file = reader.readFile('./Sorteo Estructuras.xlsx');

let data = [];
const sheets = file.SheetNames;
console.log(sheets);
for(let i = 0; i < sheets.length; i++){
    
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    //console.log('Esta hoja', temp);
    console.log(temp.length);
    temp.forEach((res) => data.push(res));
};

console.log(data.length);
module.exports = {sheets};