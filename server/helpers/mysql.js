const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meeting_db'
})

connection.connect(err => {
    if (err) throw err
    console.log('mysql connected')
})

module.exports = connection