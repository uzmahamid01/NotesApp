import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

/**
     * Challenge:
     * Lazily initialize our `notes` state so it doesn't
     * reach into localStorage on every single re-render
     * of the App component
     */
    
export default function App() {
    
    const [notes, setNotes] = React.useState(
       () =>  JSON.parse(localStorage.getItem("notes")) || []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    // const [state, setState] = React.useState(console.log("state initialization"))

    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
        console.log(notes[0].body.split("\n"))
    }, [notes])
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            for (let i = 0; i < oldNote.length; i++){
                const oldNotes = oldNote[i]
                if(oldNote.id === currentNoteId ){
                    newArray.unshift({ ...oldNote, body: text})
                } 
                else{
                    newArray.push(oldNote)
                }
            }
            return newArray
            //create a new emmpty array
            //loop over the origibal array
                //if the id matches  
                    //puth the updated note at the 
                    //beginning of the new array
                //else
                    //push the old note to the end
                    //of the new arra

        }))
    }

    //this does not rearrange the notes
    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //     return oldNote.id === currentNoteId
    //         ? { ...oldNote, body: text }
    //         : oldNote
    // }))

     /**
     * Challenge: complete and implement the deleteNote function
     * 
     * Hints: 
     * 1. What array method can be used to return a new
     *    array that has filtered out an item based 
     *    on a condition?
     * 2. Notice the parameters being based to the function
     *    and think about how both of those parameters
     *    can be passed in during the onClick event handler
     */
    
    function deleteNote(event, noteId) {
        event.stopPropagation()
        // Your code here
        setNotes(oldNote => oldNotes.filter(note =>note.id !== noteId))
    }

    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
