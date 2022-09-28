import NoteCard from "./NoteCard"
import MainNavigationBar from './MainNavigationBar';
import Footer from "./Footer";
import { FETCH_ALL_NOTES } from "../queries/note";
import { useMutation, useQuery } from "@apollo/client";
import client from "../client";
import { DELETE_NOTE, MODIFY_NOTE, SAVE_NOTE } from "../mutations/note";
import router from "next/router";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
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
    const { loading, error, data } = useQuery(FETCH_ALL_NOTES);
    const [saveNote] = useMutation(SAVE_NOTE);
    const [modifyNote] = useMutation(MODIFY_NOTE);
    const [deleteNoteMutation] = useMutation(DELETE_NOTE);
    const createNote = (currentNoteId:string) => {
      const noteData = client.readQuery({ query: FETCH_ALL_NOTES });
      const noteCopy = [...noteData.allNotes];
      const currentNoteIndex: number = noteCopy.findIndex((note:INote) => note.id === currentNoteId);
      const emptyNote =  {
        content: "",
        color: Theme.Yellow,
        id: `${Date.now()}`,
        isMaximized: false,
        isSaved: false,
        isSaving:false,
        isError:true
    }
    noteCopy.splice(currentNoteIndex + 1, 0, emptyNote)
    client.writeQuery({
      query:FETCH_ALL_NOTES,
      data: {
        allNotes: [...noteCopy],
      },
    });
    console.log(noteCopy)
    }

    const changeColor = (id: string, color: Theme) => {
      const noteData = client.readQuery({ query: FETCH_ALL_NOTES });
      const updatedNotes = noteData.allNotes.map((note: INote) => {
        if (note.id === id) {
          return {
            ...note, color: color
          }
        }
        return note
      })
  
      client.writeQuery({
        query: FETCH_ALL_NOTES,
        data: {
          allNotes: updatedNotes
        },
      });
    }
      
    const toggleFullscreen = (id: string) => {
      const noteData = client.readQuery({ query: FETCH_ALL_NOTES });
      console.log(noteData)
      const newNote = noteData.allNotes.map((note: INote) => {
        if (note.id === id) {
          return { ...note, isMaximized: !note.isMaximized }
        }
        return note
      })
      console.log(newNote);
      client.writeQuery({
        query: FETCH_ALL_NOTES,
        data: {
          allNotes: newNote
        },
      });
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
const deleteNote = async (noteId: string, isSaved:boolean) => {
  const noteData = client.readQuery({ query: FETCH_ALL_NOTES });
    const filteredNotes = noteData.allNotes.filter((note:INote) => {
        return note.id !== noteId;
      })
      client.writeQuery({
        query: FETCH_ALL_NOTES,
        data: {
          allNotes: filteredNotes
        },
      });
      if(isSaved){
        await deleteNoteMutation({ variables: { noteId }});
      }
       
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
    catch (error:any) {
      console.log(error)
      if(error.message === "You are not authenticated"){
        router.push('/sign-in');
        localStorage.setItem("isLoggedIn", 'false');
      }
      hideSavingNoteIcon(id);
      showErrorIcon(id);
    }
  }
  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  }
  if (error) {
    if(error.message === "You are not authenticated"){
      localStorage.setItem("isLoggedIn", 'false');
      router.push('/sign-in')
    }
    return (
      <>
         <section className='main-container'>
      <MainNavigationBar />
        <ErrorPage />
        <Footer />
        </section>
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
              <h3>You have no notes</h3><button onClick={()=>createNote('0')}> Create New </button>
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