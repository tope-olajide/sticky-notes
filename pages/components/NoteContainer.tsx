import NoteCard from "./NoteCard"
import { useState } from 'react';

enum Theme {
    Yellow = "yellow",
    Green = "green",
    Pink = "pink",
    Purple = "purple",
    Blue = "blue",
    Gray = "gray",
    Charcoal = "charcoal"
}

interface INote {
    content: string;
    color: Theme;
    noteId: string;
    isMaximized: boolean
}
const defaultNoteData = {
    content: "",
    color: Theme.Yellow,
    noteId: `${Date.now()}`,
    isMaximized: false
}


const NoteContainer = () => {
    const [notes, setNotes] = useState<Array<INote>>([defaultNoteData]);
    
    const createNote = () => {
        setNotes([...notes,  {
            content: "",
            color: Theme.Yellow,
            noteId: `${Date.now()}`,
            isMaximized: false
        } ]);
        console.log(notes)
    }

    const changeColor = (noteId: string, color: Theme) => {
        const updatedNotes = notes.map((note:INote) => {
          if (note.noteId === noteId) {
            return {
              ...note, color: color
            }
          }
          return note
        })
        setNotes(updatedNotes)
      }
      
const toggleFullscreen = (noteId:string) => {
    const updatedNotes = notes.map((note:INote) => {
        if (note.noteId === noteId) {
            if (note.isMaximized === false) {
               return {...note, isMaximized: true}
              }
              else {
                return {...note, isMaximized: false}
              }
            }
        return note
      })
      setNotes(updatedNotes)
}
const deleteNote = (id: string) => {
    const filteredNotes = notes.filter((note:INote) => {
        return note.noteId !== id;
      })
      setNotes(filteredNotes)
  }

if(!notes.length) {
    return(
        <>
        <section className="no-notes-container">
        <h3>You have no notes</h3><button onClick={createNote}> Create New </button>
        </section>
        </>
    )
            
          }
    return (
        
        <section className="notes-container">
            {notes.map((note: INote) => {
                return (
                    <NoteCard 
                    createNote = {createNote}
                    key = {note.noteId}
                    changeColor = {changeColor}
                    noteId = {note.noteId}
                    color = {note.color}
                    toggleFullscreen = {toggleFullscreen}
                    isMaximized ={note.isMaximized}
                    deleteNote ={deleteNote}
                    />
                )
            })}
        </section>
         
    )
}
export default NoteContainer