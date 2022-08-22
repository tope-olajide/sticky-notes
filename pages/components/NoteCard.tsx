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
}
const NoteCard: React.FC<IProps> = (IProps) => {

    return (
        <>
            <div className={IProps.isMaximized ? "card-maximized" : "card"} id={IProps.color}>
                <div className="card-header">
                    <div className="icon-container">
                        <div className="left-icon"><div className="icon" onClick={() => IProps.createNote()}><FontAwesomeIcon icon={faPlus} /></div>
                        </div>
                        <div className="right-icon">
                            <div className="icon"><FontAwesomeIcon icon={faSave} /></div>
                            <div className="icon" onClick={() => IProps.toggleFullscreen(IProps.id)}><FontAwesomeIcon icon={faWindowMaximize} /></div>
                            <div className="icon" onClick={() => IProps.deleteNote(IProps.id)} ><FontAwesomeIcon icon={faTrash} /></div>
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
                        <div className="theme-color yellow" onClick={() => IProps.changeColor(IProps.id, Theme.Yellow)} > </div>
                        <div className="theme-color green" onClick={() => IProps.changeColor(IProps.id, Theme.Green)}></div>
                        <div className="theme-color pink" onClick={() => IProps.changeColor(IProps.id, Theme.Pink)}></div>
                        <div className="theme-color purple" onClick={() => IProps.changeColor(IProps.id, Theme.Purple)}></div>
                        <div className="theme-color blue" onClick={() => IProps.changeColor(IProps.id, Theme.Blue)}></div>
                        <div className="theme-color gray" onClick={() => IProps.changeColor(IProps.id, Theme.Gray)}></div>
                        <div className="theme-color charcoal" onClick={() => IProps.changeColor(IProps.id, Theme.Charcoal)}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NoteCard