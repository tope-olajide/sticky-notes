export interface INoStickyNoteProps{
    createNote():void
}

export enum Theme {
    Yellow = "yellow",
    Green = "green",
    Pink = "pink",
    Purple = "purple",
    Blue = "blue",
    Gray = "gray",
    Charcoal = "charcoal"
}

export interface INote {
    content: string;
    color: Theme;
    id: string;
    isMaximized: boolean;
    isDeleteNoteModalVisible:boolean;
    isSaved:boolean;
    isSaving:boolean;
    isError:boolean;
}

export interface INoteCardProps {
    createNote(noteId: string): void;
    changeColor(noteId: string, color: string): void;
    id: string;
    color: Theme;
    toggleFullscreen(noteId: string): void;
    isMaximized: boolean;
    isDeleteNoteModalVisible:boolean,
    toggleDeleteNoteModal(id:string):void;
    deleteNote(noteId: string, isSaved:boolean): void;
    contents: string;
    saveUserNote(id: string, color: Theme, contents: string, isSaved: boolean): Promise<void>;
    isSaved: boolean;
    isSaving: boolean;
    isError: boolean;
}