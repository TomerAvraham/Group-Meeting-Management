const router = require('express').Router()
const connection = require('../helpers/mysql')

router.get('/bygroup/:groupID', (req, res) => {
    const {groupID} = req.params
    connection.query(`select meeting.id, meeting.groupID, meetingStart, meetingEnd, 
    description, room, devgroups.name from meeting inner join devgroups on 
    groupID = devgroups.id where groupID = ${groupID}`, (err, groups) => {
        if (err) return res.sendStatus(500)
        res.json(groups)
    })
})

router.post('/add', (req, res) => {
    const {groupID, meetingStart, meetingEnd, description, room} = req.body
    connection.query(`insert into meeting (groupID, meetingStart, meetingEnd, description, room)
    values (${groupID}, "${meetingStart}", "${meetingEnd}", "${description}", "${room}")`, (err, result) => {
        if (err) return res.sendStatus(500)
        res.json(result)
    })
})

module.exports = router