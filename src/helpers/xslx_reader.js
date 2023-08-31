import reader from 'xlsx';
const file = reader.readFile('sorteo.xlsx');
let data = [];
const sheets = file.SheetNames;

for(let i = 0; i < sheets.length; i++){
    
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]], {header: 1});
    temp.forEach((res) => data.push(res));
};

export default file;