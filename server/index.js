require('./helpers/mysql')
const express = require('express')
const cors = require('cors')
const port = 1000
const app = express()

app.use(express.json())
app.use(cors())
app.use('/groups', require('./routes/groups'))
app.use('/meeting', require('./routes/meeting'))

app.listen(port, () => console.log(`Server ${port} is on`))