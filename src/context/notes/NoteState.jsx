import React, { useState } from 'react';
import NoteContext from './NoteContext';
const NoteState = (props) => {
    const initialNotes=[
        {
          "_id": "6706288f6e8533fs840d58c24",
          "user": "67057436e4be5ac411e439be",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personal",
          "date": "2024-10-09T06:54:07.248Z",
          "__v": 0
        },
        {
          "_id": "670781031385c98bf2ffce0425",
          "user": "67057436e4be5ac411e439be",
          "title": "hsina",
          "description": "please go away",
          "tag": "rajakar",
          "date": "2024-10-10T07:23:47.767Z",
          "__v": 0
        },
        {
          "_id": "670781131385c98bf2ce0pll427",
          "user": "67057436e4be5ac411e439be",
          "title": "khleda",
          "description": "go away",
          "tag": "rajakar also",
          "date": "2024-10-10T07:24:03.154Z",
          "__v": 0
        },
        {
            "_id": "6706288f6e8533f8h40d5oo8c24",
            "user": "67057436e4be5ac411e439be",
            "title": "my title",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2024-10-09T06:54:07.248Z",
            "__v": 0
          },
          {
            "_id": "6706288f6e8533f48ii40d58c24",
            "user": "67057436e4be5ac411e439be",
            "title": "my title",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2024-10-09T06:54:07.248Z",
            "__v": 0
          },
          {
            "_id": "67046288f6e8533f84h220d58c24",
            "user": "67057436e4be5ac411e439be",
            "title": "my title",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2024-10-09T06:54:07.248Z",
            "__v": 0
          }
      ]
   const [notes,setnotes]=useState(initialNotes);
    return (
        <NoteContext.Provider value={{notes,setnotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;