const querys = {
    getAllTables: "SELECT * FROM Sys.Tables",
    createTable: "",
    getAllRecords: "SELECT TOP(500) * FROM [dbo].[AuxGrafBolillas]",
    getRecordById: "SELECT * FROM [dbo].[@table] Where Id = @Id",
    addNewRecord: "INSERT INTO [dbo].[@table] @headers VALUES @values;",
}

module.exports = {querys}