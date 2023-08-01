const querys = {
    getAllTables: "SELECT * FROM Sys.Tables",
    createTable: "",
    getAllRecords: "SELECT TOP(500) * FROM [dbo].[@table]",
    getRecordById: "SELECT * FROM [dbo].[@table] Where Id = @Id",
    addNewRecord: "INSERT INTO [dbo].[@table] (name, description, quantity) VALUES (@name,@description,@quantity);",
}

module.exports = {querys}