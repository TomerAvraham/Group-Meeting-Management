const router = require('express').Router()
const connection = require('../helpers/mysql')

router.get('/', (req, res) => {
    connection.query(`SELECT * from devgroups`, (err, groups) => {
        if (err) return res.sendStatus(500)
        res.json(groups)
    })
})

module.exports = router