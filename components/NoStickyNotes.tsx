import { INoStickyNoteProps } from "../typings"


const NoStickyNotes: React.FC<INoStickyNoteProps> = (props) => {
    return (
        <>
            <section className="no-notes-container">
              <h3>You have no sticky notes</h3><button onClick={props.createNote}> Add New </button>
            </section>
        </>
    )
}
export default NoStickyNotes