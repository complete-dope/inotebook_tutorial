import React from 'react'

const NoteItem = (props) => {
    const { note } = props
    console.log("these are note ", note);
    console.log("These are porps notes ", props.note);
    return (
        <div className="row my-3" >
            {/* <img className="card-img-top" src="https://wallpaperaccess.com/full/52447.jpg" alt="Card image cap"/> */}
                <div className="card-body">
                    <h5 className="card-title" >{note.title}</h5>
                    <p className="card-text" >{note.description}</p>
                </div>
        </div>
    )
}

export default NoteItem
// ya toh seedha props m aa jao
// ya notes ke thru props khecho