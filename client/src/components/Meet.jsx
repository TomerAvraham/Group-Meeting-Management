import React from 'react'
import Paper from '@material-ui/core/Paper';


function Meet({meeting}) {

    const handelDateFormat = (str) => {
        const date = new Date(str)
        return <p>Date:{`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`} Time: {`${date.getHours()}:${date.getSeconds()}0`}</p>
    } 

    const showDateSum = (date1, date2) => {
        date2 = new Date(date2) 
        date1 = new Date(date1) 
        const differentInTime = date2.getTime() - date1.getTime()
        const differentInDays = differentInTime / (1000 * 3600 * 24)

        return <p>Total: {differentInDays * 24} Hours</p>
    }

    return (
        <Paper className="paper" elevation={3}>
            <div className="inner__paper" >
                <h4>{meeting.name}</h4>
                <p>From: {handelDateFormat(meeting.meetingStart)}</p>
                <p>To: {handelDateFormat(meeting.meetingEnd)}</p>
                {showDateSum(meeting.meetingStart, meeting.meetingEnd)}
                <p>Description: {meeting.description}</p>
                <p>Room: {meeting.room}</p>
            </div>
        </Paper>
    )
}

export default Meet
