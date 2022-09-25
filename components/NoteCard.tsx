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
    createNote(): void;
    changeColor(noteId: string, color: string): void;
    id: string;
    color: Theme;
    toggleFullscreen(noteId: string): void;
    isMaximized: boolean;
    deleteNote(noteId: string): void;
    contents:string;
}
const NoteCard: React.FC<IProps> = (props) => {

    return (
        <>
            <div className={props.isMaximized ? "card-maximized" : "card"} id={props.color}>
                <div className="card-header">
                    <div className="icon-container">
                        <div className="left-icon"><div className="icon" onClick={() => props.createNote()}><FontAwesomeIcon icon={faPlus} /></div>
                        </div>
                        <div className="right-icon">
                            <div className="icon"><FontAwesomeIcon icon={faSave} /></div>
                            <div className="icon" onClick={() => props.toggleFullscreen(props.id)}><FontAwesomeIcon icon={faWindowMaximize} /></div>
                            <div className="icon" onClick={() => props.deleteNote(props.id)} ><FontAwesomeIcon icon={faTrash} /></div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-container">
                        <textarea defaultValue={props.contents} className="text-area"></textarea>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="theme-color-container">
                        <div className="theme-color yellow" onClick={() => props.changeColor(props.id, Theme.Yellow)} > </div>
                        <div className="theme-color green" onClick={() => props.changeColor(props.id, Theme.Green)}></div>
                        <div className="theme-color pink" onClick={() => props.changeColor(props.id, Theme.Pink)}></div>
                        <div className="theme-color purple" onClick={() => props.changeColor(props.id, Theme.Purple)}></div>
                        <div className="theme-color blue" onClick={() => props.changeColor(props.id, Theme.Blue)}></div>
                        <div className="theme-color gray" onClick={() => props.changeColor(props.id, Theme.Gray)}></div>
                        <div className="theme-color charcoal" onClick={() => props.changeColor(props.id, Theme.Charcoal)}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NoteCard