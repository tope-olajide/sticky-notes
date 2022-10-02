import { INoStickyNoteProps } from "../typings"


const NoStickyNote: React.FC<INoStickyNoteProps> = (props) => {
    return (
        <>
            <section className="no-notes-container">
              <h3>You have not added any sticky notes</h3><button onClick={props.createNote}> Add New </button>
            </section>
        </>
    )
}
export default NoStickyNote