import React ,{useContext,useState} from 'react'
import NoteItem from './NoteItem'

import contextValue from '../context/notes/noteContext'
const Notes = () => {
    const context = useContext(contextValue)
    const { notes, setNotes } = context
    return (
        <div className='container my-3 mx-5'>
            <h2>Your notes are here</h2>
            {notes.map((note) => {
                return (
                    <NoteItem note={note} key = {note._id}/>
                )
            })}
        </div>
    )
}

export default Notes


