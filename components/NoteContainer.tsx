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
import { IAllNoteData, Theme } from "../typings";
import NoStickyNote from "./NoStickyNotes";
import { toast, ToastContainer } from 'react-toastify'

const NoteContainer = () => {
  const { loading, error, data } = useQuery<IAllNoteData>(FETCH_ALL_NOTES);
  const [saveNote] = useMutation(SAVE_NOTE);
  const [modifyNote] = useMutation(MODIFY_NOTE);
  const [deleteNoteMutation] = useMutation(DELETE_NOTE);

  const createNote = (currentNoteId?: string) => {
    const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
    const noteCopy = [...noteData!.allNotes];
    const currentNoteIndex: number = noteCopy.findIndex((note) => note.id === currentNoteId);
    const emptyNote = {
      content: "",
      color: Theme.Yellow,
      id: `${Date.now()}`,
      isMaximized: false,
      isDeleteNoteConfirmationVisible: false,
      isSaved: false,
      isSaving: false,
      isError: true
    }
    noteCopy.splice(currentNoteIndex + 1, 0, emptyNote)
    client.writeQuery({
      query: FETCH_ALL_NOTES,
      data: {
        allNotes: [...noteCopy],
      },
    });
  }

  const changeColor = (id: string, color: Theme) => {
    const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
    const updatedNotes = noteData!.allNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note, color: color
        }
      }
      return note
    });

    client.writeQuery({
      query: FETCH_ALL_NOTES,
      data: {
        allNotes: updatedNotes
      },
    });
  }

  const toggleFullscreen = (id: string) => {
    const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
    const updatedNote = noteData!.allNotes.map((note) => {
      if (note.id === id) {
        return { ...note, isMaximized: !note.isMaximized }
      }
      return note
    })
    client.writeQuery({
      query: FETCH_ALL_NOTES,
      data: {
        allNotes: updatedNote
      },
    });
  }

  const toggleDeleteNoteConfirmationMessage = (noteId: string) => {
    const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
    const updatedNote = noteData!.allNotes.map((note) => {
      if (note.id === noteId) {
        return { ...note, isDeleteNoteConfirmationVisible: !note.isDeleteNoteConfirmationVisible }
      }
      return note
    })
    client.writeQuery({
      query: FETCH_ALL_NOTES,
      data: {
        allNotes: updatedNote
      },
    });
  }

  const showSavingNoteIcon = (id: string) => {
    const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
    const updatedNote = noteData!.allNotes.map((note) => {
      if (note.id === id) {
        return { ...note, isSaving: true }
      }
      return note
    })
    client.writeQuery({
      query: FETCH_ALL_NOTES,
      data: {
        allNotes: updatedNote
      },
    });
  }
  const hideSavingNoteIcon = (id: string) => {
    const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
    const updatedNote = noteData!.allNotes.map((note) => {
      if (note.id === id) {
        return { ...note, isSaving: false }
      }
      return note
    })
    client.writeQuery({
      query: FETCH_ALL_NOTES,
      data: {
        allNotes: updatedNote
      },
    });
  }

  const showErrorIcon = (id: string) => {
    const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
    const updatedNote = noteData!.allNotes.map((note) => {
      if (note.id === id) {
        return { ...note, isError: true }
      }
      return note
    })
    client.writeQuery({
      query: FETCH_ALL_NOTES,
      data: {
        allNotes: updatedNote
      },
    });
  }

  const hideErrorIcon = (id: string) => {
    const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
    const updatedNote = noteData!.allNotes.map((note) => {
      if (note.id === id) {
        return { ...note, isError: false }
      }
      return note
    })
    client.writeQuery({
      query: FETCH_ALL_NOTES,
      data: {
        allNotes: updatedNote
      },
    });
  }
  const deleteNote = async (noteId: string, isSaved: boolean) => {
    const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
    const filteredNotes = noteData!.allNotes.filter((note) => {
      return note.id !== noteId;
    })
    client.writeQuery({
      query: FETCH_ALL_NOTES,
      data: {
        allNotes: filteredNotes
      },
    });
    if (isSaved) {
      await deleteNoteMutation({ variables: { noteId } });
    }
  }
  const saveUserNote = async (id: string, color: Theme, contents: string, isSaved: boolean) => {
    try {
      if (isSaved) {
        showSavingNoteIcon(id);
        hideErrorIcon(id);
        await modifyNote({ variables: { data: { color, content: contents }, noteId: id } });
        hideSavingNoteIcon(id);
      }
      else {
        showSavingNoteIcon(id);
        hideErrorIcon(id);
        const savedNote = await saveNote({ variables: { data: { color, content: contents } } });
        hideSavingNoteIcon(id);
        const noteData = client.readQuery<IAllNoteData>({ query: FETCH_ALL_NOTES });
        const updatedNote = noteData!.allNotes.map((note) => {
          if (note.id === id) {
            return { ...note, isSaved: true, id: savedNote.data.newNote.id, content: savedNote.data.newNote.content }
          }
          return note
        })
        client.writeQuery({
          query: FETCH_ALL_NOTES,
          data: {
            allNotes: updatedNote
          },
        });
      }
    }
    catch (error: any) {
      hideSavingNoteIcon(id);
      showErrorIcon(id);
      if (error.networkError?.message === "Response not successful: Received status code 401") {
        toast.error('Your session has expired. Kindly login again', {
          position: "bottom-center"
        });
        localStorage.setItem("isLoggedIn", 'false');
        router.push('/sign-in')
      }

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
    if (error.networkError?.message === "Response not successful: Received status code 401") {
      toast.error('Your session has expired. Kindly login again', {
        position: "bottom-center"
      });
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
  if (!data!.allNotes.length) {
    return (
      <>
        <section className='main-container'>
          <MainNavigationBar />
          <NoStickyNote
            createNote={() => createNote()}
          />
          <Footer />
        </section>
      </>
    )
  }
  return (<>
    <section className='main-container'>
      <MainNavigationBar />
      <ToastContainer />
      <section className="notes-container">
        {data!.allNotes.map((eachNote) => {
          return (
            <NoteCard
              createNote={createNote}
              key={eachNote.id}
              changeColor={changeColor}
              id={eachNote.id}
              color={eachNote.color}
              toggleFullscreen={toggleFullscreen}
              isMaximized={eachNote.isMaximized}
              deleteNote={deleteNote}
              toggleDeleteNoteConfirmationMessage={toggleDeleteNoteConfirmationMessage}
              isDeleteNoteConfirmationVisible={eachNote.isDeleteNoteConfirmationVisible}
              contents={eachNote.content}
              saveUserNote={saveUserNote}
              isSaved={eachNote.isSaved}
              isSaving={eachNote.isSaving}
              isError={eachNote.isError}
            />
          )
        })
        }
      </section>
      <Footer />
    </section>
  </>
  )
}
export default NoteContainer