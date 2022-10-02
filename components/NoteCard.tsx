import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWindowMaximize, faTrash, faSave, faExclamationTriangle, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useState } from 'react';
import { INoteCardProps, Theme } from '../typings';

const NoteCard: React.FC<INoteCardProps> = (props) => {
const [noteContents, setNoteContents] = useState('');

const changeNoteColor = (id:string, color:Theme) => {
    props.changeColor(id, color);
    props.saveUserNote(id, color, noteContents||props.contents, props.isSaved)
}

    let timer:NodeJS.Timeout;
    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        clearTimeout(timer)
        const newTimer: NodeJS.Timeout = setTimeout(() => {
            setNoteContents(event.target.value)
            props.saveUserNote(props.id, props.color, event.target.value, props.isSaved)
        }, 2000)
        timer = newTimer;
    }

    if (props.isDeleteNoteModalVisible) {
        return (
            <section className="delete-note-modal" id={props.color}>
                <h3>This note will be permanently deleted, continue?</h3>
                <div>
                    <button onClick={() => props.deleteNote(props.id, props.isSaved)}> Yes </button>
                    <button onClick={() => props.toggleDeleteNoteModal(props.id)}> No</button>
                </div>
            </section>
        )
    }
    return (
        <>
            <div className={props.isMaximized ? "card-maximized" : "card"} id={props.color}>
                <div className="card-header">
                    <div className="icon-container">
                        <div className="left-icon">
                            <div className="icon" onClick={() => props.createNote(props.id)}>{props.isMaximized ?null:<FontAwesomeIcon icon={faPlus} />}</div>
                            <div className="icon" >{props.isSaving ? <FontAwesomeIcon icon={faSpinner} spin />:props.isError ? <FontAwesomeIcon icon={faExclamationTriangle} />:props.isSaved ? <FontAwesomeIcon icon={faCheck} /> : null}</div>
                        </div>
                        <div className="right-icon">
                            <div className="icon" onClick={() => props.toggleDeleteNoteModal(props.id)} >{props.isMaximized ?null:<FontAwesomeIcon icon={faTrash} /> }</div>
                            <div className="icon" onClick={()=>props.saveUserNote(props.id, props.color, noteContents||props.contents, props.isSaved)}><FontAwesomeIcon icon={faSave} /></div>
                            <div className="icon" onClick={() => props.toggleFullscreen(props.id)}><FontAwesomeIcon icon={faWindowMaximize} /></div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-container">
                        <textarea defaultValue={props.contents} onChange={(e) => handleContentChange(e)} className="text-area"></textarea>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="theme-color-container">
                        <div className="theme-color yellow" onClick={() => changeNoteColor(props.id, Theme.Yellow)} > </div>
                        <div className="theme-color green" onClick={() =>changeNoteColor(props.id, Theme.Green)}></div>
                        <div className="theme-color pink" onClick={() => changeNoteColor(props.id, Theme.Pink)}></div>
                        <div className="theme-color purple" onClick={() => changeNoteColor(props.id, Theme.Purple)}></div>
                        <div className="theme-color blue" onClick={() => changeNoteColor(props.id, Theme.Blue)}></div>
                        <div className="theme-color gray" onClick={() => changeNoteColor(props.id, Theme.Gray)}></div>
                        <div className="theme-color charcoal" onClick={() => changeNoteColor(props.id, Theme.Charcoal)}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NoteCard