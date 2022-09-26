import { gql } from '@apollo/client';

export const SAVE_NOTE = gql`
mutation newNote ($data: NoteData!) {
    newNote (data: $data) {
        color
        content
        id
        userId
    }
}
`
export const MODIFY_NOTE = gql `
mutation modifyNote ($data: NoteData!, $noteId: String!) {
    modifyNote (data: $data, noteId: $noteId) {
        color
        content
        id
    }
}

`