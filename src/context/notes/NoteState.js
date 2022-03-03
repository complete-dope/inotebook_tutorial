import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "620398dabffaf6f3e835bd17",
            "user": "62039187c004297b5821dc09",
            "title": "maa ki ladla",
            "description": "bigaad gya",
            "tag": "General",
            "date": "2022-02-09T10:35:06.936Z",
            "__v": 0
        },
        {
            "_id": "620398dabffhf6f3e835be17",
            "user": "62039187c004297b5821dc09",
            "title": "HEllo world its me ",
            "description": " gya",
            "tag": "General",
            "date": "2022-02-09T10:35:06.936Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)
  
    return (
        <noteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;