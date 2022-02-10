const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Notes.js')
const { body, validationResult } = require('express-validator');

// there will be endpoints for notes

// Route1 : Get all the notes using "GET:/" after login is done 
router.get('/fetchallnotes' , fetchuser , async (req,res)=>{
    try{
        const userid = req.user.id;
        const notes = await Note.find({ user:userid})
        res.send(notes);
    }catch(error){
        console.log(error.message);
        res.status(400).json({error:"Internal server error"})
    }
})


// Route2: Adding a new note after a login is done 
router.post('/addnote' , fetchuser , [
    body('title', 'Enter a valid name of minlen 3').isLength({ min: 3 }),
    body('description', "Enter a valid email address").isLength({min:5})
] ,async (req,res)=>{
    try{
    const { title , description , tag } = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).send("Please enter correct values")
    }
    const note = new Note({
        title , description , tag , user :req.user.id
    })
    const savednote = await note.save();
    res.json(savednote)
    console.log(savednote);
    }
    catch(error){
        console.log(error.message);
        res.status(400).send("Internal server error")
    }
})

// ROute3: Update my existing notes using the put request login required
router.put('/updatenote/:id' , fetchuser , async(req, res)=>{
    const {title , description , tag} = req.body;
    // Create newNote object
    const newNote = {};
    if(title) { newNote.title = title};
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    // Find the node to be updated
    let note = await  Note.findById(req.params.id);
    if(!note) {res.status(404).send("Not found")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).json({error:"not alloowed"})
    }
    note = await Note.findByIdAndUpdate(req.params.id ,{$set : newNote} , {new:true} )
    res.json({note})
    // const note = Note.findByIdAndUpdate()
})

// Route4: Delete the node Login required
router.delete('/deletenote/:id' , fetchuser , async(req,res)=>{
    // Find the note to be deleted 
    try {
        let note = await Note.findById(req.params.id);
        if(!note) {res.status(404).send("Note not found")}
        if(note.user.toString()!== req.user.id){
            res.status(401).json({"error":"user not allowed"})
        }
        // Delete the node
        note = await Note.findByIdAndDelete(req.params.id )
        res.json({"Success":"note has been deleted"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})


module.exports = router
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDM4YjhmZDM1N2I4NjcyYmUzOWI2MSIsImlhdCI6MTY0NDM5OTUwM30.VstYBMeOaLjMcNx9JYy5dSOlm6vzlwzyunwRpJsgP08