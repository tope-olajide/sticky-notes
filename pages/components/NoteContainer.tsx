import NoteCard from "./NoteCard"
import { useState } from 'react';
import MainNavigationBar from '../MainNavigationBar';
import Footer from "./Footer";
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
    id: string;
    isMaximized: boolean
}
const defaultNoteData = {
    content: "",
    color: Theme.Yellow,
    id: `${Date.now()}`,
    isMaximized: false
}


const NoteContainer = () => {
    const [notes, setNotes] = useState<Array<INote>>([defaultNoteData]);
    
    const createNote = () => {
        setNotes([...notes,  {
            content: "",
            color: Theme.Yellow,
            id: `${Date.now()}`,
            isMaximized: false
        } ]);
        console.log(notes)
    }

    const changeColor = (noteId: string, color: Theme) => {
        const updatedNotes = notes.map((note:INote) => {
          if (note.id === noteId) {
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
        if (note.id === noteId) {
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
const deleteNote = (noteId: string) => {
    const filteredNotes = notes.filter((note:INote) => {
        return note.id !== noteId;
      })
      setNotes(filteredNotes)
  }

  return (<>
    <section className='main-container'>
      <MainNavigationBar />
      <section className="notes-container">
        {notes.length ? notes.map((note: INote) => {
          return (
            <NoteCard
              createNote={createNote}
              key={note.id}
              changeColor={changeColor}
              id={note.id}
              color={note.color}
              toggleFullscreen={toggleFullscreen}
              isMaximized={note.isMaximized}
              deleteNote={deleteNote}
/*               saveNoteManuallyProps={saveNoteManually}
              contents={note.content} */
/*               isSaved={note.isSaved}
              isSaving={note.isSaving}
              isError={note.isError} */

            />
          )
        })
          : <>
            <section className="no-notes-container">
              <h3>You have no notes</h3><button onClick={createNote}> Create New </button>
            </section>
          </>
        }
      </section>
      <Footer />
    </section>
  </>
  )
}
export default NoteContainer