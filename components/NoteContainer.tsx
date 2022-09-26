import NoteCard from "./NoteCard"
import { useState } from 'react';
import MainNavigationBar from './MainNavigationBar';
import Footer from "./Footer";
import { FETCH_ALL_NOTES } from "../queries/note";
import { useMutation, useQuery } from "@apollo/client";
import client from "../client";
import { MODIFY_NOTE, SAVE_NOTE } from "../mutations/note";
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
    isMaximized: boolean;
    isSaved:boolean;
    isSaving:boolean;
    isError:boolean;
}

const NoteContainer = () => {
    const [notes, setNotes] = useState<Array<INote>>([]);
    const { loading, error, data } = useQuery(FETCH_ALL_NOTES);

    const [saveNote,] = useMutation(SAVE_NOTE);
    const [modifyNote,] = useMutation(MODIFY_NOTE);
    const createNote = () => {
        setNotes([...notes,  {
            content: "",
            color: Theme.Yellow,
            id: `${Date.now()}`,
            isMaximized: false,
            isSaved: false,
            isSaving:false,
            isError:true
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

const showSavingNoteIcon = (id: string) => {
  const noteData = client.readQuery({ query: FETCH_ALL_NOTES });
  const newNote = noteData.allNotes.map((note: INote) => {
    if (note.id === id) {
      return { ...note, isSaving: true }
    }
    return note
  })
  client.writeQuery({
    query: FETCH_ALL_NOTES,
    data: {
      allNotes: newNote
    },
  });
}
const hideSavingNoteIcon = (id: string) => {
  const noteData = client.readQuery({ query: FETCH_ALL_NOTES });
  const newNote = noteData.allNotes.map((note: INote) => {
    if (note.id === id) {
      return { ...note, isSaving: false }
    }
    return note
  })
  client.writeQuery({
    query: FETCH_ALL_NOTES,
    data: {
      allNotes: newNote
    },
  });
}

const showErrorIcon = (id: string) => {
  const noteData = client.readQuery({ query: FETCH_ALL_NOTES });
  const newNote = noteData.allNotes.map((note: INote) => {
    if (note.id === id) {
      return { ...note, isError: true }
    }
    return note
  })
  client.writeQuery({
    query: FETCH_ALL_NOTES,
    data: {
      allNotes: newNote
    },
  });
}

const hideErrorIcon = (id: string) => {
  const noteData = client.readQuery({ query: FETCH_ALL_NOTES });
  const newNote = noteData.allNotes.map((note: INote) => {
    if (note.id === id) {
      return { ...note, isError: false }
    }
    return note
  })
  client.writeQuery({
    query: FETCH_ALL_NOTES,
    data: {
      allNotes: newNote
    },
  });
}
const deleteNote = (noteId: string) => {
    const filteredNotes = notes.filter((note:INote) => {
        return note.id !== noteId;
      })
      setNotes(filteredNotes)
  }
  const saveUserNote = async (id: string, color: Theme, contents: string, isSaved: boolean) => {

    try {
       if (isSaved) {
        showSavingNoteIcon(id);
        hideErrorIcon(id);
        const modifiedNote = await modifyNote({ variables: { data: { color, content: contents }, noteId:id } });
        console.log(modifiedNote.data);
        hideSavingNoteIcon(id);
      }
      else {
        showSavingNoteIcon(id);
        hideErrorIcon(id);
        const savedNote = await saveNote({ variables: { data: { color, content: contents } } });
        console.log(savedNote.data);
        console.log(savedNote.data.newNote.id);
        hideSavingNoteIcon(id);
        const noteData = client.readQuery({ query: FETCH_ALL_NOTES });
        const newNote = noteData.allNotes.map((note: INote) => {
          if (note.id === id) {
            return { ...note, isSaved: true, id: savedNote.data.newNote.id, content: savedNote.data.newNote.content }
          }
          return note
        })
        client.writeQuery({
          query: FETCH_ALL_NOTES,
          data: {
            allNotes: newNote
          },
        });
      } 
    }
    catch (error) {
      console.log(error)
      hideSavingNoteIcon(id);
      showErrorIcon(id);
    }
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
              saveUserNote={saveUserNote}
              isSaved={note.isSaved}
              isSaving={note.isSaving}
              isError={note.isError}
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