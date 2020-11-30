import React from 'react'
import Grid from '@material-ui/core/Grid';
import Meet from './Meet'

function MeetingList({ meets }) {
    return (
        <Grid container spacing={4}>
            {meets && meets.map((meet, i) => (
                <Grid key={i} item>
                    <Meet meeting={meet} key={i}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default MeetingList
