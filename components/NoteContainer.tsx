import NoteCard from "./NoteCard"
import { useState } from 'react';
import MainNavigationBar from './MainNavigationBar';
import Footer from "./Footer";
import { FETCH_ALL_NOTES } from "../queries/note";
import { useQuery } from "@apollo/client";
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
    const [notes, setNotes] = useState<Array<INote>>([]);
    const { loading, error, data } = useQuery(FETCH_ALL_NOTES);

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
  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }
  if (error) {
    return (
      <>
        <h1>Error</h1>
      </>
    )
  }

  return (<>
  {console.log(data.allNotes)}
    <section className='main-container'>
      <MainNavigationBar />
      <section className="notes-container">
        {data.allNotes.length ? data.allNotes.map((note: INote) => {
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
              contents={note.content}
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