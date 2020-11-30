import React, { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MeetingList from "./MeetingList";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



function Form() {
  const [groups, setGroups] = useState([]);
  const [pickedGroupID, setPickedGroupID] = useState(0)
  const [pickGroupMeeting, setPickGroupMeeting] = useState([])
  const [formInputValue, setFormInputValue] = useState({})

  const fetchGroups = async () => {
    const res = await fetch("http://localhost:1000/groups");
    const data = await res.json();
    setGroups(data);
  };

  const handelSelectChange = (groupID) => {
      setPickedGroupID(groupID)
      fetchPickedGroupMeting(groupID)
  }

  const fetchPickedGroupMeting = async (id) => {
      const res = await fetch(`http://localhost:1000/meeting/bygroup/${id}`)
      const data = await res.json()
      setPickGroupMeeting(data)
  }

  const handelInputChange = (e) => {
    switch (e.target.id) {
        case "meetingStart":
            const resStart = e.target.value.replace("T", " ")
            setFormInputValue(prev => ({...prev, meetingStart:resStart}))
            break;
        case "meetingEnd":
            const resEnd = e.target.value.replace("T", " ")
            setFormInputValue(prev => ({...prev, meetingEnd:resEnd}))
            break;
        case "description":
            setFormInputValue(prev => ({...prev, description:e.target.value}))
            break;
        case "room":
            setFormInputValue(prev => ({...prev, room:e.target.value}))
            break;
        default:
            break;
    }
  }

  const handelAddButton = async () => {
    const validDate = `${formInputValue.meetingStart.replace(' ', 'T')}:00.000Z`
    const match = pickGroupMeeting.find(m => m.meetingStart == validDate)
    if (match) alert ('Date Already schedule')
    const res = await fetch('http://localhost:1000/meeting/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            groupID: pickedGroupID,
            meetingStart: formInputValue.meetingStart,
            meetingEnd: formInputValue.meetingEnd,
            description: formInputValue.description,
            room: formInputValue.room
        }) 
      })
    fetchPickedGroupMeting(pickedGroupID)
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
      <>
    <div className="form">
      <div className="form__spacing">
        <Select onChange={(e) => handelSelectChange(e.target.value)}>
          {groups.map((group) => (
              <MenuItem value={group.id}>{group.name}</MenuItem>
          ))}
        </Select>
      </div>
      <div className="form__spacing">
      <TextField
        id="meetingStart"
        label="From"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        onChange={e => handelInputChange(e)}
      />
      </div>
      <div className="form__spacing">
      <TextField
        id="meetingEnd"
        label="To"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        onChange={e => handelInputChange(e)}
      />
      </div>
      <div className="input__group">
        <TextField onChange={e => handelInputChange(e)} id="description"  label="Description" />
        <TextField onChange={e => handelInputChange(e)} id="room"  label="Room" />
      </div>
      <div className="form__spacing">
      <Button onClick={handelAddButton} variant="contained" color="primary">
        ADD
      </Button>
      </div>
    </div>
    <div className="form__spacing">
        <MeetingList meets={pickGroupMeeting}/>
    </div>
    </>
  );
}

export default Form;
