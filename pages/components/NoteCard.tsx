import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWindowMaximize, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
    
enum Theme {
    Yellow = "yellow",
    Green = "green",
    Pink = "pink",
    Purple = "purple",
    Blue = "blue",
    Gray = "gray",
    Charcoal = "charcoal"
}

interface IProps {
        createNote():unknown;
        changeColor( noteId:string, color:string):unknown;
        noteId:string;
        color:Theme;
        toggleFullscreen(noteId:string):unknown;
        isMaximized:boolean;
        deleteNote(noteId:string):unknown;
    }
const NoteCard: React.FC<IProps> = ( { createNote, changeColor, noteId, color, toggleFullscreen, isMaximized, deleteNote} ) => {

    return (
        <>
            <div className={isMaximized?"card-maximized":"card"} id={color}>
                <div className="card-header">
                    <div className="icon-container">
                        <div className="left-icon"><div className="icon" onClick={()=>createNote()}><FontAwesomeIcon icon={faPlus} /></div>
                        </div>
                        <div className="right-icon">
                            <div className="icon"><FontAwesomeIcon icon={faSave} /></div>
                            <div  className="icon"onClick={()=>toggleFullscreen(noteId)}><FontAwesomeIcon icon={faWindowMaximize} /></div>
                            <div className="icon" onClick={()=>deleteNote(noteId)} ><FontAwesomeIcon icon={faTrash} /></div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-container">
                        <textarea className="text-area"></textarea>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="theme-color-container">
                        <div className="theme-color yellow" onClick={()=>changeColor(noteId, Theme.Yellow)} > </div>
                        <div className="theme-color green"  onClick={()=>changeColor(noteId, Theme.Green)}></div>
                        <div className="theme-color pink" onClick={()=>changeColor(noteId, Theme.Pink)}></div>
                        <div className="theme-color purple" onClick={()=>changeColor(noteId, Theme.Purple)}></div>
                        <div className="theme-color blue" onClick={()=>changeColor(noteId, Theme.Blue)}></div>
                        <div className="theme-color gray" onClick={()=>changeColor(noteId, Theme.Gray)}></div>
                        <div className="theme-color charcoal" onClick={()=>changeColor(noteId, Theme.Charcoal)}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NoteCard