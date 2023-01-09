import { gql } from '@apollo/client';

export const FETCH_ALL_NOTES = gql`
query allNotes {
    allNotes {
        color
        content
        id
        isSaved @client
        isMaximized @client
        isSaving @client
        isError @client
        isDeleteNoteConfirmationVisible @client
    }
}
`
