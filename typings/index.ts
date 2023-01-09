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
    isDeleteNoteConfirmationVisible:boolean;
    isSaved: boolean;
    isSaving: boolean;
    isError: boolean;
}

export interface INoteCardProps {
    createNote(noteId?: string): void;
    id:string;
    color:Theme;
    isMaximized:boolean;
    contents: string;
    isSaved: boolean;
    isSaving: boolean;
    isError: boolean;
    changeColor(id:string, color:Theme): void;
    toggleFullscreen(noteId:string):void;
    isDeleteNoteConfirmationVisible:boolean,
    toggleDeleteNoteConfirmationMessage(id:string):void;
    deleteNote(noteId: string, isSaved:boolean): void;
    saveUserNote(id: string, color: Theme, contents: string, isSaved: boolean): Promise<void>;
}

  export interface IAllNoteData {
    allNotes:INote[] 
  }