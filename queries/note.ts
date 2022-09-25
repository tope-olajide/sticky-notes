import { gql } from '@apollo/client';

export const FETCH_ALL_NOTES = gql`
query allNotes {
    allNotes {
        color
        content
        id
        isSaved
        isMaximized @client
        isSaving @client
        isError @client
    }
}
`
