const queries = {
    getAllTables: "SELECT * FROM Sys.Tables",
    createTable: "",
    getAllRecords: "SELECT TOP(500) * FROM [dbo].[@table]",
    getRecordById: "SELECT * FROM [dbo].[@table] Where Id = @Id",
    addNewRecord: "INSERT INTO [dbo].[@table] @headers VALUES @values;",
}

export default {queries}